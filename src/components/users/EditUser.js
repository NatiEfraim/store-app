
import React, { useState, useEffect } from "react";
import { getUserById, updateUser } from "../../api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { toast, ToastContainer } from "react-toastify";

const EditUser = () => {
  const { id } = useParams(); // Get user ID from URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });

  // Fetch user data by ID
  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      const { data } = await getUserById(id);
      setFormData({
        name: data.name,
        email: data.email,
        role: data.role,
      });
    } catch (error) {
      console.error("Error fetching user data:", error.response?.data || error.message);
      toast.error("Failed to fetch user data", { position: "top-right" });
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, formData);
      toast.success("User updated successfully!", { position: "top-right" });
      navigate("/users"); // Redirect to the user list
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
      toast.error("Failed to update user", { position: "top-right" });
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
          Update User
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditUser;
