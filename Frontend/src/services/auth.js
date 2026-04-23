import API from "../services/api";

export const signupUser = (data) => API.post("/auth/signup", data);

export const loginUser = (data) => API.post("/auth/login", data);