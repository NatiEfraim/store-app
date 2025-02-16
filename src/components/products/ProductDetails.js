import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL params
  const navigate = useNavigate(); // For navigation
  const [product, setProduct] = useState(null); // Store product details

  // Fetch product details on component mount
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-bold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">Product Details</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-500">Name</h2>
              <p className="text-2xl font-bold text-gray-800">{product.name}</p>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-500">Info</h2>
              <p className="text-2xl font-bold text-gray-800">{product.info}</p>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-500">Price</h2>
              <p className="text-2xl font-bold text-gray-800">${product.price.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-500">Category_url</h2>
              <p className="text-2xl font-bold text-gray-800">${product.category_url}</p>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-500">Img_url</h2>
              <p className="text-2xl font-bold text-gray-800">${product.img_url}</p>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-500">User_id</h2>
              <p className="text-2xl font-bold text-gray-800">${product.user_id}</p>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-500">Created By</h2>
              <p className="text-2xl font-bold text-gray-800">{product.user?.name || "N/A"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-8">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-500">Created At</h2>
              <p className="text-base text-gray-700">{product.createdAt}</p>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-500">Updated At</h2>
              <p className="text-base text-gray-700">{product.updatedAt}</p>
            </div>
          </div>

          <div className="flex justify-center mt-10 space-x-6">
            <button
              className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition transform hover:scale-105"
              onClick={() => navigate(`/products/edit/${product._id}`)}
            >
              Edit Product
            </button>
            <button
              className="bg-gray-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition transform hover:scale-105"
              onClick={() => navigate("/products")}
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
