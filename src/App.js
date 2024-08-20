import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./Pages/HomePage";
import CheckoutPage from "./Pages/CheckoutPage";
import CartPage from "./Pages/CartPage";

import NotFoundPage from "./Pages/NotFoundPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import SignupPage from "./Pages/SignupPage";
import UserProfilePage from "./Pages/UserProfilePage";
import ProductPage from "./Pages/ProductPage";
import Layout from "./Components/Shared/Layout";
import MyOrders from "./Pages/MyOrders";
import ProfileOverview from "./Components/Profile/ProfileOverview";
import AccountSetting from "./Components/Profile/AccountSetting";
import Product from "./Components/Profile/Product";
import AddProduct from "./Components/Profile/AddProduct";
import LoginPage from "./Components/Auth/Login";
import { useSelector } from "react-redux";
import Loader from "./Components/Shared/Loader";
function App() {
  const isLoggedIn = sessionStorage.getItem("isAuthenticated");
  const isLoading = useSelector(state => state.products.isLoading);
  const isLoadingProducts = useSelector(state => state.products.isLoading);

  console.log(isLoadingProducts);
  console.log(isLoading);
  return (
    <>
      {(isLoading || isLoadingProducts) && <Loader />}
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/products' element={<ProductPage />} />
            <Route path='/products/:id' element={<ProductDetailPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />

            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='*' element={<NotFoundPage />} />

            {/* Nested Routes for User Profile */}
            <Route path='/profile' element={<UserProfilePage />}>
              <Route path='' element={<ProfileOverview />} />
              <Route path='orders' element={<MyOrders />} />
              <Route path='settings' element={<AccountSetting />} />
              <Route path='products'>
                <Route path='' element={<Product />} />
                <Route path='add' element={<AddProduct />} />
              </Route>
            </Route>
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
