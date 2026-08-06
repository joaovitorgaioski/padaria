import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Layout from "../components/Layout";
import Menu from "../pages/Menu";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas com Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
        </Route>

        {/* Rotas sem Layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
