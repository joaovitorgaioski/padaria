import { api } from "../config/api";
import type { produto } from "../types/produto";

/*
Toda função assíncrona retorna um Promise, uma promessa de que havera retorno após os dados serem carregados. 
Nesse caso, retorna um array de Produtos ( Proimise<Produto[]> ).
Usamos genérics pois a lib Axios não têm como saber o que sera retornado na requisição.
A sintaxe é mais limpa em JavaScript, mas deste modo é bom para compreender o funcionamento.
*/
export const produtoService = {
  listarTodos: async (): Promise<produto[]> => {
    const resposta = await api.get<produto[]>("/produtos");
    return resposta.data;
  },
};
