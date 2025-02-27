import React, { useState, useEffect } from "react";
import { getProductById, updateProduct } from "../../api/productApi";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    info: "",
    price: "",
    category_url: "",
    img_url: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await getProductById(id);
      setFormData({
        name: data.name,
        info: data.info,
        price: data.price,
        category_url: data.category_url,
        img_url: data.img_url,
      });
    } catch (error) {
      console.error(
        "Error fetching product:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch product data.", { position: "top-right" });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      await updateProduct(id, formData);
     
          toast.success("Product updated successfully!", { 
              position: "top-right",
              autoClose: 3000, // Display for 3 seconds
            });
       
      navigate("/products" ,{state:{adduser:true}});
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response?.data || error.message
      );
      toast.error("Failed to update product.", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Edit Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">
              Description
            </label>
            <textarea
              name="info"
              value={formData.info}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              onClick={() => navigate("/products")}
            >
              Back to Products
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } transition`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditProduct;
