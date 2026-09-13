import { createContext, useEffect, useState } from "react";
import type { CarrinhoData, ItemCarrinho } from "../types/carrinho";
import type { produto } from "../types/produto";

// eslint-disable-next-line react-refresh/only-export-components
export const CarrinhoContext = createContext<CarrinhoData | undefined>(
  undefined,
);

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens));
  }, [itens]);

  // função reduce é um acumulador
  const quantidadeTotal = itens.reduce(
    (total, item) => total + item.quantidade,
    0,
  );

  const valorTotal = itens.reduce(
    (total, item) => total + item.produto.preco * item.quantidade,
    0,
  );

  const adicionarItem = (produto: produto) => {
    setItens((itensAtuais) => {
      const itemExiste = itensAtuais.find(
        (item) => item.produto.id === produto.id,
      );

      if (itemExiste) {
        return itensAtuais.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      const novoItem: ItemCarrinho = {
        produto: produto,
        quantidade: 1,
      };

      return [...itensAtuais, novoItem];
    });
  };

  const removerItem = (id: number) => {
    setItens((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => item.produto.id === id);

      // Se o item tem apenas 1 unidade, retorna a lista sem este item
      if (itemExistente && itemExistente.quantidade === 1) {
        return itensAtuais.filter((item) => item.produto.id !== id);
      }
      
      return itensAtuais.map((item) =>
        item.produto.id === id
          ? { ...item, quantidade: item.quantidade - 1 }
          : item,
      );
    });
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarItem,
        removerItem,
        limparCarrinho,
        valorTotal,
        quantidadeTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
