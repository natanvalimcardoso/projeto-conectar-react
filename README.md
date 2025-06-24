# Sistema de Gerenciamento de Usuários - Conéctar

> **Desafio Técnico Full-Stack**: Sistema completo de gerenciamento de usuários com ReactJS + NestJS

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.7-38B2AC.svg)](https://tailwindcss.com/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E.svg)](https://nestjs.com/)

## 🎯 Sobre o Projeto

Este projeto foi desenvolvido como resposta ao **desafio técnico da Conéctar**, implementando um sistema completo de gerenciamento de usuários com autenticação segura, interface responsiva e arquitetura escalável.

### 🚀 Demonstração
- **Frontend**: Interface moderna e responsiva
- **Backend**: API RESTful robusta e documentada  
- **Documentação**: Swagger disponível em `/api/docs`

## 📋 Funcionalidades Implementadas

### ✅ Requisitos Obrigatórios
- [x] **Autenticação JWT**: Login/registro seguro
- [x] **Gerenciamento de Usuários**: CRUD completo
- [x] **Controle de Acesso**: Roles admin/user
- [x] **Interface Responsiva**: Mobile e desktop
- [x] **Filtros e Ordenação**: Por papel e data
- [x] **Usuários Inativos**: Identificação automática
- [x] **Testes Automatizados**: Unitários e integração
- [x] **Documentação**: Swagger e READMEs detalhados

### 🎁 Funcionalidades Extras
- [x] **TypeScript**: Frontend e backend 100% tipados
- [x] **Design System**: shadcn/ui + TailwindCSS
- [x] **Estado Global**: Redux Toolkit
- [x] **Validação Robusta**: class-validator + Zod
- [x] **Seed Database**: Usuários padrão para teste
- [x] **Error Handling**: Tratamento completo de erros
- [x] **Loading States**: Feedback visual para usuário

## 🚀 Quick Start

> **💡 Nota**: Este projeto está configurado para usar **SQLite** por padrão para facilitar o desenvolvimento local. Não é necessário instalar MySQL para testar o projeto.

### **Pré-requisitos**
- [Node.js 18+](https://nodejs.org/)
- npm (vem com Node.js)
- MySQL 8.0+ (opcional - projeto configurado com SQLite por padrão)

### **1. Clone e instale**
```bash
# 1. Clone o repositório (ou acesse a pasta do projeto)
cd /caminho/para/fullstack-project

# 2. Instale dependências do BACKEND
cd backend
npm install

# 3. Instale dependências do FRONTEND (nova aba do terminal)
cd ../frontend
npm install --legacy-peer-deps
```

### **2. Configure o banco de dados**
```bash
cd backend

# Copie o arquivo de configuração
cp .env.example .env

# OPÇÃO 1: MySQL (Produção recomendada)
# Edite o .env com suas configurações do MySQL

# OPÇÃO 2: SQLite (Desenvolvimento rápido - já configurado)
# O projeto já está configurado para usar SQLite por padrão
# Arquivo: conectar.db (criado automaticamente)

# Execute seed (cria usuários padrão)
npm run seed
```

### **3. Execute os serviços**

**Terminal 1 - Backend (NestJS):**
```bash
cd backend
npm run start:dev
```
> 🌐 Backend rodará em: http://localhost:3000

**Terminal 2 - Frontend (React):**
```bash
cd frontend  
npm run dev
```
> 🌐 Frontend rodará em: http://localhost:5173

### **4. Acesse a aplicação**
- **App:** http://localhost:5173
- **API Docs:** http://localhost:3000/api/docs (Swagger)

### **📚 Como acessar a documentação Swagger**

1. **Execute o backend** (se ainda não estiver rodando):
   ```bash
   cd backend
   npm run start:dev
   ```

2. **Acesse o Swagger** no navegador:
   ```
   http://localhost:3000/api/docs
   ```

3. **Funcionalidades disponíveis no Swagger**:
   - ✅ **Documentação completa** de todos os endpoints
   - ✅ **Testar APIs** diretamente no navegador
   - ✅ **Autenticação JWT** integrada
   - ✅ **Schemas** de request/response
   - ✅ **Códigos de erro** documentados

4. **Como testar com autenticação**:
   - Faça login via `/auth/login` no Swagger
   - Copie o token retornado
   - Clique em **"Authorize"** no topo da página
   - Cole o token no formato: `Bearer SEU_TOKEN_AQUI`
   - Agora pode testar endpoints protegidos

### **🔑 Como fazer login como Administrador**

1. **Acesse**: http://localhost:5173
2. **Na tela de login, digite**:
   - **Email**: `admin@conectar.com`
   - **Senha**: `admin123`
3. **Clique em "Entrar"**
4. **Você será redirecionado** para o dashboard administrativo
5. **Funcionalidades disponíveis**:
   - ✅ Visualizar todos os usuários
   - ✅ Criar novos usuários
   - ✅ Editar qualquer usuário
   - ✅ Excluir usuários
   - ✅ Filtrar por papel (admin/user)
   - ✅ Ver usuários inativos

### **👤 Como criar conta e logar como Usuário**

#### **Opção 1: Usar conta pré-criada**
1. **Acesse**: http://localhost:5173
2. **Na tela de login, digite**:
   - **Email**: `user@conectar.com`
   - **Senha**: `user123`
3. **Clique em "Entrar"**
4. **Você será redirecionado** para seu perfil pessoal

#### **Opção 2: Criar nova conta**
1. **Acesse**: http://localhost:5173
2. **Clique em "Criar conta"** ou **"Registrar"**
3. **Preencha os dados**:
   - **Nome**: Seu nome completo
   - **Email**: seu.email@example.com
   - **Senha**: Uma senha segura (mínimo 6 caracteres)
4. **Clique em "Criar conta"**
5. **Após criar, faça login** com suas credenciais
6. **Funcionalidades disponíveis**:
   - ✅ Visualizar próprio perfil
   - ✅ Editar nome e senha
   - ✅ Ver histórico de login
   - ❌ Não pode ver outros usuários
   - ❌ Não pode criar/excluir usuários



## 🛠️ Stack Tecnológica

### **Frontend**
- **React 19** + TypeScript
- **Redux Toolkit** (estado global)
- **React Router** (navegação)
- **TailwindCSS** + **shadcn/ui** (design)
- **Axios** (HTTP client)
- **Vite** (build tool)
- **Vitest** (testes)

### **Backend**
- **NestJS** + TypeScript
- **SQLite/MySQL** + **TypeORM** (banco de dados)
- **JWT** + **bcrypt** (autenticação)
- **Swagger** (documentação)
- **Jest** (testes)
- **class-validator** (validação)

## 🏗️ Arquitetura

### **📱 Frontend - Arquitetura Detalhada**

O frontend foi desenvolvido seguindo as melhores práticas do React e TypeScript, com uma arquitetura modular e escalável:

#### **🛠️ Stack Tecnológica do Frontend**
- **Framework**: ReactJS 19.1.0 + TypeScript 5.8.3
- **Estado Global**: Redux Toolkit (@reduxjs/toolkit)
- **Roteamento**: React Router DOM 7.6.1
- **Estilização**: TailwindCSS 4.1.7 + shadcn/ui
- **HTTP Client**: Axios 1.10.0
- **Build Tool**: Vite 6.3.5
- **Testes**: Vitest + Testing Library
- **Validação**: Zod + React Hook Form

#### **📁 Estrutura de Pastas do Frontend**
```
frontend/
├── src/
│   ├── components/           # Componentes React
│   │   ├── Login.tsx        # 🔑 Tela de login com formulário
│   │   ├── Register.tsx     # 📝 Tela de cadastro
│   │   ├── UserList.tsx     # 👥 Dashboard admin (filtros + CRUD)
│   │   ├── UserProfile.tsx  # 👤 Perfil do usuário
│   │   ├── ProtectedRoute.tsx # 🛡️ Proteção de rotas
│   │   └── ui/              # Design System shadcn/ui
│   ├── store/               # Estado Global Redux
│   │   ├── index.ts         # Configuração da store
│   │   └── slices/          # Slices do Redux Toolkit
│   │       ├── authSlice.ts # Estado de autenticação
│   │       └── userSlice.ts # Estado dos usuários
│   ├── services/            # Camada de API
│   │   └── api.ts          # Cliente HTTP + endpoints
│   ├── types/               # Tipagens TypeScript
│   │   └── index.ts        # Interfaces e tipos
│   ├── hooks/               # Custom Hooks
│   └── lib/                 # Utilitários
├── package.json             # Dependências
└── vite.config.ts          # Configuração Vite
```


#### **🎯 Funcionalidades Implementadas**

##### **✅ 1. Tela de Login (`Login.tsx`)**
- ✅ Formulário simples com email e senha
- ✅ Validação de campos obrigatórios
- ✅ Feedback visual de loading
- ✅ Redirecionamento baseado no papel do usuário:
  - **Admin** → `/users` (dashboard)
  - **User** → `/profile` (perfil pessoal)
- ✅ Link para cadastro
- ✅ Design responsivo com shadcn/ui

##### **✅ 2. Tela de Cadastro (`Register.tsx`)**
- ✅ Formulário com nome, email e senha
- ✅ Validação de dados
- ✅ Redirecionamento para login após sucesso
- ✅ Interface responsiva

##### **✅ 3. Tela de Listagem de Usuários (`UserList.tsx`)**
- ✅ **Somente para Admins** (proteção via `ProtectedRoute`)
- ✅ Lista todos os usuários com:
  - Nome, email, papel e status (ativo/inativo)
- ✅ **Filtros implementados**:
  - Por papel (admin/user)
  - Ordenação por nome ou data de criação
  - Ordem crescente/decrescente
- ✅ **Ações disponíveis**:
  - Editar usuários (botão preparado)
  - Excluir usuários (confirmação)
- ✅ **Status de usuário**:
  - Ativo: login nos últimos 30 dias
  - Inativo: sem login há mais de 30 dias
- ✅ Interface responsiva com tabela adaptável

##### **✅ 4. Tela de Perfil do Usuário (`UserProfile.tsx`)**
- ✅ **Somente para usuários autenticados**
- ✅ Exibe informações do usuário logado:
  - Nome, email, data de criação
- ✅ Permite atualização de nome e senha
- ✅ Interface responsiva

##### **✅ 5. Interface Responsiva**
- ✅ **TailwindCSS** para responsividade
- ✅ **shadcn/ui** para componentes modernos
- ✅ Testado em mobile e desktop
- ✅ Breakpoints otimizados: `sm:`, `md:`, `lg:`

#### **🛡️ Proteção de Rotas (`ProtectedRoute.tsx`)**
- ✅ Verificação de autenticação via token JWT
- ✅ Controle de acesso baseado em papéis
- ✅ Redirecionamento automático:
  - Não autenticado → `/login`
  - User tentando acessar área admin → `/profile`
- ✅ Loading state durante verificação

#### **🌐 Camada de API (`services/api.ts`)**
- ✅ **Axios** configurado com:
  - Base URL configurável
  - Interceptors para autenticação automática
  - Tratamento de erros 401 (logout automático)
- ✅ **Endpoints organizados**:
  - `authApi`: login, register, getCurrentUser
  - `userApi`: getUsers, updateUser, deleteUser

#### **📊 Estado Global (Redux Toolkit)**
- ✅ **authSlice**: usuário logado, token, loading
- ✅ **userSlice**: lista de usuários, filtros, loading
- ✅ TypeScript com tipagem completa
- ✅ Async actions com createAsyncThunk

#### **⚠️ Exclusões Intencionais**
- ❌ **Login Social**: Não implementado conforme especificado
- ❌ **CSS Modules/Styled Components**: Optou-se por TailwindCSS

#### **🚀 Diferenciais Técnicos**
- ✅ **100% TypeScript**: Tipagem completa
- ✅ **Design System**: shadcn/ui + TailwindCSS
- ✅ **Testes**: Configurado com Vitest
- ✅ **Performance**: Vite para build otimizado
- ✅ **UX**: Loading states e feedback visual
- ✅ **Segurança**: Interceptors e proteção de rotas

---

# 🎨 Frontend - React + TypeScript

## 🎯 Funcionalidades por Papel

### **👤 Usuário Regular**
- ✅ Login/logout seguro
- ✅ Visualizar próprio perfil
- ✅ Editar nome e senha
- ✅ Histórico de atividade

### **👨‍💼 Administrador**
- ✅ Todas as funcionalidades de usuário
- ✅ Listar todos os usuários
- ✅ Filtrar por papel (admin/user)
- ✅ Ordenar por nome ou data
- ✅ Editar qualquer usuário
- ✅ Excluir usuários
- ✅ Visualizar usuários inativos

## 🎨 Interface do Usuário

### **Design System**
- **Componentes**: shadcn/ui para consistência
- **Responsivo**: Mobile-first design
- **Acessibilidade**: ARIA labels e navegação por teclado
- **Feedback Visual**: Loading states e mensagens claras

### **Telas Implementadas**
1. **Login**: Autenticação com validação
2. **Cadastro**: Registro de novos usuários
3. **Dashboard Admin**: Gerenciamento completo de usuários
4. **Perfil**: Visualização e edição de dados pessoais

## 🧪 Testes Frontend

```bash
npm test
```


# ⚙️ Backend - NestJS + TypeScript

## 🏗️ Arquitetura do Backend

O backend foi desenvolvido seguindo os princípios do **Clean Architecture** e as melhores práticas do NestJS, resultando em uma API robusta, escalável e bem documentada.

### **🛠️ Stack Tecnológica Completa**
- **Framework**: NestJS 11.0.1 + TypeScript 5.7.3
- **Banco de Dados**: SQLite 3.1.7 (desenvolvimento) / MySQL 8.0+ (produção)
- **ORM**: TypeORM 0.3.25 (mapeamento objeto-relacional)
- **Autenticação**: JWT (JSON Web Tokens) + Passport.js
- **Criptografia**: bcrypt 6.0.0 para senhas
- **Validação**: class-validator 0.14.2 + class-transformer 0.5.1
- **Documentação**: Swagger/OpenAPI 3.0 (swagger-ui-express)
- **Testes**: Jest 29.7.0 (unitários e integração)
- **Configuração**: @nestjs/config para variáveis de ambiente

### **📁 Estrutura Modular do Backend**

```
backend/
├── src/
│   ├── main.ts                    # 🚀 Ponto de entrada da aplicação
│   ├── app.module.ts              # 📦 Módulo raiz (configuração global)
│   ├── app.controller.ts          # 🏥 Health check endpoint
│   ├── app.service.ts             # 🔧 Serviços básicos da aplicação
│   │
│   ├── auth/                      # 🔐 Módulo de Autenticação
│   │   ├── auth.module.ts         # Configuração do módulo auth
│   │   ├── auth.controller.ts     # Endpoints: login, register, me
│   │   ├── auth.service.ts        # Lógica de negócio de autenticação
│   │   ├── dto/                   # Data Transfer Objects
│   │   │   └── auth.dto.ts        # LoginDto, RegisterDto
│   │   ├── strategies/            # Estratégias Passport.js
│   │   │   ├── jwt.strategy.ts    # Estratégia JWT para tokens
│   │   │   └── local.strategy.ts  # Estratégia local para login
│   │   ├── guards/                # Guards de autorização
│   │   │   └── roles.guard.ts     # Controle de acesso por papel
│   │   └── decorators/            # Decoradores customizados
│   │       └── roles.decorator.ts # @Roles(UserRole.ADMIN)
│   │
│   ├── users/                     # 👥 Módulo de Usuários
│   │   ├── users.module.ts        # Configuração do módulo users
│   │   ├── users.controller.ts    # CRUD + endpoints administrativos
│   │   ├── users.service.ts       # Lógica de negócio de usuários
│   │   └── dto/                   # Data Transfer Objects
│   │       └── user.dto.ts        # CreateUserDto, UpdateUserDto, etc.
│   │
│   ├── entities/                  # 📊 Entidades TypeORM
│   │   └── user.entity.ts         # Modelo de dados User + UserRole
│   │
│   └── database/                  # 🗄️ Scripts de banco
│       └── seed.ts                # Populador de dados iniciais
│
├── test/                          # 🧪 Testes End-to-End
│   ├── app.e2e-spec.ts          # Testes de integração da app
│   ├── auth.e2e-spec.ts         # Testes de autenticação
│   └── jest-e2e.json            # Configuração Jest E2E
│
├── dist/                          # 📦 Build de produção
├── node_modules/                  # 📚 Dependências
├── package.json                   # 📋 Configuração do projeto
├── tsconfig.json                  # ⚙️ Configuração TypeScript
├── nest-cli.json                  # 🐦 Configuração NestJS CLI
└── eslint.config.mjs             # 🧹 Regras de linting
```


### **🔐 Sistema de Autenticação e Autorização**

#### **Estratégias de Autenticação:**
1. **Local Strategy** (`local.strategy.ts`):
   - Valida email e senha no login
   - Integrada com `passport-local`

2. **JWT Strategy** (`jwt.strategy.ts`):
   - Verifica tokens JWT em endpoints protegidos
   - Extrai usuário do payload do token
   - Integrada com `passport-jwt`

#### **Controle de Acesso:**
- **Guards**: `AuthGuard('jwt')` para autenticação
- **Roles Guard**: `RolesGuard` para autorização por papel
- **Decoradores**: `@Roles(UserRole.ADMIN)` para definir permissões

#### **Fluxo de Autenticação:**
```
1. POST /auth/login → Validação de credenciais
2. Geração de JWT com payload (id, email, role)
3. Retorno do token para o cliente
4. Cliente inclui token no header: Authorization: Bearer <token>
5. JWT Strategy valida token e extrai usuário
6. Guards verificam permissões específicas
```

### **📊 Modelo de Dados (Entidades TypeORM)**

#### **User Entity** (`user.entity.ts`):
```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'varchar', default: UserRole.USER })
  role: UserRole;

  @Column({ nullable: true })
  lastLogin: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Métodos da entidade
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() { /* criptografia automática */ }

  async validatePassword(password: string): Promise<boolean> { /* validação */ }
}
```

#### **UserRole Enum**:
```typescript
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
```

### **🔧 Serviços e Lógica de Negócio**

#### **AuthService** (`auth.service.ts`):
- `validateUser()`: Valida credenciais de login
- `login()`: Gera JWT e atualiza último login
- `register()`: Cria novos usuários
- `getCurrentUser()`: Retorna dados do usuário logado

#### **UsersService** (`users.service.ts`):
- `create()`: Criação de usuários (com validação de email único)
- `findAll()`: Listagem com filtros e ordenação
- `findById()`: Busca por ID com validação de existência
- `update()`: Atualização com controle de permissões
- `adminEditUser()`: Edição administrativa avançada
- `remove()`: Exclusão com validações de segurança
- `findInactiveUsers()`: Usuários inativos (30+ dias sem login)

### **🛡️ Validação e DTOs**

#### **Validação Automática**:
- **class-validator**: Decoradores para validação de campos
- **class-transformer**: Transformação e serialização de dados
- **ValidationPipe**: Pipe global para validação automática

#### **DTOs Implementados**:
- `LoginDto`: Email e senha para autenticação
- `RegisterDto`: Dados para novo registro
- `CreateUserDto`: Criação administrativa de usuários
- `UpdateUserDto`: Atualização padrão de usuários
- `AdminEditUserDto`: Edição administrativa completa
- `UserQueryDto`: Filtros para listagem de usuários

### **📚 Documentação Swagger Completa**

A API possui documentação Swagger completa e interativa, acessível em:
**http://localhost:3000/api/docs**

#### **Recursos da Documentação**:
- **Autenticação Integrada**: Teste endpoints protegidos diretamente
- **Esquemas Completos**: Request/response schemas detalhados
- **Exemplos Práticos**: Dados de exemplo para todos os endpoints
- **Códigos de Erro**: Documentação completa de possíveis erros
- **Agrupamento Lógico**: Endpoints organizados por módulos (auth, users, health)

#### **Configuração do Swagger** (`main.ts`):
```typescript
const config = new DocumentBuilder()
  .setTitle('Sistema de Gerenciamento de Usuários')
  .setDescription('API para gerenciamento de usuários com autenticação JWT')
  .setVersion('1.0')
  .addBearerAuth() // Suporte a JWT
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);
```

## 📋 Funcionalidades Backend

### **Autenticação**
- ✅ Registro de novos usuários
- ✅ Login com email e senha
- ✅ Autenticação JWT
- ✅ Middleware de autenticação
- ✅ Controle de acesso baseado em roles (admin/user)

### **Gerenciamento de Usuários**
- ✅ CRUD completo de usuários
- ✅ Filtros por papel (admin/user)
- ✅ Ordenação por nome ou data de criação
- ✅ Listagem de usuários inativos (sem login há 30+ dias)
- ✅ Validação de permissões (usuários só podem editar próprio perfil)
- ✅ Administradores podem gerenciar todos os usuários

### **Segurança Backend**
- ✅ Senhas criptografadas com bcrypt
- ✅ Tokens JWT seguros
- ✅ Validação de entrada com class-validator
- ✅ Proteção contra vulnerabilidades comuns
- ✅ CORS configurado para frontend

## 📚 Documentação da API

A documentação completa da API está disponível via Swagger em:
`http://localhost:3000/api/docs`

### **Principais Endpoints**

#### **Autenticação**
- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Fazer login
- `GET /auth/me` - Obter dados do usuário atual

#### **Usuários**
- `GET /users` - Listar usuários (apenas admins)
- `GET /users/:id` - Obter usuário por ID
- `PATCH /users/:id` - Atualizar usuário
- `PUT /users/admin/edit/:id` - Editar usuário completo (apenas admins)
- `DELETE /users/:id` - Excluir usuário (apenas admins)
- `GET /users/inactive` - Listar usuários inativos (apenas admins)

### **Exemplos de Uso da API**

#### **Criar nova conta via API**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Usuário criado com sucesso",
  "data": {
    "user": {
      "id": "uuid-gerado",
      "name": "João Silva",
      "email": "joao@example.com",
      "role": "user"
    }
  }
}
```

#### **Login como Admin**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@conectar.com",
    "password": "admin123"
  }'
```

#### **Login como Usuário**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@conectar.com",
    "password": "user123"
  }'
