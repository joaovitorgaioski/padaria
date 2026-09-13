import { Minus, Plus, Trash2, X } from "lucide-react";
import useCarrinho from "../hooks/useCarrinho";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const carrinho = useCarrinho();

  if (!isOpen) return null;

  return (
    <div
      className="bg-black/50 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#f7efe6] text-[#3f2b27] rounded-xl w-full sm:max-w-lg max-h-[85vh] flex flex-col p-4 sm:p-6 shadow-2xl border border-[#3f2b27]/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex justify-between items-center pb-3 mb-3 border-b border-[#3f2b27]/20">
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold">Seu Carrinho</h1>
            {carrinho.itens.length > 0 && (
              <button
                type="button"
                onClick={carrinho.limparCarrinho}
                className="text-xs text-red-600 hover:underline flex items-center gap-1 ml-2"
                title="Esvaziar carrinho"
              >
                <Trash2 className="size-3" /> Limpar
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black font-semibold text-lg p-1 rounded-md transition-all"
            aria-label="Fechar modal"
          >
            <X className="size-5 pointer-events-none" />
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto pr-1">
          {carrinho.itens.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Seu carrinho está vazio.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {carrinho.itens.map((item) => (
                <li
                  key={item.produto.id}
                  className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-100 gap-2 sm:gap-3"
                >
                  <div className="w-12 h-12 shrink-0 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                    <img
                      src={item.produto.imagemUrl}
                      alt={item.produto.nome}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-xs sm:text-sm text-gray-800 truncate">
                      {item.produto.nome}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-gray-500">
                      R$ {item.produto.preco.toFixed(2)} cada
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Botões de quantidade */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        className="bg-[#3f2b27] text-white hover:opacity-90 transition-all rounded-lg size-6 flex items-center justify-center"
                        onClick={() => {
                          if (item.produto.id !== undefined)
                            carrinho.removerItem(item.produto.id);
                        }}
                      >
                        <Minus className="size-3.5 pointer-events-none" />
                      </button>

                      <button
                        type="button"
                        className="bg-[#3f2b27] text-white hover:opacity-90 transition-all rounded-lg size-6 flex items-center justify-center"
                        onClick={() => carrinho.adicionarItem(item.produto)}
                      >
                        <Plus className="size-3.5 pointer-events-none" />
                      </button>
                    </div>

                    {/* Preço e Total do item */}
                    <div className="flex flex-col items-end min-w-16.25">
                      <span className="text-[10px] sm:text-xs bg-[#3f2b27]/10 font-semibold px-2 py-0.5 rounded-full">
                        x{item.quantidade}
                      </span>
                      <span className="font-bold text-xs sm:text-sm mt-1">
                        R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Rodapé */}
        {carrinho.itens.length > 0 && (
          <div className="pt-4 mt-4 border-t border-[#3f2b27]/20 flex flex-col gap-3">
            <div className="flex justify-between items-center text-base font-bold">
              <span>Total:</span>
              <span className="text-lg">
                R$ {carrinho.valorTotal.toFixed(2)}
              </span>
            </div>

            <button className="w-full bg-[#3f2b27] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-all">
              Realizar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
