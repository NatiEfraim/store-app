import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";

// Users
import UsersPage from "./pages/UsersPage";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import UserDetails from "./components/users/UserDetails";

// Drinks
import DrinkPage from "./pages/DrinksPage";
import AddDrink from "./components/drinks/AddDrink";
import EditDrink from "./components/drinks/EditDrink";
import DrinkDetails from "./components/drinks/DrinkDetails";

// Products
import ProductsPage from "./pages/ProductsPage";
import AddProduct from "./components/products/AddProduct";
import EditProduct from "./components/products/EditProduct";
import ProductDetails from "./components/products/ProductDetails";

// Utility function to check authentication
const isAuthenticated = () => !!localStorage.getItem("token");

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />

        {/* Users Management */}
        <Route path="/users" element={<ProtectedRoute element={<UsersPage />} />} />
        <Route path="/users/add" element={<ProtectedRoute element={<AddUser />} />} />
        <Route path="/users/edit/:id" element={<ProtectedRoute element={<EditUser />} />} />
        <Route path="/users/details/:id" element={<ProtectedRoute element={<UserDetails />} />} />

        {/* Drinks Management */}
        <Route path="/drinks" element={<ProtectedRoute element={<DrinkPage />} />} />
        <Route path="/drinks/add" element={<ProtectedRoute element={<AddDrink />} />} />
        <Route path="/drinks/edit/:id" element={<ProtectedRoute element={<EditDrink />} />} />
        <Route path="/drinks/details/:id" element={<ProtectedRoute element={<DrinkDetails />} />} />

        {/* Products Management */}
        <Route path="/products" element={<ProtectedRoute element={<ProductsPage />} />} />
        <Route path="/products/add" element={<ProtectedRoute element={<AddProduct />} />} />
        <Route path="/products/edit/:id" element={<ProtectedRoute element={<EditProduct />} />} />
        <Route path="/products/details/:id" element={<ProtectedRoute element={<ProductDetails />} />} />

        {/* Catch-All Route (Redirect to Login) */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