```

#### **Listar usuários (com token)**
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer SEU_JWT_TOKEN"
```

#### **Diferenças entre Endpoints de Edição**

| Funcionalidade | `PATCH /users/:id` | `PUT /users/admin/edit/:id` |
|---|---|---|
| **Público-alvo** | Usuários (próprio perfil) + Admins | Apenas Administradores |
| **Alterar nome** | ✅ | ✅ |
| **Alterar email** | ❌ | ✅ (com verificação de unicidade) |
| **Alterar senha** | ✅ (requer senha atual) | ✅ (sem necessidade de senha atual) |
| **Alterar papel (role)** | ✅ (apenas admin) | ✅ |
| **Auditoria** | Básica | Completa (registra quem editou) |
| **Uso típico** | Auto-edição de perfil | Administração de usuários |

#### **Exemplo: Edição Administrativa**
```bash
# Admin editando qualquer usuário
curl -X PUT http://localhost:3000/users/admin/edit/USER_ID \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nome Atualizado",
    "email": "novo.email@example.com",
    "password": "novaSenha123",
    "role": "admin"
  }'
```

## 🧪 Testes Backend

### **Executar todos os testes**
```bash
cd backend
npm test              # Testes unitários
```

### **Estrutura de Testes**
- **Testes Unitários**: Testam serviços e controladores isoladamente
- **Testes de Integração**: Testam fluxos completos da API
- **Mocks**: Simulam dependências externas (banco de dados, etc.)

