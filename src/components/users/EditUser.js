import React, { useState, useEffect } from "react";
import { updateUser } from "../../api/userApi";

const EditUser = ({ user, onUserUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user._id, formData);
      alert("User updated successfully!");
      onUserUpdated(); // Callback to refresh the user list
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
      alert("Failed to update user. Please try again.");
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
            className="w-full p-2 border border-gray-300"
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
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div>
          <label className="block mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-blue-500">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
