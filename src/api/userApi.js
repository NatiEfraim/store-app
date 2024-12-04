import axios from "axios";

const API_URL = "http://localhost:3003/users";

// Add `withCredentials: true` to enable cookies
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

/**
 * Login user
 * @param {Object} data - User login credentials
 * @returns {Object} - Response data or error
 */
export const login = async (data) => {
  try {
    const response = await axiosInstance.post(`/login`, data);
    // console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error in login:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Signup new user
 * @param {Object} data - New user details
 * @returns {Object} - Response data or error
 */
export const signup = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/signup`, data);
    return response.data;
  } catch (error) {
    console.error("Error in signup:", error.response?.data || error.message);
    throw error;
  }
};


/**
 * Fetch authenticated user information
 * @returns {Object} - User information or error
 */
export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/userInfo");
    return response.data;
  } catch (error) {
    console.error("Error in getUserInfo:", error.response?.data || error.message);
    throw error; // Re-throw to be handled by the calling function
  }
};


/**
 * Fetch list of users
 * @returns {Array} - List of users or error
 */
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(`/index`);
    return response.data;
  } catch (error) {
    console.error("Error in getUsers:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Add a new user
 * @param {Object} user - New user details
 * @returns {Object} - Response data or error
 */
export const addUser = async (user) => {
  try {
    const response = await axiosInstance.post(API_URL, user);
    return response.data;
  } catch (error) {
    console.error("Error in addUser:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update user by ID
 * @param {String} id - User ID
 * @param {Object} user - Updated user details
 * @returns {Object} - Response data or error
 */
export const updateUser = async (id, user) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error in updateUser:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete user by ID
 * @param {String} id - User ID
 * @returns {Object} - Response data or error
 */
export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in deleteUser:", error.response?.data || error.message);
    throw error;
  }
};
