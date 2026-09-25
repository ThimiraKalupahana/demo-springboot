import axiosClient from "./axiosClient";

export const getAllProducts = () => axiosClient.get("/products");

export const getProductById = (id) => axiosClient.get(`/products/${id}`);

export const createProduct = (product) => axiosClient.post("/products", product);

export const updateProduct = (id, product) =>
  axiosClient.put(`/products/${id}`, product);

export const deleteProduct = (id) => axiosClient.delete(`/products/${id}`);
