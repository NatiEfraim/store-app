import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const { data } = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error.response?.data || error.message);
      toast.error("Failed to fetch product details", { position: "top-right" });
    }
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Product Details</h1>

        <div className="flex flex-col sm:flex-row items-center justify-between">
          <img src={product.img_url} alt={product.name} className="h-56 w-full sm:w-1/2 object-cover rounded-lg shadow-md" />
          <div className="sm:ml-6 text-center sm:text-left mt-6 sm:mt-0">
            <h2 className="text-lg font-semibold text-gray-600">Name</h2>
            <p className="text-xl text-gray-800">{product.name}</p>

            <h2 className="text-lg font-semibold text-gray-600 mt-4">Category</h2>
            <p className="text-xl text-gray-800">{product.category_url}</p>

            <h2 className="text-lg font-semibold text-gray-600 mt-4">Price</h2>
            <p className="text-xl text-gray-800">${product.price}</p>

            <h2 className="text-lg font-semibold text-gray-600 mt-4">Description</h2>
            <p className="text-gray-700">{product.info}</p>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate(`/products/edit/${product._id}`)}
          >
            Edit Product
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            onClick={() => navigate("/products")}
          >
            Back to Products
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
