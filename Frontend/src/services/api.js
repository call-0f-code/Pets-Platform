import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";


const API = axios.create({
  baseURL: `${apiUrl}/api`,
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// USER
export const getMe = () => API.get("/profile");
 
// PETS
export const getMyPets = () => API.get("/pets");
export const getPetById = (id) => API.get(`/pets/${id}`);
export const createPet = (data) => API.post("/pets", data);
export const updatePet = (id, data) => API.put(`/pets/${id}`, data);
export const deletePet = (id) => API.delete(`/pets/${id}`);
 
export default API;
