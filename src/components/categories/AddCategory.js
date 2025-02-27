import React, { useState } from "react";
import { addCategory } from "../../api/categoryApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
      const [formData, setFormData] = useState({ name: "", url_name: "", info: "", img_url: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCategory(formData);
      toast.success("Category added successfully!", { 
        position: "top-right",
        autoClose: 3000, 
      });
      navigate("/categories",{state:{addingcategory:true}});
    } catch (error) {
      console.error("Error adding category :", error.response?.data || error.message);
      //toast.error("Failed to add category .", { position: "top-right" });
      navigate("/categories",{state:{error:'faild to add new category'}});

    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <ToastContainer />
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Add New Category </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">URL Name</label>
            <input
              type="text"
              name="url_name"
              value={formData.ml}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Info</label>
            <input
              type="text"
              name="info"
              value={formData.info}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Image URL</label>
            <input
              type="text"
              name="img_url"
              value={formData.img_url}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-6 py-2 text-sm font-semibold text-white bg-gray-500 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
              onClick={() => navigate("/categories")}
            >
              Back to Categories
            </button>
            <button
              type="submit"
              onClick={() => handleSubmit}
              className="px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Add Category 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
