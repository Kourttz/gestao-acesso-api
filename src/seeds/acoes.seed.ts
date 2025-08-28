import { DataSource } from "typeorm";
import { Acoes } from "../modules/acoes/acoes.entity";

export async function seedAcoes(dataSource: DataSource) {
  const repo = dataSource.getRepository(Acoes);

  const existentes = await repo.count();
  if (existentes > 0) {
    console.log("Acoes já existentes, seed ignorado.");
    return;
  }

  const acoes = repo.create([
    { noAcao: "CADASTRAR", icSituacaoAtivo: true },
    { noAcao: "VISUALIZAR", icSituacaoAtivo: true },
    { noAcao: "ATUALIZAR", icSituacaoAtivo: true },
    { noAcao: "DELETAR", icSituacaoAtivo: true },
    { noAcao: "STATUS", icSituacaoAtivo: true },
  ] as Acoes[]);

  await repo.save(acoes);
  console.log("Acoes inseridas com sucesso!");
}
