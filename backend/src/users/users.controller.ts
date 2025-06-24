import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserQueryDto,
  AdminEditUserDto,
} from './dto/user.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Criar novo usuário (apenas administradores)',
    description: `
    Permite que administradores criem novos usuários no sistema.
    
    Este endpoint é restrito a administradores e permite a criação de usuários
    com qualquer papel (admin ou user). O usuário é criado diretamente no sistema
    com a senha já criptografada.
    
    Diferenças do registro público:
    - Pode definir o papel do usuário (admin/user)
    - Apenas administradores podem usar
    - Usuário é criado direto no sistema
    
    Validações aplicadas:
    - Email deve ser único
    - Senha mínimo 6 caracteres
    - Nome obrigatório
    - Papel opcional (padrão: user)
    `,
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Usuário criado com sucesso' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', example: 'joao@example.com' },
            role: { type: 'string', enum: ['admin', 'user'], example: 'user' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado - Apenas administradores',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Acesso negado' }
      }
    }
  })
  @ApiResponse({
    status: 409,
    description: 'Email já está em uso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Email já está em uso' }
      }
    }
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    return {
      success: true,
      message: 'Usuário criado com sucesso',
      data: result,
    };
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Listar todos os usuários (apenas administradores)',
    description: `
    Retorna lista completa de usuários do sistema com opções de filtro e ordenação.
    
    Este endpoint permite que administradores visualizem todos os usuários cadastrados
    no sistema. É possível filtrar por papel e ordenar os resultados por diferentes campos.
    
    Parâmetros de consulta disponíveis:
    - role: Filtrar por papel específico (admin/user)
    - sortBy: Campo de ordenação (name, createdAt)
    - order: Ordem de classificação (asc, desc)
    
    Casos de uso:
    - Dashboard administrativo
    - Relatórios de usuários
    - Busca e filtros avançados
    - Análise de dados do sistema
    `,
  })
  @ApiQuery({
    name: 'role',
    required: false,
    enum: UserRole,
    description: 'Filtrar usuários por papel específico'
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['name', 'createdAt'],
    description: 'Campo para ordenação dos resultados'
  })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Ordem de classificação (crescente ou decrescente)'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários obtida com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Lista de usuários obtida com sucesso' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
              name: { type: 'string', example: 'João Silva' },
              email: { type: 'string', example: 'joao@example.com' },
              role: { type: 'string', enum: ['admin', 'user'], example: 'user' },
              lastLogin: { type: 'string', format: 'date-time', nullable: true },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' }
            }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado - Apenas administradores',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Acesso negado' }
      }
    }
  })
  async findAll(@Query() query: UserQueryDto) {
    const result = await this.usersService.findAll(query);
    return {
      success: true,
      message: 'Lista de usuários obtida com sucesso',
      data: result,
    };
  }

  @Get('inactive')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Listar usuários inativos (apenas administradores)',
    description: `
    Retorna usuários que não fizeram login nos últimos 30 dias.
    
    Este endpoint identifica automaticamente usuários inativos baseado no critério
    de último login há mais de 30 dias ou que nunca fizeram login.
    
    Critério de inatividade:
    - Último login há mais de 30 dias
    - Nunca fizeram login (lastLogin = null)
    
    Casos de uso:
    - Limpeza de base de dados
    - Análise de engajamento de usuários
    - Campanhas de reativação
    - Auditoria de segurança do sistema
    `,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários inativos obtida com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Lista de usuários inativos obtida com sucesso' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
              name: { type: 'string', example: 'Usuário Inativo' },
              email: { type: 'string', example: 'inativo@example.com' },
              role: { type: 'string', enum: ['admin', 'user'], example: 'user' },
              lastLogin: { type: 'string', format: 'date-time', nullable: true, example: '2025-05-01T10:00:00.000Z' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' }
            }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado - Apenas administradores',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Acesso negado' }
      }
    }
  })
  async findInactiveUsers() {
    const result = await this.usersService.findInactiveUsers();
    return {
      success: true,
      message: 'Lista de usuários inativos obtida com sucesso',
      data: result,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter usuário por ID',
    description: `
    Retorna os dados detalhados de um usuário específico.
    
    Este endpoint permite visualizar informações completas de um usuário.
    Usuários regulares podem ver apenas seu próprio perfil, enquanto
    administradores podem visualizar qualquer usuário.
    
    Controle de acesso:
    - Usuários regulares: Apenas próprio perfil
    - Administradores: Qualquer usuário
    
    Funcionalidades incluídas:
    - Dados completos do usuário
    - Informações de último acesso
    - Histórico de atividade
    - Controle de privacidade aplicado
    `,
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Usuário encontrado' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', example: 'joao@example.com' },
            role: { type: 'string', enum: ['admin', 'user'], example: 'user' },
            lastLogin: { type: 'string', format: 'date-time', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Usuário não encontrado' }
      }
    }
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado - Só pode ver próprio perfil',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Acesso negado' }
      }
    }
  })
  async findOne(@Param('id') id: string, @Request() req: any) {
    if (req.user.role !== UserRole.ADMIN && req.user.id !== id) {
      return {
        success: false,
        message: 'Acesso negado',
      };
    }

    const result = await this.usersService.findById(id);
    return {
      success: true,
      message: 'Usuário encontrado',
      data: result,
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar usuário',
    description: `
    Permite atualização básica de usuário com controle de permissões.
    
    Este endpoint oferece funcionalidades de atualização diferenciadas baseadas
    no papel do usuário autenticado. Usuários podem editar apenas seu próprio
    perfil, enquanto administradores têm mais liberdades.
    
    Limitações para usuários regulares:
    - Não podem alterar email
    - Podem alterar nome
    - Podem alterar senha (com senha atual)
    - Não podem alterar papel
    
    Funcionalidades para administradores:
    - Podem alterar qualquer campo de qualquer usuário
    - Podem alterar papel do usuário
    - Não podem alterar email (use PUT admin/edit para isso)
    
    Todas as atualizações são parciais - apenas os campos fornecidos são alterados.
    `,
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do usuário a ser atualizado',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Usuário atualizado com sucesso' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
            name: { type: 'string', example: 'João Silva Atualizado' },
            email: { type: 'string', example: 'joao@example.com' },
            role: { type: 'string', enum: ['admin', 'user'], example: 'user' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado ou permissão insuficiente',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Você só pode atualizar seu próprio perfil' }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou senha atual incorreta',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Senha atual incorreta' }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Usuário não encontrado' }
      }
    }
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any,
  ) {
    const result = await this.usersService.update(id, updateUserDto, req.user);
    return {
      success: true,
      message: 'Usuário atualizado com sucesso',
      data: result,
    };
  }

  @Put('admin/edit/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Editar usuário completo (APENAS ADMINISTRADORES)',
    description: `
    Permite que administradores editem completamente qualquer usuário do sistema.
    
    Este endpoint oferece funcionalidades avançadas de edição que não estão
    disponíveis no endpoint de atualização padrão. É destinado exclusivamente
    para administradores realizarem operações de manutenção.
    
    Funcionalidades disponíveis:
    - Alterar nome do usuário
    - Alterar email (com verificação de unicidade)
    - Redefinir senha (sem necessidade de senha atual)
    - Alterar papel do usuário (admin/user)
    
    Regras de negócio aplicadas:
    - Apenas administradores podem usar este endpoint
    - Email deve ser único no sistema
    - Senha será criptografada automaticamente
    - Todos os campos são opcionais (atualização parcial)
    - Auditoria completa é registrada
    `,
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do usuário a ser editado',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário editado com sucesso pelo administrador',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Usuário editado com sucesso pelo administrador' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
            name: { type: 'string', example: 'Nome Editado pelo Admin' },
            email: { type: 'string', example: 'novo.email@example.com' },
            role: { type: 'string', enum: ['admin', 'user'], example: 'admin' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            editedBy: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'admin-id' },
                name: { type: 'string', example: 'Administrador' },
                email: { type: 'string', example: 'admin@conectar.com' }
              }
            },
            editedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado - Apenas administradores',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Acesso negado' }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Email já está em uso ou dados inválidos',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Este email já está em uso' }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Usuário não encontrado' }
      }
    }
  })
  async adminEditUser(
    @Param('id') id: string,
    @Body() adminEditUserDto: AdminEditUserDto,
    @Request() req: any,
  ) {
    const result = await this.usersService.adminEditUser(id, adminEditUserDto);
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = result;
    
    return {
      success: true,
      message: 'Usuário editado com sucesso pelo administrador',
      data: {
        ...userWithoutPassword,
        editedBy: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
        },
        editedAt: new Date().toISOString(),
      },
    };
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Excluir usuário (apenas administradores)',
    description: `
    Permite que administradores excluam permanentemente usuários do sistema.
    
    ATENÇÃO: Esta operação é irreversível!
    
    Este endpoint remove completamente o usuário do banco de dados.
    Múltiplas validações de segurança são aplicadas para prevenir exclusões
    acidentais ou maliciosas.
    
    Validações de segurança aplicadas:
    - Apenas administradores podem excluir usuários
    - Administrador não pode excluir própria conta
    - Usuário deve existir no sistema
    - Exclusão é permanente (não há recuperação)
    
    Casos de uso recomendados:
    - Remoção de contas inativas
    - Limpeza de dados conforme políticas
    - Violação de termos de uso
    - Solicitação de exclusão (LGPD/GDPR)
    
    Recomendações importantes:
    - Considere desativar em vez de excluir
    - Faça backup antes de excluir
    - Documente o motivo da exclusão
    `,
  })
  @ApiParam({
    name: 'id',
    description: 'ID único do usuário a ser excluído',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário excluído com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Usuário excluído com sucesso' }
      }
    }
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Apenas administradores podem excluir usuários' }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Não pode excluir própria conta',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Você não pode excluir sua própria conta' }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Usuário não encontrado' }
      }
    }
  })
  async remove(@Param('id') id: string, @Request() req: any) {
    await this.usersService.remove(id, req.user);
    return {
      success: true,
      message: 'Usuário excluído com sucesso',
    };
  }
}
