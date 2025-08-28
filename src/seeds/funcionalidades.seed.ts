import { DataSource } from "typeorm";
import { Sistemas } from "../modules/sistemas/sistemas.entity";
import { Funcionalidades } from "../modules/funcionalidades/funcionalidades.entity";

export async function seedFuncionalidades(dataSource: DataSource) {
  const repo = dataSource.getRepository(Funcionalidades);
  const sistemasRepo = dataSource.getRepository(Sistemas);

  const existentes = await repo.count();
  if (existentes > 0) {
    console.log("Funcionalidades já existentes, seed ignorado.");
    return;
  }

  const funcionalidades = repo.create([
    {
      noFuncionalidade: "Ações",
      deFuncionalidade: "Tela responsável por gerenciar as ações",
      coSistema: { coSistema: 1 },
      icSituacaoAtivo: true,
    },
    {
      noFuncionalidade: "Funcionalidades",
      deFuncionalidade: "Tela responsável por gerenciar as funcionalidades",
      coSistema: { coSistema: 1 },
      icSituacaoAtivo: true,
    },
    {
      noFuncionalidade: "Menus",
      deFuncionalidade: "Tela responsável por gerenciar os menus",
      coSistema: { coSistema: 1 },
      icSituacaoAtivo: true,
    },
    {
      noFuncionalidade: "Perfis",
      deFuncionalidade: "Tela responsável por gerenciar os perfis",
      coSistema: { coSistema: 1 },
      icSituacaoAtivo: true,
    },
    {
      noFuncionalidade: "Sistemas",
      deFuncionalidade: "Tela responsável por gerenciar os sistemas",
      coSistema: { coSistema: 1 },
      icSituacaoAtivo: true,
    },
    {
      noFuncionalidade: "Usuários",
      deFuncionalidade: "Tela responsável por gerenciar os usuários",
      coSistema: { coSistema: 1 },
      icSituacaoAtivo: true,
    },
  ]);

  await repo.save(funcionalidades);
  console.log("Funcionalidades inseridas com sucesso!");
}
