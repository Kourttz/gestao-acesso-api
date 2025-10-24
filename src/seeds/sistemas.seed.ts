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
    { noSistema: "Gestão De Acessos", icSituacaoAtivo: true }, // co_sistema: 1
    { noSistema: "CallCheck", icSituacaoAtivo: true },         // co_sistema: 2
    { noSistema: "ambulatorio", icSituacaoAtivo: true },       // co_sistema: 3
    { noSistema: "admin", icSituacaoAtivo: true },             // co_sistema: 4
    { noSistema: "crm", icSituacaoAtivo: true },               // co_sistema: 5
    { noSistema: "devs", icSituacaoAtivo: true },              // co_sistema: 6
    { noSistema: "uniplansul", icSituacaoAtivo: true },        // co_sistema: 7
  ] as Sistemas[]);

  await repo.save(sistemas);
  console.log("Sistemas inseridos com sucesso!");
}