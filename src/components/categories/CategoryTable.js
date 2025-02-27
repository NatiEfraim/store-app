import React, { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../../api/categoryApi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const location=useLocation()
      useEffect(() => {
        if (location.state?.addingcategory) {
          toast.success("Category added successfully!", { position: "top-right" });
        } else if (location.state?.error) {
          toast.error(location.state.error, { position: "top-right" });
        }
      }, [location]);


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching drinks:", error.response?.data || error.message);
      toast.error("Failed to fetch drinks.", { position: "top-right" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this drink?")) {
      try {
        await deleteCategory(id);
        toast.success("Category deleted successfully!", { position: "top-right" });
        fetchCategories(); // Refresh category list
      } catch (error) {
        console.error("Error deleting category:", error.response?.data || error.message);
        toast.error("Failed to delete category.", { position: "top-right" });
      }
    }
  };

   const handleView = (id) => {
    navigate(`/categories/details/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/categories/edit/${id}`);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <ToastContainer/>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Categories Management</h2>
      <table className="w-full table-auto border-collapse border border-gray-300 shadow-sm rounded-lg">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left">Name</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">URL Name</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">Info</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">Image URL</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="hover:bg-gray-50">
              <td className="text-primary px-6 py-4 border-b border-gray-200 text-gray-700">{category.name}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{category.url_name}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                {category.info}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
              <a href={category.img_url}>Link</a>
              </td>
              <td className="px-6 py-10 h-auto border-b border-gray-200 flex items-center space-x-2">
                <button
                  className="px-3 py-1 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded shadow"
                  onClick={() => handleEdit(category._id)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded shadow"
                  onClick={() => handleDelete(category._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-3 text-white bg-gray-700 hover:bg-gray-800 font-medium text-sm rounded shadow"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </button>
        <button
          className="px-6 py-3 text-white bg-green-500 hover:bg-green-600 font-medium text-sm rounded shadow"
          onClick={() => navigate("/categories/add")}
        >
          Add New Category
        </button>
      </div>
    </div>
  );
};

export default CategoryTable;