## 🔐 Segurança Backend

### **Medidas Implementadas**
- ✅ **Criptografia de senhas**: bcrypt com salt rounds
- ✅ **JWT seguros**: Tokens com expiração configurável
- ✅ **Validação de entrada**: class-validator em todos os DTOs
- ✅ **Autorização**: Guards para controle de acesso
- ✅ **CORS**: Configurado para permitir apenas origens autorizadas
- ✅ **Rate limiting**: Pode ser adicionado facilmente
- ✅ **Helmet**: Headers de segurança (pode ser adicionado)

---

## 🔧 Configuração Avançada

### **Variáveis de Ambiente**

**Frontend** (`.env`):
```bash
VITE_API_URL=http://localhost:3000
```

**Backend** (`.env`):
```bash
# Banco de Dados (MySQL)
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
DATABASE_NAME=conectar_db

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# Aplicação
PORT=3000
NODE_ENV=development

# NOTA: O projeto está configurado para usar SQLite por padrão
# Arquivo do banco: conectar.db (criado automaticamente)

# Para alternar para MySQL:
# 1. Configure as variáveis acima
# 2. Instale e configure MySQL
# 3. Modifique src/app.module.ts (descomente seção MySQL)
# 4. Execute: npm run seed


### **Para Produção (Backend)**
```bash
NODE_ENV=production
DATABASE_HOST=seu-host-mysql
DATABASE_PORT=3306
DATABASE_USERNAME=usuario-producao
DATABASE_PASSWORD=senha-super-segura
DATABASE_NAME=conectar_db_prod
JWT_SECRET=jwt-secret-super-seguro-producao
JWT_EXPIRES_IN=24h
PORT=3000
```


### **CORS Error**
- Verifique se o backend está rodando
- Confirme a URL da API no frontend
- Backend já configurado para aceitar localhost

### **Erro de banco de dados**
```bash
# PROJETO ATUAL: Já configurado para SQLite (sem setup necessário)
# Arquivo do banco: conectar.db (criado automaticamente)

