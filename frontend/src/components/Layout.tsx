import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Copyright } from "lucide-react";

export default function Layout() {
  return (
    <div className="bg-[#6b3d23] flex flex-col text-blue-50 ">
      <Header />

      <main className="flex-1 bg-[#f7efe6] h-screen">
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
