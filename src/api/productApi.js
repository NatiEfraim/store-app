import axios from "axios";

const API_URL = "http://localhost:3003/products";

export const getProducts = () => axios.get(`${API_URL}/index`);
export const addProduct = (product) => axios.post(API_URL, product);
export const updateProduct = (id, product) => axios.put(`${API_URL}/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);