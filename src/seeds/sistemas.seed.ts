import { DataSource } from "typeorm";
import { Sistemas } from "../modules/sistemas/sistemas.entity";

export async function seedSistemas(dataSource: DataSource) {
  const repo = dataSource.getRepository(Sistemas);

  const existentes = await repo.count();
  if (existentes > 0) {
    console.log("Sistemas já existentes, seed ignorado.");
    return;
  }

  const sistemas = repo.create([
    { noSistema: "Gestão De Acessos", icSituacaoAtivo: true },
    { noSistema: "CallCheck", icSituacaoAtivo: true },
  ] as Sistemas[]);

  await repo.save(sistemas);
  console.log("Sistemas inseridos com sucesso!");
}