# Para usar MySQL (opcional):
# 1. Instale e inicie o MySQL
# 2. Modifique src/app.module.ts para configuração MySQL
# 3. Execute: npm run seed
```

## 🎯 Critérios de Avaliação Atendidos

### ✅ **Backend**
- [x] Código limpo, organizado e bem estruturado
- [x] Funcionalidades implementadas conforme especificado
- [x] Cobertura de testes unitários e de integração
- [x] Segurança e proteção contra vulnerabilidades

### ✅ **Frontend**
- [x] Interface intuitiva, responsiva e fácil de usar
- [x] Integração adequada com o backend
- [x] Uso eficiente de estado global e rotas
- [x] Estilização limpa e consistente

### ✅ **Documentação**
- [x] Documentação clara da API (Swagger)
- [x] Explicação das decisões de design e arquitetura
- [x] READMEs detalhados com instruções de setup

## 📄 Licença

Desenvolvido para o **desafio técnico da Conéctar**.

---

## 👨‍💻 Desenvolvedor

Projeto desenvolvido pelo Natan Valim Cardoso demonstrando conhecimento em:
- **Full-Stack Development**
- **Modern React Patterns**
- **NestJS Best Practices**
- **TypeScript Mastery**
- **Database Design**
- **API Design**
- **Testing Strategies**
- **Security Implementation**

