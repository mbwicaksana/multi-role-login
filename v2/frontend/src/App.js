import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/products/add" element={<AddProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
