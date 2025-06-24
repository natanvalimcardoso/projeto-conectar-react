import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'Maria Silva Santos',
    description: 'Nome completo do usuário',
    minLength: 1,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'maria.santos@example.com',
    description: 'Email único do usuário (será usado para login)',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'senhaSegura123',
    description:
      'Senha do usuário (mínimo 6 caracteres, será criptografada automaticamente)',
    minLength: 6,
    format: 'password',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    enum: UserRole,
    default: UserRole.USER,
    description:
      'Papel do usuário no sistema (padrão: user). Apenas admins podem criar outros admins.',
    example: UserRole.USER,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'João Silva Atualizado',
    description: 'Nome completo atualizado do usuário',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'novaSenha456',
    description: 'Nova senha do usuário (mínimo 6 caracteres)',
    minLength: 6,
    format: 'password',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({
    example: 'senhaAtual123',
    description:
      'Senha atual do usuário (obrigatória para alterar senha). Admins não precisam fornecer.',
    format: 'password',
  })
  @IsOptional()
  @IsString()
  currentPassword?: string;

  @ApiPropertyOptional({
    enum: UserRole,
    description:
      'Papel do usuário no sistema. Apenas administradores podem alterar papéis.',
    example: UserRole.USER,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

export class AdminEditUserDto {
  @ApiPropertyOptional({
    example: 'João Silva Editado pelo Admin',
    description: 'Nome completo do usuário (edição administrativa)',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'novo.email.admin@example.com',
    description:
      'Novo email do usuário (deve ser único no sistema). Funcionalidade exclusiva para admins.',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: 'senhaRedefinida789',
    minLength: 6,
    description:
      'Nova senha definida pelo administrador (sem necessidade de senha atual)',
    format: 'password',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({
    enum: UserRole,
    description:
      'Papel do usuário no sistema (admin pode alterar para qualquer papel)',
    example: UserRole.USER,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

export class UserQueryDto {
  @ApiPropertyOptional({
    enum: UserRole,
    description: 'Filtrar usuários por papel específico',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({
    enum: ['name', 'createdAt'],
    default: 'name',
    description: 'Campo para ordenação dos resultados',
  })
  @IsOptional()
  @IsString()
  sortBy?: 'name' | 'createdAt';

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    default: 'asc',
    description: 'Direção da ordenação (crescente ou decrescente)',
  })
  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc';
}
