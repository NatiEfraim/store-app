import axios from "axios";

const API_URL = "http://localhost:3003/categories";

export const getCategories = () => axios.get(`${API_URL}/index`);
export const addCategory = (category) => axios.post(API_URL, category);
export const updateCategory = (id, category) => axios.put(`${API_URL}/${id}`, category);
export const deleteCategory = (id) => axios.delete(`${API_URL}/${id}`);