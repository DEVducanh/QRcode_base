import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/client/Home";
import ProductScreen from "./components/Product";
import Dashboard from "./screens/admin/Dashboard";
import ProductsManager from "./screens/admin/Products";
import OrderScreen from "./screens/client/OrderScreen";
import CartScreen from "./screens/client/CartScreen";
import QRScan from "./components/QRScanPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/table/:tableCode" element={<QRScan />} />
        <Route path="/products" element={<ProductScreen />} />
        <Route path="/orders" element={<OrderScreen />} />
        <Route path="/cart" element={<CartScreen />} />
      </Routes>

      <Routes>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductsManager />} />
      </Routes>
    </>
  );
}

export default App;
