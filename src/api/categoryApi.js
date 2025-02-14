import axios from "axios";

const API_URL = "http://localhost:3003/categories";

// Create an axios instance with withCredentials: true
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/**
 * Fetch list of categories
 * @returns {Array} - List of categories or error
 */
export const getCategories = async () => {
  try {
    const response = await axiosInstance.get(`/index`);
    return response.data;
  } catch (error) {
    console.error("Error in getCategories:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Add a new category
 * @param {Object} category - New category details
 * @returns {Object} - Response data or error
 */
export const addCategory = async (category) => {
  try {
    const response = await axiosInstance.post(`/`, category);
    return response.data;
  } catch (error) {
    console.error("Error in addCategory:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update category by ID
 * @param {String} id - Category ID
 * @param {Object} category - Updated category details
 * @returns {Object} - Response data or error
 */
export const updateCategory = async (id, category) => {
  try {
    const response = await axiosInstance.put(`/${id}`, category);
    return response.data;
  } catch (error) {
    console.error("Error in updateCategory:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch category by ID
 */
export const getCategoryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in getCategoryById:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete category by ID
 * @param {String} id - Category ID
 * @returns {Object} - Response data or error
 */
export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in deleteCategory:", error.response?.data || error.message);
    throw error;
  }
};
