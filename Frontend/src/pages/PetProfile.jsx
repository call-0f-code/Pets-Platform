import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPetById, updatePet } from "../services/api.js";
import TagInput from "../components/TagInput";
import ScheduleSection from "../components/ScheduleSection";
import EmergencyContact from "../components/EmergencyContact";
import FavouritesSection from "../components/FavouritesSection.jsx";

const PET_EMOJIS = {
  Dog: "🐶",
  Cat: "🐱",
  Bird: "🐦",
  Rabbit: "🐰",
  Fish: "🐠",
  Hamster: "🐹",
  Other: "🐾",
};

function SectionCard({ title, icon, children }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-[#DBBC97] p-5">
      <h3 className="text-xs font-bold uppercase tracking-widest text-[#B22026] mb-4 flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="py-2 border-b border-[#E9DBBD] last:border-0">
      <span className="text-[10px] text-[#2F2926]/50 font-bold uppercase tracking-wider block">
        {label}
      </span>
      <span className="text-sm font-semibold text-[#2F2926]">
        {value || (
          <span className="text-[#2F2926]/30 font-normal">Not set</span>
        )}
      </span>
    </div>
  );
}

export default function PetProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingContact, setEditingContact] = useState(false);
  const [contactForm, setContactForm] = useState({});

  useEffect(() => {
    fetchPet();
  }, [id]);

  const fetchPet = async () => {
    try {
      const { data } = await getPetById(id);
      setPet(data);
      setContactForm(data.emergencyContact || {});
    } catch {
      setTimeout(() => {
  navigate("/profile");
}, 100);
    } finally {
      setLoading(false);
    }
  };

  const save = async (updates) => {
    setSaving(true);
    try {
      const merged = { ...pet, ...updates };
      const { data } = await updatePet(id, merged);
      setPet(data);
    } catch {
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  // Tag helpers
  const addTag = (field, subfield, val) => {
    if (subfield) {
      save({
        favourites: {
          ...pet.favourites,
          [subfield]: [...(pet.favourites[subfield] || []), val],
        },
      });
    } else {
      save({ [field]: [...(pet[field] || []), val] });
    }
  };

  const removeTag = (field, subfield, index) => {
    if (subfield) {
      const arr = [...(pet.favourites[subfield] || [])];
      arr.splice(index, 1);
      save({ favourites: { ...pet.favourites, [subfield]: arr } });
    } else {
      const arr = [...(pet[field] || [])];
      arr.splice(index, 1);
      save({ [field]: arr });
    }
  };

  const saveContact = () => {
    save({ emergencyContact: contactForm });
    setEditingContact(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E9DBBD] flex items-center justify-center">
        <p className="text-[#749EA1] font-bold text-lg animate-pulse">
          Loading pet profile... 🐾
        </p>
      </div>
    );
  }

  if (!pet) return null;

  const emoji = PET_EMOJIS[pet.type] || "🐾";

  return (
    <div
      className="min-h-screen bg-[#E9DBBD]"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* Nav */}
      <nav className="bg-[#2F2926] px-6 py-3 flex items-center gap-3 sticky top-0 z-40">
        <button
          onClick={() => navigate("/profile")}
          className="text-[#DBBC97] text-sm font-bold flex items-center gap-1 hover:text-white transition"
        >
          ← Back
        </button>
        <span className="text-[#E9DBBD]/40">|</span>
        <span className="font-playfair text-[#E9DBBD] font-bold">
          {pet.name}
        </span>
        {saving && (
          <span className="ml-auto text-[10px] text-[#749EA1] font-semibold animate-pulse">
            Saving...
          </span>
        )}
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-5">
        {/* HERO HEADER */}
        <div className="bg-[#2F2926] rounded-3xl p-6 flex items-center gap-5">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#749EA1] to-[#DBBC97] flex items-center justify-center text-5xl border-4 border-[#B22026] flex-shrink-0">
            {pet.image ? (
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              emoji
            )}
          </div>
          <div>
            <h1 className="font-playfair text-[#E9DBBD] text-3xl font-bold leading-tight">
              {pet.name}
            </h1>
            <p className="text-[#DBBC97] text-sm mt-0.5">
              {pet.breed || pet.type}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {pet.type && (
                <span className="bg-[#749EA1]/20 text-[#749EA1] border border-[#749EA1]/40 rounded-full px-3 py-1 text-xs font-bold">
                  {pet.type}
                </span>
              )}
              {pet.age > 0 && (
                <span className="bg-[#749EA1]/20 text-[#749EA1] border border-[#749EA1]/40 rounded-full px-3 py-1 text-xs font-bold">
                  {pet.age} yr{pet.age !== 1 ? "s" : ""}
                </span>
              )}
              {pet.gender && (
                <span className="bg-[#749EA1]/20 text-[#749EA1] border border-[#749EA1]/40 rounded-full px-3 py-1 text-xs font-bold capitalize">
                  {pet.gender === "male" ? "♂" : "♀"} {pet.gender}
                </span>
              )}
            </div>
            {pet.description && (
              <p className="text-[#E9DBBD]/60 text-xs mt-2 italic">
                "{pet.description}"
              </p>
            )}
          </div>
        </div>

        {/* EMERGENCY CONTACT */}
        <EmergencyContact
          contact={pet.emergencyContact || {}}
          onSave={(data) => save({ emergencyContact: data })}
        />

        {/* FAVOURITES */}
        <FavouritesSection
          favourites={pet.favourites || {}}
          onUpdate={(data) => save({ favourites: data })}
        />

        {/* ALLERGIES */}
        <SectionCard title="Allergies" icon="⚠️">
          <TagInput
            tags={pet.allergies || []}
            onAdd={(val) => addTag("allergies", null, val)}
            onRemove={(i) => removeTag("allergies", null, i)}
            color="allergy"
          />
          {(pet.allergies?.length || 0) === 0 && (
            <p className="text-xs text-[#2F2926]/40 mt-2">
              No allergies noted. Add one if needed.
            </p>
          )}
        </SectionCard>

        {/* SCHEDULE */}
        <ScheduleSection
          schedule={pet.schedule || []}
          onUpdate={(newSchedule) => save({ schedule: newSchedule })}
        />
      </div>
    </div>
  );
}