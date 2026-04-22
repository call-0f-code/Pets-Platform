import { useState } from "react";

export default function TagInput({ tags = [], onAdd, onRemove, color = "allergy" }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const val = input.trim();
    if (!val) return;
    onAdd(val);
    setInput("");
  };

  const styles = {
    allergy: {
      tag: "bg-red-50 border border-[#B22026] text-[#B22026]",
      btn: "bg-[#B22026] text-white",
    },
    fav: {
      tag: "bg-[#E9DBBD] border border-[#DBBC97] text-[#2F2926]",
      btn: "bg-[#749EA1] text-white",
    },
  };
  const s = styles[color] || styles.fav;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {tags.map((tag, i) => (
        <span
          key={i}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${s.tag}`}
        >
          {tag}
          <button
            onClick={() => onRemove(i)}
            className="ml-1 opacity-60 hover:opacity-100 font-bold text-xs leading-none"
          >
            ✕
          </button>
        </span>
      ))}
      <div className="flex items-center gap-1">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add..."
          className="text-xs border border-[#DBBC97] rounded-full px-3 py-1 outline-none bg-white text-[#2F2926] w-24 focus:border-[#749EA1]"
        />
        <button
          onClick={handleAdd}
          className={`text-xs font-bold px-3 py-1 rounded-full ${s.btn}`}
        >
          +
        </button>
      </div>
    </div>
  );
}