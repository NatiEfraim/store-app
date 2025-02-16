import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import UserDetails from "./components/users/UserDetails";

import AddDrink from "./components/drinks/AddDrink";
import EditDrink from "./components/drinks/EditDrink";
import DrinkDetails from "./components/drinks/DrinkDetails";
import DrinkPage from "./pages/DrinksPage";

import CategoriesPage from "./pages/CategoriesPage"
import AddCategory from "./components/categories/AddCategory"
import EditCategory from "./components/categories/EditCategory"

import ProductsPage from "./pages/ProductsPage";
import AddProduct from "./components/products/AddProduct";
import EditProduct from "./components/products/EditProduct";
import ProductDetails from "./components/products/ProductDetails";

// Function to check if a user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Check for token in localStorage
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={isAuthenticated() ? <Navigate to="/" /> : <SignUpPage />} />

        {/* Protected Routes */}
        <Route path="/" element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/users" element={isAuthenticated() ? <UsersPage /> : <Navigate to="/login" />} />
        <Route path="/users/add" element={isAuthenticated() ? <AddUser /> : <Navigate to="/login" />} />
        <Route path="/users/edit/:id" element={isAuthenticated() ? <EditUser /> : <Navigate to="/login" />} />
        <Route path="/users/details/:id" element={isAuthenticated() ? <UserDetails /> : <Navigate to="/login" />} />
        <Route path="/drinks" element={isAuthenticated() ? <DrinkPage /> : <Navigate to="/login" />} />
        <Route path="/drinks/add" element={isAuthenticated() ? <AddDrink /> : <Navigate to="/login" />} />
        <Route path="/drinks/edit/:id" element={isAuthenticated() ? <EditDrink /> : <Navigate to="/login" />} />
        <Route path="/drinks/details/:id" element={isAuthenticated() ? <DrinkDetails /> : <Navigate to="/login" />} />

        <Route path="/categories" element={isAuthenticated() ? <CategoriesPage /> : <Navigate to="/login" />} />
        <Route path="/categories/add" element={isAuthenticated() ? <AddCategory /> : <Navigate to="/login" />} />
        <Route path="/categories/edit/:id" element={isAuthenticated() ? <EditCategory /> : <Navigate to="/login" />} />

        <Route path="/products" element={isAuthenticated() ? <ProductsPage /> : <Navigate to="/login" />} />
        <Route path="/products/add" element={isAuthenticated() ? <AddProduct /> : <Navigate to="/login" />} />
        <Route path="/products/edit/:id" element={isAuthenticated() ? <EditProduct /> : <Navigate to="/login" />} />
        <Route path="/products/details/:id" element={isAuthenticated() ? <ProductDetails /> : <Navigate to="/login" />} />

        <Route path="*" element={<Navigate to="/login" />} />


      </Routes>
    </Router>
  );
}

export default App;
