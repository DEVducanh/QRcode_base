import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/client/Home";
import ProductScreen from "./screens/client/Product";
import Dashboard from "./screens/admin/Dashboard";
import ProductsManager from "./screens/admin/Products";

function App() {
  // const count = useAppSelector((state: RootState) => state.counter.value);
  // const dispatch = useAppDispatch();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/products" element={<ProductScreen />} />
      </Routes>

      <Routes>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductsManager />} />
      </Routes>
    </>
  );
}

export default App;
