import type { produto } from "../types/produto";

interface ProductProps {
  produto: produto;
}

export default function Product({ produto }: ProductProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#3f2b27]/10 bg-slate-100 shadow-sm">
      <img
        src={produto.imagemUrl}
        alt={produto.nome}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#3f2b27]">{produto.nome}</h3>
        
        <p className="mt-1 text-sm text-[#7a5947]">
          {produto.qtdProduto > 0 ? `${produto.qtdProduto} disponíveis` : "Esgotado"}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-[#3f2b27]">
            R$ {produto.preco.toFixed(2)}
          </span>
          <button className="rounded-full bg-[#3f2b27] px-3 py-1 text-sm text-[#f7efe6]">
            Ver mais
          </button>
        </div>
      </div>
    </div>
  );
}