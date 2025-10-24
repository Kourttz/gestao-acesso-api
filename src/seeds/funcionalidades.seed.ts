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
    
    // GESTÃO DE ACESSOS (coSistema: 1 )
    { noFuncionalidade: "Ações", deFuncionalidade: "Tela responsável por gerenciar as ações", coSistema: { coSistema: 1 }, icSituacaoAtivo: true },
    { noFuncionalidade: "Funcionalidades", deFuncionalidade: "Tela responsável por gerenciar as funcionalidades", coSistema: { coSistema: 1 }, icSituacaoAtivo: true },
    { noFuncionalidade: "Menus", deFuncionalidade: "Tela responsável por gerenciar os menus", coSistema: { coSistema: 1 }, icSituacaoAtivo: true },
    { noFuncionalidade: "Perfis", deFuncionalidade: "Tela responsável por gerenciar os perfis", coSistema: { coSistema: 1 }, icSituacaoAtivo: true },
    { noFuncionalidade: "Sistemas", deFuncionalidade: "Tela responsável por gerenciar os sistemas", coSistema: { coSistema: 1 }, icSituacaoAtivo: true },
    { noFuncionalidade: "Usuários", deFuncionalidade: "Tela responsável por gerenciar os usuários", coSistema: { coSistema: 1 }, icSituacaoAtivo: true },
    
    // CALLCHECK (coSistema: 2)
    { noFuncionalidade: "cadastro-chamados", deFuncionalidade: "Cadastro de Chamados", coSistema: { coSistema: 2 }, icSituacaoAtivo: true },
    { noFuncionalidade: "gestao-chamados", deFuncionalidade: "Gestão de Chamados", coSistema: { coSistema: 2 }, icSituacaoAtivo: true },

    // AMBULATORIO (coSistema: 3)
    { noFuncionalidade: "cadastro-atestados", deFuncionalidade: "Cadastro de Atestados", coSistema: { coSistema: 3 }, icSituacaoAtivo: true },
    { noFuncionalidade: "gestao-atestados", deFuncionalidade: "Gestão de Atestados", coSistema: { coSistema: 3 }, icSituacaoAtivo: true },

    // ADMIN (coSistema: 4)
    { noFuncionalidade: "gestao-acessos", deFuncionalidade: "Gestão de Acessos", coSistema: { coSistema: 4 }, icSituacaoAtivo: true },
    { noFuncionalidade: "gestao-perfis", deFuncionalidade: "Gestão de Perfis", coSistema: { coSistema: 4 }, icSituacaoAtivo: true },
    { noFuncionalidade: "gestao-grupos", deFuncionalidade: "Gestão de Grupos", coSistema: { coSistema: 4 }, icSituacaoAtivo: true },

    // CRM (coSistema: 5)
    { noFuncionalidade: "cadastro-lead", deFuncionalidade: "Cadastro de Leads", coSistema: { coSistema: 5 }, icSituacaoAtivo: true },

    // DEVS — Telas (coSistema: 6)
    { noFuncionalidade: "telas.calendario", deFuncionalidade: "Calendário", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "telas.exemplo", deFuncionalidade: "Tela de Exemplo", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "telas.loading", deFuncionalidade: "Tela de Loading", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },

    // DEVS — UI (coSistema: 6)
    { noFuncionalidade: "ui.blocos", deFuncionalidade: "Blocos", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "ui.botoes", deFuncionalidade: "Botões", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "ui.checkboxes", deFuncionalidade: "Checkboxes e Toggles", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "ui.etiquetas", deFuncionalidade: "Etiquetas", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "ui.inputs", deFuncionalidade: "Inputs", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "ui.radios", deFuncionalidade: "Radios", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "ui.selects", deFuncionalidade: "Selects", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "ui.tabelas", deFuncionalidade: "Tabelas", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "ui.textareas", deFuncionalidade: "Textareas", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },

    // DEVS — Gráficos (coSistema: 6)
    { noFuncionalidade: "graficos.area", deFuncionalidade: "De Área", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "graficos.barra", deFuncionalidade: "De Barra", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "graficos.linha", deFuncionalidade: "De Linha", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "graficos.pizza", deFuncionalidade: "De Pizza", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "graficos.radar", deFuncionalidade: "De Radar", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "graficos.compostos", deFuncionalidade: "Compostos", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },

    // DEVS — Playground (coSistema: 7 - uniplansul)
    { noFuncionalidade: "digitacao", deFuncionalidade: "DigitaPro", coSistema: { coSistema: 7 }, icSituacaoAtivo: true },

    // DEVS — Documentação (links externos) (coSistema: 6)
    { noFuncionalidade: "docs.icons", deFuncionalidade: "Ícones", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "docs.daisyui", deFuncionalidade: "DaisyUI", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
    { noFuncionalidade: "docs.recharts", deFuncionalidade: "Recharts", coSistema: { coSistema: 6 }, icSituacaoAtivo: true },
  ]);

  await repo.save(funcionalidades);
  console.log("Funcionalidades inseridas com sucesso!");
}