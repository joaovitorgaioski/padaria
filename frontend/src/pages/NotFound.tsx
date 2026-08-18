import { SearchAlert, Sticker } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen bg-[#f7efe6] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <SearchAlert className="w-10 h-10 text-[#8b5e3c]" />
          <h1 className="text-5xl font-bold text-[#3d2b1f]">Ops!</h1>
        </div>

        <h3 className="text-xl font-semibold text-[#4f392b] mb-2">
          Não encontramos o que você queria!
        </h3>

        <div className="flex items-center">
          <p className="text-[#795f4d]">
            Talvez essa funcionalidade ainda não foi implementada
          </p>
          <Sticker className="w-6 h-6 text-[#8b5e3c]" />
        </div>

        <Link to={"/"} className="text-[#3d2b1f] font-bold">Voltar à Home</Link>
      </div>
    </div>
  );
}
