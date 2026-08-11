import { useEffect, useState } from "react";
import type { produto } from "../types/produto";
import { produtoService } from "../service/produtoService";
import Product from "../components/Product";

export default function Menu() {
  const [produtos, setProdutos] = useState<produto[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    produtoService
      .listarTodos()
      .then((dados) => {
        setProdutos(dados);
      })
      .catch((erro) => {
        console.error("Erro ao carregar produtos:", erro);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="font-medium text-stone-600 bg-slate-100 rounded-md">Carregando cardápio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {produtos.map((produto) => (
          <Product key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
}