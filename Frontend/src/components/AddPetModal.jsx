import { useState } from "react";
import { createPet } from "../services/api";

const TYPES = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Hamster", "Other"];

export default function AddPetModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    name: "", type: "", breed: "", age: "", gender: "", description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.name || !form.type) return setError("Name and type are required.");
    setLoading(true);
    try {
      const { data } = await createPet({ ...form, age: Number(form.age) || 0 });
      onCreated(data);
      onClose();
    } catch {
      setError("Failed to create pet. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#E9DBBD] rounded-3xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-[#2F2926] text-xl font-bold opacity-50 hover:opacity-100"
        >✕</button>

        <h2 className="font-playfair text-2xl font-bold text-[#2F2926] mb-1">Add a new pet 🐾</h2>
        <p className="text-sm text-[#749EA1] mb-5">Fill in the basics — you can add more details later.</p>

        {error && <p className="text-xs text-[#B22026] mb-3 font-semibold">{error}</p>}

        <div className="flex flex-col gap-3">
          <input name="name" value={form.name} onChange={handle}
            placeholder="Pet name *"
            className="rounded-xl px-4 py-2 text-sm border border-[#DBBC97] bg-white outline-none focus:border-[#749EA1] text-[#2F2926]"
          />
          <select name="type" value={form.type} onChange={handle}
            className="rounded-xl px-4 py-2 text-sm border border-[#DBBC97] bg-white outline-none focus:border-[#749EA1] text-[#2F2926]"
          >
            <option value="">Select type *</option>
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <input name="breed" value={form.breed} onChange={handle}
            placeholder="Breed"
            className="rounded-xl px-4 py-2 text-sm border border-[#DBBC97] bg-white outline-none focus:border-[#749EA1] text-[#2F2926]"
          />
          <div className="flex gap-3">
            <input name="age" value={form.age} onChange={handle}
              placeholder="Age (years)"
              type="number" min="0"
              className="rounded-xl px-4 py-2 text-sm border border-[#DBBC97] bg-white outline-none focus:border-[#749EA1] text-[#2F2926] w-1/2"
            />
            <select name="gender" value={form.gender} onChange={handle}
              className="rounded-xl px-4 py-2 text-sm border border-[#DBBC97] bg-white outline-none focus:border-[#749EA1] text-[#2F2926] w-1/2"
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <textarea name="description" value={form.description} onChange={handle}
            placeholder="A little about your pet..."
            rows={3}
            className="rounded-xl px-4 py-2 text-sm border border-[#DBBC97] bg-white outline-none focus:border-[#749EA1] text-[#2F2926] resize-none"
          />
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="mt-5 w-full bg-[#B22026] text-white font-bold py-3 rounded-2xl text-sm hover:bg-[#8f1a1e] transition-colors disabled:opacity-60"
        >
          {loading ? "Creating..." : "Add Pet 🐾"}
        </button>
      </div>
    </div>
  );
}