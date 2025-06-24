import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Sistema de Gerenciamento de Usuários - Conéctar API funcionando!';
  }
}
