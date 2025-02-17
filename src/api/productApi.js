// src/api/productApi.js

import axios from "axios";

const API_URL = "http://localhost:3003/products";

// Create an axios instance with withCredentials: true
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/**
 * Fetch list of products
 * @returns {Array} - List of products or error
 */
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get(`/index`);
    return response.data;
  } catch (error) {
    console.error("Error in getProducts:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Add a new product
 * @param {Object} product - New product details
 * @returns {Object} - Response data or error
 */
export const addProduct = async (product) => {
  try {
    const response = await axiosInstance.post(`/`, product);
    return response.data;
  } catch (error) {
    console.error("Error in addProduct:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update product by ID
 * @param {String} id - Product ID
 * @param {Object} product - Updated product details
 * @returns {Object} - Response data or error
 */
export const updateProduct = async (id, product) => {
  try {
    const response = await axiosInstance.put(`/${id}`, product);
    return response.data;
  } catch (error) {
    console.error("Error in updateProduct:", error.response?.data || error.message);
    throw error;
  }
};


/**
 * Fetch a single product by ID
 * @param {String} id - Product ID
 * @returns {Object} - Product data or error
 */
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.error("Product not found:", error.response.data);
    } else {
      console.error("Error fetching product:", error.response?.data || error.message);
    }
    throw error;
  }
};




/**
 * Delete product by ID
 * @param {String} id - Product ID
 * @returns {Object} - Response data or error
 */
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in deleteProduct:", error.response?.data || error.message);
    throw error;
  }
};
