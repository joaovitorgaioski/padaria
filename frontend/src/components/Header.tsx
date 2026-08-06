import { User } from "lucide-react";

function Header() {
  return (
    <header className="flex justify-between gap-10 p-5">
      <h1>Backery</h1>

      <nav className="flex gap-10">
        <button>Home</button>
        <button>Cardápio</button>
        <button>Meus Pedidos</button>
        <button>Sobre Nós</button>
        <button>Fale Conosco</button>
      </nav>

      <User />
    </header>
  );
}

export default Header;
