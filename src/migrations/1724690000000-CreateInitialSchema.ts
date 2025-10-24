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
        { name: "nu_filial", type: "int", isNullable: true },
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

    // tb_grupos
    await queryRunner.createTable(new Table({
      name: "tb_grupos",
      columns: [
        { name: "co_grupo", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "no_grupo", type: "varchar", isNullable: true },
        { name: "co_usuario_dono", type: "int", isNullable: true },
        { name: "co_grupo_pai", type: "int", isNullable: true },
        { name: "ic_situacao_ativo", type: "boolean", isNullable: true },
      ],
    }));

    // tb_grupo_usuario
    await queryRunner.createTable(new Table({
      name: "tb_grupo_usuario",
      columns: [
        { name: "co_grupo_usuario", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "co_grupo", type: "int" },
        { name: "co_usuario", type: "int" },
      ],
    }));

    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS sc_bases`);

    
    await queryRunner.createTable(new Table({
      name: "sc_bases.tb_empregados",
      columns: [
        { name: "id_empregado", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "co_matricula", type: "varchar", isNullable: true },
        { name: "co_matricula_cliente", type: "varchar", isNullable: true },
        { name: "no_nome", type: "varchar", isNullable: true },
        { name: "co_cpf", type: "varchar", isNullable: true },
        { name: "co_funcao", type: "varchar", isNullable: true },
        { name: "co_matricula_gestor", type: "varchar", isNullable: true },
        { name: "co_matricula_monitor", type: "varchar", isNullable: true },
        { name: "co_matricula_alteracao", type: "varchar", isNullable: true },
        { name: "nu_telefone", type: "varchar", isNullable: true },
        { name: "nu_telefone2", type: "varchar", isNullable: true },
        { name: "no_nome_social", type: "varchar", isNullable: true },
        { name: "ds_sexo", type: "bpchar", length: "1", isNullable: true },
        { name: "ds_situacao", type: "varchar", isNullable: true },
        { name: "nu_certificado", type: "varchar", isNullable: true },
        { name: "ds_dados_adicionais", type: "varchar", isNullable: true },
        { name: "nu_pis", type: "bigint", isNullable: true },
        { name: "nu_filial", type: "int", isNullable: true },
        { name: "id_situacao", type: "int", isNullable: true },
        { name: "co_bairro", type: "int", isNullable: true },
        { name: "co_municipio", type: "int", isNullable: true },
        { name: "co_local_trabalho", type: "int", isNullable: true },
        { name: "dt_funcao", type: "date", isNullable: true },
        { name: "dt_nascimento", type: "date", isNullable: true },
        { name: "dt_admissao", type: "date", isNullable: true },
        { name: "dt_demissao", type: "date", isNullable: true },
        { name: "dt_situacao", type: "date", isNullable: true },
        { name: "dt_hist_alteracao", type: "date", isNullable: true },
        { name: "dt_alteracao", type: "date", isNullable: true },
        { name: "hr_jornada_entrada", type: "time", isNullable: true },
        { name: "hr_jornada_saida", type: "time", isNullable: true },
        { name: "hr_descanso1", type: "time", isNullable: true },
        { name: "hr_descanso2", type: "time", isNullable: true },
        { name: "hr_lanche", type: "time", isNullable: true },
        { name: "ic_certificado_digital", type: "boolean", isNullable: true },
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

    await queryRunner.createForeignKeys("tb_grupo_usuario", [
      new TableForeignKey({
        columnNames: ["co_grupo"],
        referencedTableName: "tb_grupos",
        referencedColumnNames: ["co_grupo"],
      }),
      new TableForeignKey({
        columnNames: ["co_usuario"],
        referencedTableName: "tb_usuarios",
        referencedColumnNames: ["co_usuario"],
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
    await queryRunner.dropTable("tb_grupos");
    await queryRunner.dropTable("tb_grupo_usuario");
    await queryRunner.dropTable("sc_bases.tb_empregados");
  }
}

