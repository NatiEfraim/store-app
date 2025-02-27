import React, { useState, useEffect } from "react";
import { addUser, getRoleAuthUser } from "../../api/userApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {UserRoles} from "../../utilities/userRoles";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false); // Prevent duplicate submissions
  const navigate = useNavigate(); // To redirect back to user list

  useEffect(() => {
    checkUserRole();
  }, []);

  const checkUserRole = async () => {
    try {
      const { data: role } = await getRoleAuthUser();
      
      if (![UserRoles.ADMIN, UserRoles.SUPERADMIN].includes(role)) {
        toast.error("Unauthorized access. Redirecting to User Table.", {
          position: "top-right",
        });
        navigate("/users");
      }
    } catch (error) {
      console.error("Error checking user role:", error.response?.data || error.message);
      toast.error("Failed to verify role. Redirecting to User Table.", {
        position: "top-right",
      });
      navigate("/users");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent duplicate form submissions
    setLoading(true);

    try {
      await addUser(formData);
      //toast.success("User added successfully!", { position: "top-right" });
      navigate("/users",{state:{adduser:true}}); // Redirect to the user list page
    } catch (error) {
      console.error("Error adding user:", error.response?.data || error.message);
      navigate("/users",{state:{error:'faild to add new Product'}});
    } finally {
      setLoading(false); // Re-enable the form
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <ToastContainer />
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
          Add New User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className={`w-full py-3 text-white rounded-lg shadow-lg transition-transform transform ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 hover:scale-105"
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add User"}
          </button>
        </form>
        <button
          onClick={() => navigate("/users")}
          className="w-full mt-4 py-3 text-white bg-gray-500 hover:bg-gray-600 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Back to User List
        </button>
      </div>
    </div>
  );
};

export default AddUser;
