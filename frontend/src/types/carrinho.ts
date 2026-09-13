import type { produto } from "./produto";

export interface ItemCarrinho {
  produto: produto;
  quantidade: number;
}

export interface CarrinhoData {
  itens: ItemCarrinho[];
  adicionarItem: (produto: produto) => void;
  removerItem: (id: number) => void;
  limparCarrinho: () => void;
  valorTotal: number;
  quantidadeTotal: number;
}
