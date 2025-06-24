import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  UserQueryDto,
  AdminEditUserDto,
} from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(query: UserQueryDto): Promise<User[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (query.role) {
      queryBuilder.andWhere('user.role = :role', { role: query.role });
    }

    const sortBy = query.sortBy || 'name';
    const order = query.order || 'asc';
    queryBuilder.orderBy(
      `user.${sortBy}`,
      order.toUpperCase() as 'ASC' | 'DESC',
    );

    return queryBuilder.getMany();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    currentUser: User,
  ): Promise<User> {
    const user = await this.findById(id);

    if (currentUser.role !== UserRole.ADMIN && currentUser.id !== id) {
      throw new ForbiddenException('Você só pode atualizar seu próprio perfil');
    }

    if (
      updateUserDto.password &&
      currentUser.role !== UserRole.ADMIN &&
      currentUser.id === id
    ) {
      if (!updateUserDto.currentPassword) {
        throw new BadRequestException(
          'Senha atual é obrigatória para alterar a senha',
        );
      }

      const isCurrentPasswordValid = await user.validatePassword(
        updateUserDto.currentPassword,
      );
      if (!isCurrentPasswordValid) {
        throw new BadRequestException('Senha atual incorreta');
      }
    }

    if (updateUserDto.role && currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'Apenas administradores podem alterar papéis de usuário',
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currentPassword: _, ...updateData } = updateUserDto;

    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  async remove(id: string, currentUser: User): Promise<void> {
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'Apenas administradores podem excluir usuários',
      );
    }

    if (currentUser.id === id) {
      throw new BadRequestException('Você não pode excluir sua própria conta');
    }

    const user = await this.findById(id);
    await this.userRepository.remove(user);
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.userRepository.update(id, { lastLogin: new Date() });
  }

  async findInactiveUsers(): Promise<User[]> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return this.userRepository
      .createQueryBuilder('user')
      .where('user.lastLogin < :date OR user.lastLogin IS NULL', {
        date: thirtyDaysAgo,
      })
      .getMany();
  }

  async adminEditUser(
    id: string,
    adminEditUserDto: AdminEditUserDto,
  ): Promise<User> {
    const user = await this.findById(id);

    if (adminEditUserDto.email && adminEditUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(adminEditUserDto.email);
      if (existingUser) {
        throw new BadRequestException('Este email já está em uso');
      }
    }

    if (adminEditUserDto.name) {
      user.name = adminEditUserDto.name;
    }

    if (adminEditUserDto.email) {
      user.email = adminEditUserDto.email;
    }

    if (adminEditUserDto.role) {
      user.role = adminEditUserDto.role;
    }

    if (adminEditUserDto.password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(adminEditUserDto.password, saltRounds);
    }

    return this.userRepository.save(user);
  }
}
