import useCarrinho from "../hooks/useCarrinho";

export default function Floating({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const carrinho = useCarrinho();

  return (
    <div
      className="bg-[#3f2b27] fixed w-fit h-fit p-4 rounded-full right-4 bottom-4 cursor-pointer ring hover:opacity-90 transition-all"
      {...props}
    >
      <span className="bg-red-600 text-white font-bold rounded-full absolute -top-2 left-0 h-6 w-6 flex justify-center items-center ring-2 ring-white">
        {carrinho.quantidadeTotal}
      </span>
      {children}
    </div>
  );
}
