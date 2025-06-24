import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Health check da API',
    description: `
    Endpoint para verificar se a API está funcionando corretamente.
    
    Retorna uma mensagem simples confirmando que o servidor está online
    e operacional. Útil para monitoramento e verificações de saúde do sistema.
    `
  })
  @ApiResponse({ 
    status: 200, 
    description: 'API funcionando corretamente',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Sistema de Gerenciamento de Usuários - Conéctar API funcionando!' },
        timestamp: { type: 'string', format: 'date-time' },
        uptime: { type: 'string', example: '2h 30m 45s' }
      }
    }
  })
  getHello() {
    return this.appService.getHello();
  }
}
