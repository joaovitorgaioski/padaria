import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="h-screen bg-[#6b3d23] flex flex-col text-blue-50">
      <Header />

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
