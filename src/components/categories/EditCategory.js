import React, { useState, useEffect } from "react";
import { getCategoryById, updateCategory  } from "../../api/categoryApi";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", url_name: "", info: "", img_url: "" });

  useEffect(() => {
    fetchCategory ();
  }, [id]);

  const fetchCategory  = async () => {
    try {
      const { data } = await getCategoryById(id);
      setFormData({ name: data.name, url_name: data.url_name, info: data.info, img_url: data.img_url });
    } catch (error) {
      console.error("Error fetching category :", error.response?.data || error.message);
      toast.error("Failed to fetch category  data.", { position: "top-right" });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCategory (id, formData);
      toast.success("category  updated successfully!", { position: "top-right" });
      navigate("/categories");
    } catch (error) {
      console.error("Error updating category :", error.response?.data || error.message);
      toast.error("Failed to update category .", { position: "top-right" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <ToastContainer />
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Edit category </h1>
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
              value={formData.url_name}
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
              Back to category s
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Update category 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory ;
