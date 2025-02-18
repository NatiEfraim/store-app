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
      console.error(
        "Error fetching products:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch products.", { position: "top-right" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully!", {
          position: "top-right",
        });
        fetchProducts(); // Refresh the product list
      } catch (error) {
        console.error(
          "Error deleting product:",
          error.response?.data || error.message
        );
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <table className="w-full border border-collapse border-gray-200 table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border border-gray-300">Image</th>
            <th className="px-4 py-2 border border-gray-300">Name</th>
            <th className="px-4 py-2 border border-gray-300">Category</th>
            <th className="px-4 py-2 border border-gray-300">Price</th>
            <th className="px-4 py-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-4 py-2 border border-gray-300">
                <img
                  src={product.img_url}
                  alt={product.name}
                  className="h-16 w-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {product.name}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {product.category_url}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                ${product.price}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                <button
                  className="px-2 py-1 text-white bg-blue-500 rounded mr-2"
                  onClick={() => handleView(product._id)}
                >
                  View
                </button>
                <button
                  className="px-2 py-1 text-white bg-green-500 rounded mr-2"
                  onClick={() => handleEdit(product._id)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 text-white bg-red-500 rounded"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 text-white bg-gray-500 rounded"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </button>
        <button
          className="px-4 py-2 text-white bg-green-500 rounded"
          onClick={() => navigate("/products/add")}
        >
          Add New Product
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
