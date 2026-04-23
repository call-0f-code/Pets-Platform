import TagInput from "./TagInput";

const SUBFIELDS = [
  { key: "activities", label: "Activities", emoji: "🏃" },
  { key: "treats", label: "Treats", emoji: "🦴" },
  { key: "play", label: "Play", emoji: "🎾" },
];

export default function FavouritesSection({ favourites = {}, onUpdate }) {
  const handleAdd = (subfield, val) => {
    onUpdate({ ...favourites, [subfield]: [...(favourites[subfield] || []), val] });
  };

  const handleRemove = (subfield, index) => {
    const arr = [...(favourites[subfield] || [])];
    arr.splice(index, 1);
    onUpdate({ ...favourites, [subfield]: arr });
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#DBBC97] p-5">
      <h3 className="text-xs font-bold uppercase tracking-widest text-[#B22026] mb-4 flex items-center gap-2">
        ⭐ Favourites
      </h3>

      <div className="flex flex-col gap-5">
        {SUBFIELDS.map(({ key, label, emoji }) => (
          <div key={key}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#749EA1] mb-2 flex items-center gap-1">
              <span>{emoji}</span> {label}
            </p>
            <TagInput
              tags={favourites[key] || []}
              onAdd={(val) => handleAdd(key, val)}
              onRemove={(i) => handleRemove(key, i)}
              color="fav"
            />
          </div>
        ))}
      </div>
    </div>
  );
}