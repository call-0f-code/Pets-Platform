import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyPets, deletePet } from "../services/api";
import AddPetModal from "../components/AddPetModal";

const PET_EMOJIS = { Dog: "🐶", Cat: "🐱", Bird: "🐦", Rabbit: "🐰", Fish: "🐠", Hamster: "🐹", Other: "🐾" };

function PetCard({ pet, onDelete, onClick }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div
      onClick={onClick}
      className="relative bg-white rounded-2xl border-2 border-[#DBBC97] p-4 flex flex-col items-center cursor-pointer hover:border-[#749EA1] hover:shadow-md transition-all group"
    >
      <button
        onClick={(e) => { e.stopPropagation(); setConfirmDelete(true); }}
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#B22026] text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
      >✕</button>

      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#749EA1] to-[#DBBC97] flex items-center justify-center text-3xl mb-3 border-2 border-[#B22026]">
        {pet.image ? (
          <img src={pet.image} alt={pet.name} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span>{PET_EMOJIS[pet.type] || "🐾"}</span>
        )}
      </div>

      <p className="font-playfair font-bold text-[#2F2926] text-base">{pet.name}</p>
      <p className="text-xs text-[#749EA1] font-semibold mt-0.5">{pet.breed || pet.type}</p>
      <p className="text-xs text-[#DBBC97] mt-0.5">{pet.age ? `${pet.age} yr${pet.age !== 1 ? "s" : ""}` : ""} {pet.gender ? `· ${pet.gender}` : ""}</p>

      {confirmDelete && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center gap-2 p-3"
        >
          <p className="text-xs font-bold text-[#2F2926] text-center">Remove {pet.name}?</p>
          <div className="flex gap-2">
            <button
              onClick={() => onDelete(pet._id)}
              className="bg-[#B22026] text-white text-xs font-bold px-3 py-1.5 rounded-xl"
            >Yes, remove</button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="bg-[#E9DBBD] text-[#2F2926] text-xs font-bold px-3 py-1.5 rounded-xl"
            >Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function UserProfile() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
      fetchPets();
      try {
        const { data } = await API.get("/profile");
        setUser(data);
      } catch {
        console.error("Could not fetch profile");
      }
    };
    init();
  }, []);

  const fetchPets = async () => {
    try {
      const { data } = await getMyPets();
      setPets(data);
    } catch {
      console.error("Failed to fetch pets");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePet(id);
      setPets((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Could not delete pet.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="min-h-screen bg-[#E9DBBD]" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Top nav */}
      <nav className="bg-[#2F2926] px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <span className="font-playfair text-[#E9DBBD] text-xl font-bold tracking-wide">🐾 PetPal</span>
        <button
          onClick={handleLogout}
          className="text-xs text-[#DBBC97] border border-[#DBBC97]/40 rounded-xl px-3 py-1.5 hover:bg-white/10 transition"
        >Logout</button>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* User card */}
        <div className="bg-[#2F2926] rounded-3xl p-5 mb-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#749EA1] flex items-center justify-center text-white text-xl font-bold font-playfair flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-playfair text-[#E9DBBD] text-xl font-bold truncate">
              {user?.name || "Your Profile"}
            </h1>
            <p className="text-[#DBBC97] text-xs mt-0.5 truncate">{user?.email}</p>
            {user?.contactNo && <p className="text-[#DBBC97]/70 text-xs mt-0.5">📞 {user.contactNo}</p>}
            {user?.address && <p className="text-[#DBBC97]/70 text-xs truncate">📍 {user.address}</p>}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { num: pets.length, label: "Pets" },
            { num: pets.reduce((a, p) => a + (p.schedule?.length || 0), 0), label: "Schedules" },
            { num: pets.reduce((a, p) => a + (p.allergies?.length || 0), 0), label: "Allergies noted" },
          ].map(({ num, label }) => (
            <div key={label} className="bg-white rounded-2xl p-3 text-center border border-[#DBBC97]">
              <span className="font-playfair text-[#B22026] text-2xl font-bold block">{num}</span>
              <span className="text-[#2F2926]/60 text-[10px] font-semibold uppercase tracking-wide">{label}</span>
            </div>
          ))}
        </div>

        {/* My Pets section */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-playfair text-[#2F2926] text-lg font-bold flex items-center gap-2">
            🐾 My Pets
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#B22026] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#8f1a1e] transition-colors"
          >+ Add Pet</button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-[#749EA1] font-semibold">Loading your pets...</div>
        ) : pets.length === 0 ? (
          <div
            onClick={() => setShowModal(true)}
            className="bg-white/50 border-2 border-dashed border-[#DBBC97] rounded-2xl p-10 text-center cursor-pointer hover:bg-white/80 transition"
          >
            <p className="text-4xl mb-2">🐾</p>
            <p className="text-[#749EA1] font-bold text-sm">No pets yet!</p>
            <p className="text-[#2F2926]/50 text-xs mt-1">Click to add your first furry friend</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {pets.map((pet) => (
              <PetCard
                key={pet._id}
                pet={pet}
                onDelete={handleDelete}
                onClick={() => navigate(`/pet/${pet._id}`)}
              />
            ))}
            <div
              onClick={() => setShowModal(true)}
              className="bg-white/40 border-2 border-dashed border-[#DBBC97] rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white/70 transition min-h-[140px]"
            >
              <span className="text-2xl text-[#DBBC97] font-bold">+</span>
              <span className="text-xs text-[#749EA1] font-bold mt-1">Add pet</span>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <AddPetModal
          onClose={() => setShowModal(false)}
          onCreated={(pet) => setPets((prev) => [...prev, pet])}
        />
      )}
    </div>
  );
}
