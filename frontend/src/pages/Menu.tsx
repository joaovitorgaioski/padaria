import { useEffect, useState } from "react";
import type { pageResponse } from "../types/pageResponse";
import type { produto } from "../types/produto";
import { produtoService } from "../service/produtoService";
import Product from "../components/Product";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Menu() {
  const [carregando, setCarregando] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [dadosPaginados, setDadosPaginados] = useState<pageResponse<produto> | null>(null);

  const busca = searchParams.get("busca") || "";
  const paginaAtual = Number(searchParams.get("pagina")) || 0;

  const [termoBusca, setTermoBusca] = useState(busca);

  /*
  Esse useEffect é para quando é digitado algo na busca, ele atualiza inteligentemente e volta para a página "0"
  mas caso esteja vazio ("") ele da o .delete para remover os valores.
  */
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams((params) => {
        if (termoBusca.trim()) {
          params.set("busca", termoBusca);
          params.set("pagina", "0");
        } else {
          params.delete("busca");
        }
        return params;
      });
    }, 500);

    // Cacela o timer do atualizador de busca
    return () => clearTimeout(timer);
  }, [termoBusca, setSearchParams]);

  useEffect(() => {
    produtoService
      .buscar(busca, paginaAtual)
      .then((dados) => {
        setDadosPaginados(dados);
      })
      .catch((erro) => {
        console.error("Erro ao carregar produtos:", erro);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, [busca, paginaAtual]);

  const mudarPagina = (novaPagina: number) => {
    setSearchParams((params) => {
      params.set("pagina", novaPagina.toString());
      return params;
    });
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  if (carregando) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="font-medium text-stone-600 bg-slate-100 rounded-md p-4">
          Carregando cardápio...
        </p>
      </div>
    );
  }

  const produtos = dadosPaginados?.content || [];

  return (
    <div className="min-h-screen p-6 flex flex-col justify-between max-w-7xl mx-auto w-full">
      {/* Grid de Produtos e Busca */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* div de busca */}
        <div className="sticky top-6 z-10 h-fit text-black bg-slate-100 border border-[#3f2b27]/10 rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
          <h2>Digite um produto</h2>
          <input
            type="text"
            placeholder="Bolo de Cenoura..."
            className="border border-[#3f2b27]/10 p-2 rounded-md"
            onChange={(e) => {
              setTermoBusca(e.target.value);
            }}
            value={termoBusca}
          />
          <button
            className="bg-[#6b3d23] text-blue-50 p-2 rounded-md cursor-pointer"
            onClick={() => {
              setTermoBusca("");
            }}
          >
            Voltar a página inicial
          </button>
        </div>
        {/* map que renderiza os produtos */}
        {produtos.map((produto) => (
          <Product key={produto.id} produto={produto} />
        ))}
      </div>
      {produtos.length === 0 && (
        <p className="text-center text-stone-500 my-12">
          Nenhum produto encontrado.
        </p>
      )}

      {/* Controle das páginas */}
      {dadosPaginados &&
        dadosPaginados.totalPages > 1 &&
        Number(searchParams.get("pagina")) < dadosPaginados.totalPages && (
          <div className="flex items-center justify-center gap-4 mt-12 pt-6 border-t border-stone-200">
            <button
              onClick={() => mudarPagina(paginaAtual - 1)}
              disabled={dadosPaginados.first}
              className="px-4 py-2 rounded-lg bg-[#3f2b27] text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#523934] transition"
            >
              <ChevronLeft />
            </button>

            <span className="text-sm text-stone-600 font-medium">
              Página {dadosPaginados.number + 1} de {dadosPaginados.totalPages}
            </span>

            <button
              onClick={() => mudarPagina(paginaAtual + 1)}
              disabled={dadosPaginados.last}
              className="px-4 py-2 rounded-lg bg-[#3f2b27] text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#523934] transition"
            >
              <ChevronRight />
            </button>
          </div>
        )}
    </div>
  );
}
