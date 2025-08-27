
-----

# 🔐 Sistema de Gestão de Acessos — NestJS + TypeScript

Este projeto é uma aplicação backend responsável pela **gestão centralizada de acessos e permissões** para funcionalidades de diferentes microserviços.
Desenvolvido com foco em **alta escalabilidade**, **modularidade** e **manutenção simplificada**, o sistema oferece uma arquitetura limpa e flexível, permitindo a inclusão ou remoção de módulos sem impactar o funcionamento global.

Ele implementa **boas práticas de segurança**, controle de perfis e permissões, e integra-se facilmente com outros sistemas para fornecer uma camada robusta de autenticação e autorização.

-----

## 🚀 Tecnologias Utilizadas

  - **NestJS** — Framework Node.js progressivo
  - **TypeScript** — Tipagem estática e maior segurança no desenvolvimento
  - **TypeORM** — ORM para mapeamento objeto-relacional
  - **PostgreSQL** — Banco de dados relacional
  - **Docker** — Containerização do ambiente
  - **Swagger** — Documentação de APIs
  - **Dotenv** — Configuração de variáveis de ambiente
  - **Class Validator / Class Transformer** — Validação de dados de entrada

-----

## 📁 Estrutura de Pastas

```bash
gestao-acesso-api/
├── src/
│ ├── common/
│ │ ├── filters/
│ │ │ ├── http-exception.filter.ts # Filtro de exceções HTTP
│ │ └── response.dto.ts # DTO para padronizar respostas
│ ├── migrations/
│ │ └── 1724690000000-CreateInitialSchema.ts # Migração para criação inicial do esquema do banco de dados
│ ├── modules/
│ │ ├── acoes/ # Gerenciamento de Ações
│ │ ├── funcionalidades/ # Gerenciamento de Funcionalidades dos Sistemas
│ │ ├── menu_sistema/ # Gerenciamento de Menus do Sistema
│ │ ├── menus/ # Gerenciamento de Menus
│ │ ├── perfil_funcionalidade_acao/ # Gerenciamento de Permissões e Funcionalidades por Perfil
│ │ ├── perfis/ # Gerenciamento de Perfis de acesso
│ │ ├── sistemas/ # Gerenciamento de Sistemas
│ │ └── usuarios/ # Gerenciamento de Usuários
│ ├── app.module.ts # Módulo raiz da aplicação
│ ├── main.ts # Ponto de entrada da aplicação
│ └── swagger.ts # Configuração do Swagger
├── .env # Variáveis de ambiente
├── .gitignore # Arquivos e pastas a serem ignorados pelo Git
├── .prettierrc # Configurações do Prettier (formatador de código)
├── data-source.ts # Configuração do TypeORM para conexão com o banco de dados
├── docker-compose.yml # Arquivo para containerização do projeto e do banco de dados
├── eslint.config.mjs # Configuração do ESLint (linter)
├── nest-cli.json # Configurações da CLI do NestJS
├── package-lock.json # Dependências instaladas
├── package.json # Dependências do projeto e scripts
├── README.md # Documentação do projeto
├── tsconfig.build.json # Configurações do TypeScript para o build
└── tsconfig.json # Configurações gerais do TypeScript
```

💡 Cada módulo possui **controller**, **service**, **entity** e **DTOs**, seguindo a arquitetura limpa do NestJS.

-----

## 📦 Instalação e Execução

⚠️ Requer **Node.js v22.14.0** (ou superior) e **npm v10.8.2** (ou compatível)

1.  Clone o repositório

<!-- end list -->

```bash
git clone http://172.32.1.71/gitlab/workforce/api_gestao_de_acessos.git
```

2.  Instale as dependências

<!-- end list -->

```bash
npm install
```

3.  Configure as variáveis de ambiente no arquivo `.env`

<!-- end list -->

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=senha
DATABASE_NAME=sistema_acessos
```

4.  **Rodar Migrações do Banco de Dados**
    Antes de iniciar o projeto, é necessário rodar a migração para criar o esquema do banco de dados.

    ```bash
    npm run migration:run  
    ```

5.  Inicie o servidor em modo desenvolvimento

<!-- end list -->

```bash
npm run start:dev
```

-----

## 🐳 Execução com Docker

Se você tiver o Docker instalado, pode usar o `docker-compose` para iniciar o projeto e o banco de dados facilmente.

1.  Inicie os containers

<!-- end list -->

```bash
docker-compose up -d
```

2.  Acesse a aplicação em `http://localhost:3000`. O banco de dados já estará configurado e pronto para uso.

-----

## 🏗️ Build para Produção

```bash
npm run build
npm run start:prod
```

-----

## 📖 Documentação da API

Após iniciar o projeto, acesse:

```
http://localhost:3000/api
```

A documentação é gerada automaticamente pelo **Swagger**.

-----

## ✍️ Autor

Desenvolvido por **Renato** como base para sistemas corporativos de autenticação, autorização e gestão de permissões.