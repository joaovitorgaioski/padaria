import { ShoppingBag } from "lucide-react";
import type { produto } from "../types/produto";
import Card from "./Card";
import useCarrinho from "../hooks/useCarrinho";

interface ProductProps {
  produto: produto;
}

export default function Product({ produto }: ProductProps) {
  const carrinho = useCarrinho();

  return (
    <Card className="hover:translate-0.5 transition-all">
      <img
        src={produto.imagemUrl}
        alt={produto.nome}
        className="h-48 w-full object-cover"
      />

      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-lg font-semibold">{produto.nome}</h3>

        <p className="mt-1 text-sm text-[#7a5947]">
          {produto.qtdProduto > 0
            ? `${produto.qtdProduto} disponíveis`
            : "Esgotado"}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xl font-bold">
            R$ {produto.preco.toFixed(2)}
          </span>
          <button className="rounded-full bg-[#3f2b27] p-2 text-sm text-white">
            Ver mais
          </button>
          <button
            className="rounded-full bg-[#3f2b27] p-2 text-sm text-white cursor-pointer hover:bg-[#2e5a2e] hover:-translate-1 transition-all"
            onClick={() => {
              carrinho.adicionarItem(produto);
            }}
          >
            <ShoppingBag />
          </button>
        </div>
      </div>
    </Card>
  );
}
