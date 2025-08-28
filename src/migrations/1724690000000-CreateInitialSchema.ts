import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateInitialSchema1724690000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // tb_menus
    await queryRunner.createTable(new Table({
      name: "tb_menus",
      columns: [
        { name: "co_menu", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "no_menu", type: "varchar", isNullable: true },
        { name: "ic_situacao_ativo", type: "boolean", isNullable: true },
      ],
    }));

    // tb_sistemas
    await queryRunner.createTable(new Table({
      name: "tb_sistemas",
      columns: [
        { name: "co_sistema", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "no_sistema", type: "varchar", isNullable: true },
        { name: "ic_situacao_ativo", type: "boolean", isNullable: true },
      ],
    }));

    // tb_menu_sistema
    await queryRunner.createTable(new Table({
      name: "tb_menu_sistema",
      columns: [
        { name: "co_menu_sistema", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "co_menu", type: "int" },
        { name: "co_sistema", type: "int" },
      ],
    }));

    // tb_perfis
    await queryRunner.createTable(new Table({
      name: "tb_perfis",
      columns: [
        { name: "co_perfil", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "no_perfil", type: "varchar", isNullable: true },
        { name: "ic_situacao_ativo", type: "boolean", isNullable: true },
      ],
    }));

    // tb_acoes
    await queryRunner.createTable(new Table({
      name: "tb_acoes",
      columns: [
        { name: "co_acao", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "no_acao", type: "varchar", isNullable: true },
        { name: "ic_situacao_ativo", type: "boolean", isNullable: true },
      ],
    }));

    // tb_funcionalidades
    await queryRunner.createTable(new Table({
      name: "tb_funcionalidades",
      columns: [
        { name: "co_funcionalidade", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "no_funcionalidade", type: "varchar", isNullable: true },
        { name: "de_funcionalidade", type: "text", isNullable: true },
        { name: "co_sistemas", type: "int" },
        { name: "ic_situacao_ativo", type: "boolean", isNullable: true },
      ],
    }));

    // tb_usuarios
    await queryRunner.createTable(new Table({
      name: "tb_usuarios",
      columns: [
        { name: "co_usuario", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "no_name", type: "varchar", isNullable: true },
        { name: "co_matricula", type: "varchar", isNullable: true },
        { name: "no_email", type: "varchar", isNullable: true },
        { name: "ic_situacao_ativo", type: "boolean", isNullable: true },
        { name: "co_perfil", type: "int", isNullable: true },
      ],
    }));

    // tb_perfil_funcionalidade_acao
    await queryRunner.createTable(new Table({
      name: "tb_perfil_funcionalidade_acao",
      columns: [
        { name: "co_perfil_funcionalidade_acao", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "co_perfil", type: "int" },
        { name: "co_funcionalidade", type: "int" },
        { name: "co_acao", type: "int" },
      ],
    }));

    // Foreign keys
    await queryRunner.createForeignKeys("tb_menu_sistema", [
      new TableForeignKey({
        columnNames: ["co_menu"],
        referencedTableName: "tb_menus",
        referencedColumnNames: ["co_menu"],
      }),
      new TableForeignKey({
        columnNames: ["co_sistema"],
        referencedTableName: "tb_sistemas",
        referencedColumnNames: ["co_sistema"],
      }),
    ]);

    await queryRunner.createForeignKey("tb_funcionalidades", new TableForeignKey({
      columnNames: ["co_sistemas"],
      referencedTableName: "tb_sistemas",
      referencedColumnNames: ["co_sistema"],
    }));

    await queryRunner.createForeignKey("tb_usuarios", new TableForeignKey({
      columnNames: ["co_perfil"],
      referencedTableName: "tb_perfis",
      referencedColumnNames: ["co_perfil"],
    }));

    await queryRunner.createForeignKeys("tb_perfil_funcionalidade_acao", [
      new TableForeignKey({
        columnNames: ["co_perfil"],
        referencedTableName: "tb_perfis",
        referencedColumnNames: ["co_perfil"],
      }),
      new TableForeignKey({
        columnNames: ["co_funcionalidade"],
        referencedTableName: "tb_funcionalidades",
        referencedColumnNames: ["co_funcionalidade"],
      }),
      new TableForeignKey({
        columnNames: ["co_acao"],
        referencedTableName: "tb_acoes",
        referencedColumnNames: ["co_acao"],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tb_perfil_funcionalidade_acao");
    await queryRunner.dropTable("tb_usuarios");
    await queryRunner.dropTable("tb_funcionalidades");
    await queryRunner.dropTable("tb_acoes");
    await queryRunner.dropTable("tb_perfis");
    await queryRunner.dropTable("tb_menu_sistema");
    await queryRunner.dropTable("tb_sistemas");
    await queryRunner.dropTable("tb_menus");
  }
}

