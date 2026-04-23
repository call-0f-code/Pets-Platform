import { useState } from "react";
import API from "../services/api";

export default function PetForm({ close, refresh }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/pets", form);

    refresh();   // reload pets
    close();     // close Form
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">

        <h2 className="text-xl font-bold mb-4">Add Pet 🐾</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            className="border p-2 w-full mb-2"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Type"
            className="border p-2 w-full mb-2"
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />

          <input
            placeholder="Breed"
            className="border p-2 w-full mb-2"
            onChange={(e) => setForm({ ...form, breed: e.target.value })}
          />

          <input
            placeholder="Age"
            className="border p-2 w-full mb-4"
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={close}
              className="text-red-500"
            >
              Cancel
            </button>

            <button className="bg-blue-500 text-white px-4 py-1 rounded">
              Create Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}