import axiosClient from "./axiosClient";

export const signup = (username, password) =>
  axiosClient.post("/auth/signup", { username, password });

export const login = (username, password) =>
  axiosClient.post("/auth/login", { username, password });
