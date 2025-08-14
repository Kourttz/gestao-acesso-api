# 🔐 Sistema de Gestão de Acessos — NestJS + TypeScript 

Este projeto é uma aplicação backend responsável pela **gestão centralizada de acessos e permissões** para funcionalidades de diferentes microserviços.\
Desenvolvido com foco em **alta escalabilidade**, **modularidade** e **manutenção simplificada**, o sistema oferece uma arquitetura limpa e flexível, permitindo a inclusão ou remoção de módulos sem impactar o funcionamento global.

Ele implementa **boas práticas de segurança**, controle de perfis e permissões, e integra-se facilmente com outros sistemas para fornecer uma camada robusta de autenticação e autorização.

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) — Framework Node.js progressivo
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática e maior segurança no desenvolvimento
- [TypeORM](https://typeorm.io/) — ORM para mapeamento objeto-relacional
- [PostgreSQL](https://www.postgresql.org/) — Banco de dados relacional
- [Docker](https://www.docker.com/) — Containerização do ambiente
- [Swagger](https://swagger.io/) — Documentação de APIs
- [Dotenv](https://github.com/motdotla/dotenv) — Configuração de variáveis de ambiente
- [Class Validator / Class Transformer](https://github.com/typestack/class-validator) — Validação de dados de entrada

---

## 📁 Estrutura de Pastas

```bash
src/
├── acoes/                      # Gerenciamento de Ações
│   ├── acoes.controller.ts     
│   ├── acoes.dto.ts
│   ├── acoes.entity.ts
│   ├── acoes.module.ts
│   └── acoes.service.ts
├── funcionalidades/            # Gerenciamento de Funcionalidades dos Sistemas
│   ├── funcionalidades.controller.ts
│   ├── funcionalidades.dto.ts
│   ├── funcionalidades.entity.ts
│   ├── funcionalidades.module.ts
│   └── funcionalidades.service.ts
├── perfil_funcionalidade_acoes/ # Gerenciamento de Permissões e Funcionalidades por Perfil
│   ├── perfil_funcionalidade_acoes.controller.ts
│   ├── perfil_funcionalidade_acoes.entity.ts
│   ├── perfil_funcionalidade_acoes.module.ts
│   └── perfil_funcionalidade_acoes.service.ts
├── perfis/                     # Gerenciamento de Perfis de acesso
│   ├── perfis.controller.ts
│   ├── perfis.dto.ts
│   ├── perfis.entity.ts
│   ├── perfis.module.ts
│   └── perfis.service.ts
├── sistemas/                   # Gerenciamento de Sistemas
│   ├── sistemas.controller.ts
│   ├── sistemas.dto.ts
│   ├── sistemas.module.ts
│   └── sistemas.service.ts
├── usuarios/                   # Gerenciamento de Usuários
│   ├── usuarios.controller.ts
│   ├── usuarios.entity.ts
│   ├── usuarios.module.ts
│   └── usuarios.service.ts
├── app.module.ts               # Módulo raiz da aplicação
└── main.ts                     # Ponto de entrada da aplicação
```

💡 Cada módulo possui **controller**, **service**, **entity** e **DTOs**, seguindo a arquitetura limpa do NestJS.

---

## 📦 Instalação e Execução

⚠️ Requer **Node.js v22.14.0** (ou superior) e **npm v10.8.2** (ou compatível)

1. Clone o repositório

```bash
git clone http://172.32.1.71/gitlab/workforce/api_gestao_de_acessos.git
```

2. Instale as dependências

```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=senha
DATABASE_NAME=sistema_acessos
```

4. Inicie o servidor em modo desenvolvimento

```bash
npm run start:dev
```

---

## 🏗️ Build para Produção

```bash
npm run build
npm run start:prod
```

---

## 📖 Documentação da API

Após iniciar o projeto, acesse:

```
http://localhost:3000/api
```

A documentação é gerada automaticamente pelo **Swagger**.

---

## ✍️ Autor

Desenvolvido por **Renato** como base para sistemas corporativos de autenticação, autorização e gestão de permissões.

