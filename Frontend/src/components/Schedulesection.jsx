import { useState } from "react";

const DOT_COLORS = ["bg-[#749EA1]", "bg-[#B22026]", "bg-[#DBBC97]", "bg-[#2F2926]"];
const TASK_ICONS = {
  feeding: "🍖", walk: "🦮", medication: "💊", grooming: "✂️",
  vet: "🏥", bath: "🛁", play: "🎾", training: "🎓", other: "📋",
};

function ScheduleItem({ item, index, onDelete }) {
  const dotColor = DOT_COLORS[index % DOT_COLORS.length];
  const taskLower = item.task.toLowerCase();
  const icon = Object.entries(TASK_ICONS).find(([k]) => taskLower.includes(k))?.[1] || "📋";

  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#E9DBBD] group">
      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${dotColor}`} />
      <span className="text-base">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#2F2926] truncate">{item.task}</p>
        <p className="text-xs text-[#749EA1]">
          {item.time && <span>{item.time}</span>}
          {item.date && <span>{item.time ? " · " : ""}{new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>}
          {item.recurring && <span className="ml-1 bg-[#E9DBBD] text-[#2F2926] text-[10px] font-bold px-2 py-0.5 rounded-full">Daily</span>}
        </p>
      </div>
      <button
        onClick={() => onDelete(index)}
        className="opacity-0 group-hover:opacity-100 text-[#B22026] text-xs font-bold transition-opacity"
      >✕</button>
    </div>
  );
}

export default function ScheduleSection({ schedule = [], onUpdate }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ task: "", time: "", date: "", recurring: false });

  const handle = (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const addItem = () => {
    if (!form.task.trim()) return;
    const newItem = {
      task: form.task.trim(),
      time: form.time,
      date: form.date || undefined,
      recurring: form.recurring,
    };
    onUpdate([...schedule, newItem]);
    setForm({ task: "", time: "", date: "", recurring: false });
    setShowForm(false);
  };

  const deleteItem = (index) => {
    onUpdate(schedule.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#DBBC97] p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#B22026] flex items-center gap-2">
          🗓️ Schedule
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-xs font-bold bg-[#2F2926] text-[#E9DBBD] px-3 py-1.5 rounded-xl hover:bg-[#444] transition"
        >
          {showForm ? "Cancel" : "+ Add"}
        </button>
      </div>

      {showForm && (
        <div className="bg-[#E9DBBD] rounded-xl p-4 mb-3 flex flex-col gap-2">
          <input
            name="task"
            value={form.task}
            onChange={handle}
            placeholder="e.g. Morning Walk, Feeding, Vet Visit..."
            className="rounded-xl px-3 py-2 text-sm border border-[#DBBC97] bg-white outline-none focus:border-[#749EA1] text-[#2F2926]"
          />
          <div className="flex gap-2">
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handle}
              className="rounded-xl px-3 py-2 text-sm border border-[#DBBC97] bg-white outline-none flex-1 text-[#2F2926]"
            />
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handle}
              className="rounded-xl px-3 py-2 text-sm border border-[#DBBC97] bg-white outline-none flex-1 text-[#2F2926]"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-[#2F2926] font-semibold cursor-pointer">
            <input type="checkbox" name="recurring" checked={form.recurring} onChange={handle} className="accent-[#749EA1]" />
            Repeat daily
          </label>
          <button
            onClick={addItem}
            className="bg-[#B22026] text-white text-sm font-bold py-2 rounded-xl hover:bg-[#8f1a1e] transition"
          >
            Add to schedule
          </button>
        </div>
      )}

      {schedule.length === 0 ? (
        <p className="text-xs text-[#2F2926]/40 text-center py-4">No schedule yet. Add one above!</p>
      ) : (
        <div>
          {schedule.map((item, i) => (
            <ScheduleItem key={i} item={item} index={i} onDelete={deleteItem} />
          ))}
        </div>
      )}
    </div>
  );
}