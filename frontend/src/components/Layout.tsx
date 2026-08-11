import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="bg-[#6b3d23] flex flex-col text-blue-50 ">
      <Header />

      <main className="flex-1 p-6 bg-slate-50 h-fit">
        <Outlet />
      </main>
    </div>
  );
}
