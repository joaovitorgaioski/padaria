import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { produtoService } from "../service/produtoService";
import type { produto } from "../types/produto";

const PRODUTOS_FALLBACK: produto[] = [
  {
    id: 1,
    nome: "Pão de Forma Artesanal",
    preco: 11.9,
    qtdProduto: 10,
    imagemUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80",
  },
  {
    id: 2,
    nome: "Croissant de Manteiga",
    preco: 8.5,
    qtdProduto: 15,
    imagemUrl:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=80",
  },
  {
    id: 3,
    nome: "Donut de Chocolate",
    preco: 7.5,
    qtdProduto: 20,
    imagemUrl:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&q=80",
  },
  {
    id: 4,
    nome: "Baguete Italiana",
    preco: 12.0,
    qtdProduto: 10,
    imagemUrl:
      "https://images.unsplash.com/photo-1597079910443-60c43fc4f729?w=900&q=80",
  },
  {
    id: 5,
    nome: "Cinnamon Roll",
    preco: 9.9,
    qtdProduto: 12,
    imagemUrl:
      "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=900&q=80",
  },
];

export default function Home() {
  const [produtos, setProdutos] = useState<produto[]>(PRODUTOS_FALLBACK);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    produtoService
      .listarTodos()
      .then((dados) => {
        if (dados && dados.length > 0) {
          setProdutos(dados.slice(0, 5));
        }
      })
      .catch((erro) => {
        console.error("Usando dados de demonstração para a Home:", erro);
      });
  }, []);

  useEffect(() => {
    if (produtos.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % produtos.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [produtos.length]);

  return (
    <div className="w-full flex flex-col m-0 p-0">
      
      {/* Sessão Carrossel */}
      <section className="relative h-[70vh] w-full overflow-hidden bg-[#f7efe6] flex items-center">
        <div
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {produtos.map((item) => (
            <div
              key={item.id || item.nome}
              className="min-w-full h-full shrink-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-16 gap-8 max-w-7xl mx-auto"
            >
              <div className="flex-1 flex flex-col justify-center space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#7a5947]">
                  Em Alta
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#3f2b27] leading-tight">
                  {item.nome}
                </h2>
                <p className="text-2xl md:text-4xl font-bold text-[#7a5947]">
                  R$ {item.preco.toFixed(2)}
                </p>
              </div>

              <div className="flex-1 flex justify-center items-center w-full h-[95%]">
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={
                      item.imagemUrl ||
                      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80"
                    }
                    alt={item.nome}
                    className="w-full h-full object-cover"
                  />

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[10%] bg-linear-to-b from-[#f7efe6] to-transparent z-10" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[10%] bg-linear-to-t from-[#f7efe6] to-transparent z-10" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-linear-to-r from-[#f7efe6] to-transparent z-10" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-[10%] bg-linear-to-l from-[#f7efe6] to-transparent z-10" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {produtos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-8 bg-[#3f2b27]"
                  : "w-2.5 bg-[#3f2b27]/30 hover:bg-[#3f2b27]/60"
              }`}
              aria-label={`Ir para o slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Sessão de Apresentação */}
      <section className="w-full bg-[#3f2b27]">
        <Link
          to="/sobre"
          className="group flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-12 md:px-16 md:py-16 text-[#f7efe6] max-w-7xl mx-auto"
        >
          <div className="flex-1 space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold">
              Bakery Sempre com Você
            </h3>
            <p className="max-w-xl text-lg text-[#f7efe6]/80 leading-relaxed">
              Tradição, receitas artesanais e o carinho de uma fornada quentinha
              saindo a toda hora. Conheça mais sobre a nossa história e o nosso
              compromisso com o seu dia a dia.
            </p>
            <span className="inline-flex items-center gap-2 font-semibold text-amber-200 group-hover:underline underline-offset-4">
              Conheça nossa história &rarr;
            </span>
          </div>

          <div className="w-full md:w-1/3 h-60 overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80"
              alt="Bakery"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
      </section>
    </div>
  );
}
