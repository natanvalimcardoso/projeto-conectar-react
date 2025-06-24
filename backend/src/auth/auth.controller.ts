import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Fazer login no sistema',
    description: `
    Autentica o usuário no sistema usando email e senha.
    
    Este endpoint permite que usuários registrados façam login e recebam um token JWT
    para acessar recursos protegidos da API.
    
    Credenciais de teste disponíveis:
    - Admin: admin@conectar.com / admin123
    - User: user@conectar.com / user123
    
    O token retornado deve ser incluído no header Authorization como Bearer token
    para acessar endpoints protegidos.
    `
  })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Login realizado com sucesso' },
        data: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
                name: { type: 'string', example: 'João Silva' },
                email: { type: 'string', example: 'joao@example.com' },
                role: { type: 'string', enum: ['admin', 'user'], example: 'user' },
                lastLogin: { type: 'string', format: 'date-time' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
              }
            },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Credenciais inválidas' }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Email é obrigatório' }
      }
    }
  })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return {
      success: true,
      message: 'Login realizado com sucesso',
      data: result,
    };
  }

  @Post('register')
  @ApiOperation({
    summary: 'Registrar novo usuário',
    description: `
    Cria uma nova conta de usuário no sistema.
    
    Permite que novos usuários se registrem fornecendo nome, email e senha.
    Por padrão, novos usuários recebem o papel 'user' e não têm acesso
    a funcionalidades administrativas.
    
    Validações aplicadas:
    - Email deve ser único no sistema
    - Senha deve ter no mínimo 6 caracteres
    - Nome é obrigatório
    
    Após o registro bem-sucedido, o usuário pode fazer login usando
    suas credenciais para obter um token de acesso.
    `
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
            role: { type: 'string', example: 'user' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
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
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Senha deve ter no mínimo 6 caracteres' }
      }
    }
  })
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return {
      success: true,
      message: 'Usuário criado com sucesso',
      data: result,
    };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obter dados do usuário logado',
    description: `
    Retorna as informações do usuário atualmente autenticado.
    
    Este endpoint requer autenticação via token JWT no header Authorization.
    Retorna os dados completos do usuário logado, exceto a senha por motivos
    de segurança.
    
    Útil para:
    - Verificar se o token ainda é válido
    - Obter dados atualizados do usuário
    - Validar permissões e papel do usuário
    - Exibir informações de perfil na interface
    `
  })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário obtidos com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Dados do usuário obtidos com sucesso' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', example: 'joao@example.com' },
            role: { type: 'string', enum: ['admin', 'user'], example: 'user' },
            lastLogin: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido ou expirado',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Token inválido' }
      }
    }
  })
  async getCurrentUser(@Request() req: any) {
    const result = await this.authService.getCurrentUser(req.user.id);
    return {
      success: true,
      message: 'Dados do usuário obtidos com sucesso',
      data: result,
    };
  }
}
