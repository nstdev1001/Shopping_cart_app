import { Fragment, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductsPage from "./components/ProductsPage";
import ProductsDetail from "./components/ProductsDetail";
import NavBar from "./components/NavBar";
import CartPage from "./components/CartPage";
import WishList from "./components/WishList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        {/* navbar */}
        <ToastContainer position="bottom-center" />
        <NavBar />

        <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductsDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishList />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
