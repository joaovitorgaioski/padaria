import { NavLink, Outlet } from "react-router-dom";
import { Copyright, User } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Cardápio", path: "/menu" },
  { label: "Meus Pedidos", path: "/pedidos" },
  { label: "Sobre Nós", path: "/sobre" },
  { label: "Fale Conosco", path: "/contato" },
];

export default function Layout() {
  return (
    <div className="bg-[#6b3d23] flex flex-col text-blue-50 ">
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

      <main className="flex-1 bg-[#f7efe6] h-screen no-scrollbar">
        <Outlet />
      </main>

      <footer className="flex flex-col items-center p-2 bottom-0">
        <div className="flex items-end gap-1">
          <h2 className="text-2xl font-bold">Bakery</h2>
          <Copyright />
        </div>
        <p className="text-sm italic">Faz parte do seu dia a dia!</p>
      </footer>
    </div>
  );
}
