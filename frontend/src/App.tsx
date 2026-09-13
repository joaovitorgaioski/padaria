import { CarrinhoProvider } from "./context/CarrinhoContext";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <CarrinhoProvider>
      <AppRoutes />
    </CarrinhoProvider>
  );
}

export default App;
