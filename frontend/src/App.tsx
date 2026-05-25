import { useEffect, useState } from "react";
import { produtoService } from "./service/produtoService";
import type { Produto } from "./types/Produtos";

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    produtoService
      .listarTodos()
      .then((dados) => {
        setProdutos(dados);
      })
      .catch((erro) => {
        console.error("Erro ao buscar os produtos da padaria: ", erro);
      });
  }, []);

  return (
    <div className="flex flex-col text-center bg-[#F3E4C9] gap-10 h-screen p-5">
      <h1 className="text-5xl">Padaria</h1>

      <div className="flex gap-2 justify-center">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="h-30 w-40 bg-[#A77F60] border-3 border-[#8A5F41] rounded-md hover:-translate-1 transition-all"
          >
            <span className="font-bold">{produto.id}</span>
            <br />
            <span className="font-serif">{produto.nome}</span>
            <br />
            <span className="text-green-300">R$ {produto.preco}</span>
            <br />
            {produto.quantidade}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
