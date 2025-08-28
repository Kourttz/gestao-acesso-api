import { DataSource } from "typeorm";
import { Menus } from "../modules/menus/menus.entity";

export async function seedMenus(dataSource: DataSource) {
  const repo = dataSource.getRepository(Menus);

  const existentes = await repo.count();
  if (existentes > 0) {
    console.log("Menus já existentes, seed ignorado.");
    return;
  }

  const menus = repo.create([
    { noMenu: "Administração", icSituacaoAtivo: true },
    { noMenu: "Desenvolvimento", icSituacaoAtivo: true },
  ] as Menus[]);

  await repo.save(menus);
  console.log("Menus inseridos com sucesso!");
}
