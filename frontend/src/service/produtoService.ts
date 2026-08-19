import { api } from "../config/api";
import type { produto } from "../types/produto";
import type { pageResponse } from "../types/pageResponse";

/*
Função assíncrona que busca as páginas pelo endpoint "/produtos", com os parâmetros
busca, pagina e tamanho. Retorna o tipo genérico pageResponse, ou seja, os produtos
são salvos dentro de content.
*/
export const produtoService = {
  buscar: async (busca = "", pagina = 0, tamanho = 20) => {
    const resposta = await api.get<pageResponse<produto>>("/produtos", {
      params: { busca, pagina, tamanho },
    });
    return resposta.data;
  },
};
