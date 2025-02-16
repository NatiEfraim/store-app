import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/productApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
      toast.error("Failed to fetch products.", { position: "top-right" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("product deleted successfully!", { position: "top-right" });
        fetchProducts(); // Refresh product list
      } catch (error) {
        console.error("Error deleting product:", error.response?.data || error.message);
        toast.error("Failed to delete product.", { position: "top-right" });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/products/details/${id}`);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">products Management</h2>
      <table className="w-full table-auto border-collapse border border-gray-300 shadow-sm rounded-lg">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 text-left">Name</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">Volume (ml)</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">Price</th>
            <th className="px-6 py-3 border-b border-gray-200 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{product.name}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">{product.ml}</td>
              <td className="px-6 py-4 border-b border-gray-200 text-gray-700">${product.price.toFixed(2)}</td>
              <td className="px-6 py-4 border-b border-gray-200 flex items-center space-x-2">
                <button
                  className="px-3 py-1 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded shadow"
                  onClick={() => handleView(product._id)}
                >
                  View
                </button>
                <button
                  className="px-3 py-1 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded shadow"
                  onClick={() => handleEdit(product._id)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded shadow"
                  onClick={() => handleDelete(product._id)}
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
          onClick={() => navigate("/products/add")}
        >
          Add New product
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
