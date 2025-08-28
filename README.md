
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
│ │ └── 1724690000000-CreateInitialSchema.ts # Migração para criação inicial do esquema
│ ├── modules/
│ │ ├── acoes/                # Gerenciamento de Ações
│ │ ├── funcionalidades/      # Funcionalidades dos Sistemas
│ │ ├── menu_sistema/         # Menus do Sistema
│ │ ├── menus/                # Gerenciamento de Menus
│ │ ├── perfil_funcionalidade_acao/ # Permissões por Perfil
│ │ ├── perfis/               # Perfis de acesso
│ │ ├── sistemas/             # Sistemas
│ │ └── usuarios/             # Usuários
│ ├── seeds/
│ │ ├── acoes.seed.ts         # Seed de ações
│ │ ├── funcionalidades.seed.ts # Seed de funcionalidades
│ │ ├── menus.seed.ts         # Seed de menus
│ │ ├── perfis.seed.ts        # Seed de perfis
│ │ ├── sistemas.seed.ts      # Seed de sistemas
│ │ ├── usuarios.seed.ts      # Seed de usuários
│ │ └── seed.ts               # Script para rodar todos os seeds
│ ├── app.module.ts           # Módulo raiz
│ ├── main.ts                 # Ponto de entrada
│ └── swagger.ts              # Configuração Swagger
├── docker-compose.yml         # Orquestração dos containers
├── Dockerfile                 # Configuração do container da API
├── data-source.ts             # Configuração do TypeORM
├── .env                       # Variáveis de ambiente
├── package.json               # Dependências e scripts
└── README.md


💡 Cada módulo possui **controller**, **service**, **entity** e **DTOs**, seguindo a arquitetura limpa do NestJS.

-----

## 📦 Instalação e Execução

⚠️ Requer **Node.js v22.14.0** (ou superior) e **npm v10.8.2** (ou compatível)

1.  Clone o repositório

<!-- end list -->

```bash
git clone https://github.com/Kourttz/gestao-acesso-api.git
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