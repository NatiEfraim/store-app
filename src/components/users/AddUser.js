import React, { useState } from "react";
import { addUser } from "../../api/userApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = ({ onUserAdded }) => {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  
  const [loading, setLoading] = useState(false); // Prevent duplicate submissions

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent duplicate form submissions
    setLoading(true);

    try {
      await addUser(formData);
      toast.success("User added successfully!", { position: "top-right" });
      setFormData({ name: "", email: "", password: "", role: "user" });
      onUserAdded(); // Callback to refresh the user list

    } catch (error) {
      console.log("Error adding user:",error.message);
      // ("Error adding user:", error.response?.data || error.message);
      // toast.error(`Failed to add user: ${error.response?.data?.msg || error.message}`, {
      //   position: "top-right",
      // });
    } finally {
      setLoading(false); // Re-enable the form
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Add New User</h2>
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
            disabled={loading} // Disable input while submitting
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
            disabled={loading} // Disable input while submitting
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            disabled={loading} // Disable input while submitting
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
            disabled={loading} // Disable input while submitting
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className={`px-4 py-2 text-white bg-blue-500 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading} // Disable button while submitting
        >
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddUser;
