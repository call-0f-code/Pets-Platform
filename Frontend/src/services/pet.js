import API from "./services/api";

export const createPet = (data) => API.post("/pets", data);
export const getPets = () => API.get("/pets");
export const updatePet = (id, data) => API.put(`/pets/${id}`, data);
export const deletePet = (id) => API.delete(`/pets/${id}`);