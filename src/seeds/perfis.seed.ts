import { DataSource } from "typeorm";
import { Perfis } from "../modules/perfis/perfis.entity";

export async function seedPerfis(dataSource: DataSource) {
  const repo = dataSource.getRepository(Perfis);

  const existentes = await repo.count();
  if (existentes > 0) {
    console.log("Perfis já existentes, seed ignorado.");
    return;
  }

  const perfis = repo.create([
    { noPerfil: "Administrador", icSituacaoAtivo: true },
    { noPerfil: "Desenvolvedor", icSituacaoAtivo: true },
  ] as Perfis[]);

  await repo.save(perfis);
  console.log("Perfis inseridos com sucesso!");
}
