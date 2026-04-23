import { useState } from "react";

function InfoRow({ label, value }) {
  return (
    <div className="py-2 border-b border-[#E9DBBD] last:border-0">
      <span className="text-[10px] text-[#2F2926]/50 font-bold uppercase tracking-wider block">{label}</span>
      <span className="text-sm font-semibold text-[#2F2926]">
        {value || <span className="text-[#2F2926]/30 font-normal">Not set</span>}
      </span>
    </div>
  );
}

export default function EmergencyContact({ contact = {}, onSave }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(contact);

  const handleSave = () => {
    onSave(form);
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#DBBC97] p-5">
      <h3 className="text-xs font-bold uppercase tracking-widest text-[#B22026] mb-4 flex items-center gap-2">
        🚨 Emergency Contact
      </h3>

      {editing ? (
        <div className="flex flex-col gap-2">
          {[
            { name: "ownerName", placeholder: "Owner name" },
            { name: "phone", placeholder: "Contact number" },
            { name: "address", placeholder: "Address" },
            { name: "vetNo", placeholder: "Vet number" },
          ].map(({ name, placeholder }) => (
            <input
              key={name}
              value={form[name] || ""}
              onChange={(e) => setForm({ ...form, [name]: e.target.value })}
              placeholder={placeholder}
              className="rounded-xl px-3 py-2 text-sm border border-[#DBBC97] outline-none focus:border-[#749EA1] text-[#2F2926]"
            />
          ))}
          <div className="flex gap-2 mt-1">
            <button
              onClick={handleSave}
              className="flex-1 bg-[#B22026] text-white text-xs font-bold py-2 rounded-xl hover:bg-[#8f1a1e] transition"
            >Save</button>
            <button
              onClick={() => { setForm(contact); setEditing(false); }}
              className="flex-1 bg-[#E9DBBD] text-[#2F2926] text-xs font-bold py-2 rounded-xl"
            >Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <InfoRow label="Owner" value={contact.ownerName} />
          <InfoRow label="Contact No." value={contact.phone} />
          <InfoRow label="Address" value={contact.address} />
          <InfoRow label="Vet No." value={contact.vetNo} />
          <button
            onClick={() => { setForm(contact); setEditing(true); }}
            className="mt-3 text-xs font-bold text-[#749EA1] border border-[#749EA1] px-3 py-1.5 rounded-xl hover:bg-[#749EA1]/10 transition"
          >Edit contact</button>
        </>
      )}
    </div>
  );
}