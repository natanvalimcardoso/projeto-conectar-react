import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { UserRole } from '../entities/user.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    const existingAdmin = await usersService.findByEmail('admin@conectar.com');

    if (!existingAdmin) {
      await usersService.create({
        name: 'Administrador',
        email: 'admin@conectar.com',
        password: 'admin123',
        role: UserRole.ADMIN,
      });
      // eslint-disable-next-line no-console
      console.log('Usuário admin criado com sucesso!');
      // eslint-disable-next-line no-console
      console.log('Email: admin@conectar.com');
      // eslint-disable-next-line no-console
      console.log('Senha: admin123');
    } else {
      // eslint-disable-next-line no-console
      console.log('Usuário admin já existe!');
    }

    const existingUser = await usersService.findByEmail('user@conectar.com');

    if (!existingUser) {
      await usersService.create({
        name: 'Usuário Teste',
        email: 'user@conectar.com',
        password: 'user123',
        role: UserRole.USER,
      });
      // eslint-disable-next-line no-console
      console.log('Usuário teste criado com sucesso!');
      // eslint-disable-next-line no-console
      console.log('Email: user@conectar.com');
      // eslint-disable-next-line no-console
      console.log('Senha: user123');
    } else {
      // eslint-disable-next-line no-console
      console.log('Usuário teste já existe!');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao criar usuários:', error);
  } finally {
    await app.close();
  }
}

void seed();
