import { DataSource } from "typeorm";
import { seedAcoes } from "./acoes.seed";
import { seedMenus } from "./menus.seed";
import { seedPerfis } from "./perfis.seed";
import { seedUsuarios } from "./usuarios.seed";
import { seedSistemas } from "./sistemas.seed";
import { AppDataSource } from "../../data_source";
import { seedFuncionalidades } from "./funcionalidades.seed";

async function runSeeds() {
  try {
    await AppDataSource.initialize();
    console.log("📦 Conexão com banco estabelecida!");

    await seedAcoes(AppDataSource);
    await seedMenus(AppDataSource);
    await seedPerfis(AppDataSource);
    await seedUsuarios(AppDataSource);
    await seedSistemas(AppDataSource);
    await seedFuncionalidades(AppDataSource);


    console.log("✅ Seeds concluídos!");
    process.exit(0);
  } catch (err) {
    console.error("Erro ao executar seeds:", err);
    process.exit(1);
  }
}

runSeeds();
