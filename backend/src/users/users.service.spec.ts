import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole } from '../entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockUser: User = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedPassword',
    role: UserRole.USER,
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    hashPassword: jest.fn(),
    validatePassword: jest.fn(),
  };

  const mockAdmin: User = {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'hashedPassword',
    role: UserRole.ADMIN,
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    hashPassword: jest.fn(),
    validatePassword: jest.fn(),
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and return a user', async () => {
      const createUserDto = {
        name: 'New User',
        email: 'new@example.com',
        password: 'password123',
      };

      mockRepository.create.mockReturnValue(mockUser);
      mockRepository.save.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(mockUser);
      expect(mockRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('findById', () => {
    it('should return a user when found', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findById('1');

      expect(result).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException when user is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findById('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByEmail', () => {
    it('should return a user when found', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });
  });

  describe('update', () => {
    it('should allow user to update their own profile', async () => {
      const updateDto = { name: 'Updated Name' };

      jest.spyOn(service, 'findById').mockResolvedValue(mockUser);
      mockRepository.save.mockResolvedValue({ ...mockUser, ...updateDto });

      const result = await service.update('1', updateDto, mockUser);

      expect(result.name).toBe('Updated Name');
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should allow admin to update any user', async () => {
      const updateDto = { name: 'Updated Name' };

      jest.spyOn(service, 'findById').mockResolvedValue(mockUser);
      mockRepository.save.mockResolvedValue({ ...mockUser, ...updateDto });

      const result = await service.update('1', updateDto, mockAdmin);

      expect(result.name).toBe('Updated Name');
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw ForbiddenException when user tries to update another user', async () => {
      const updateDto = { name: 'Updated Name' };
      const anotherUser: User = {
        ...mockUser,
        id: '3',
        hashPassword: jest.fn(),
        validatePassword: jest.fn(),
      };

      jest.spyOn(service, 'findById').mockResolvedValue(mockUser);

      await expect(service.update('1', updateDto, anotherUser)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should require current password when changing password', async () => {
      const updateDto = { password: 'newpassword' };

      jest.spyOn(service, 'findById').mockResolvedValue(mockUser);

      await expect(service.update('1', updateDto, mockUser)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should validate current password when changing password', async () => {
      const updateDto = {
        password: 'newpassword',
        currentPassword: 'wrongpassword',
      };

      jest.spyOn(service, 'findById').mockResolvedValue(mockUser);
      mockUser.validatePassword = jest.fn().mockResolvedValue(false);

      await expect(service.update('1', updateDto, mockUser)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should allow admin to remove user', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(mockUser);
      mockRepository.remove.mockResolvedValue(mockUser);

      await service.remove('1', mockAdmin);

      expect(mockRepository.remove).toHaveBeenCalledWith(mockUser);
    });

    it('should throw ForbiddenException when non-admin tries to remove user', async () => {
      await expect(service.remove('1', mockUser)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw BadRequestException when admin tries to remove themselves', async () => {
      await expect(service.remove('2', mockAdmin)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findInactiveUsers', () => {
    it('should return users inactive for more than 30 days', async () => {
      const mockQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([mockUser]),
      };

      mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const result = await service.findInactiveUsers();

      expect(result).toEqual([mockUser]);
      expect(mockQueryBuilder.where).toHaveBeenCalled();
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
    });
  });
});
