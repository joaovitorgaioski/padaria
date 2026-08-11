import { User } from "lucide-react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Cardápio", path: "/menu" },
  { label: "Meus Pedidos", path: "/pedidos" },
  { label: "Sobre Nós", path: "/sobre" },
  { label: "Fale Conosco", path: "/contato" },
];

function Header() {
  return (
    <header className="flex justify-between gap-10 p-5">
      <h1>Backery</h1>

      <nav className="flex gap-10">
        {navLinks.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-slate-50 ${isActive && "font-bold"}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <User />
    </header>
  );
}

export default Header;
