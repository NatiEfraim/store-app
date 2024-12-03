import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";

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
      </Routes>
    </Router>
  );
}

export default App;
