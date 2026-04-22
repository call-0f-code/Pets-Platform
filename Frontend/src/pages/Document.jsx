import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function DocumentsPage() {
    // const { id } = useParams(); 
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [records, setRecords] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const handleFileChange = (file) => {
    if (!file) return;
    setSelectedFile(file);
    if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ""));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleUpload = () => {
    if (!selectedFile || !title.trim()) return;
    const isPdf = selectedFile.type === "application/pdf";
    const record = {
      id: Date.now(),
      title: title.trim(),
      fileType: isPdf ? "pdf" : "image",
      fileName: selectedFile.name,
      size: (selectedFile.size / 1024 / 1024).toFixed(2) + " MB",
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      url: URL.createObjectURL(selectedFile),
    };
    setRecords((prev) => [record, ...prev]);
    setTitle("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    setConfirmDelete(null);
  };

  const pdfs = records.filter((r) => r.fileType === "pdf").length;
  const imgs = records.filter((r) => r.fileType === "image").length;

  return (
    <div className="min-h-screen bg-[#E9DBBD]" style={{ fontFamily: "'Nunito', sans-serif" }}>

      {/* Navbar */}
      <nav className="bg-[#2F2926] px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <span onClick={() => navigate("/profile")} className="font-playfair text-[#E9DBBD] text-xl font-bold tracking-wide cursor-pointer">
          🐾 PetPal
        </span>
        <div className="flex items-center gap-1">
          {[{ label: "Profile", path: "/profile", icon: "👤" }, { label: "Community", path: "/community", icon: "🌍" }, { label: "Documents", path: "/documents", icon: "🏥" }].map(({ label, path, icon }) => (
            <button key={path} onClick={() => navigate(path)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${path === "/documents" ? "bg-[#B22026] text-white" : "text-[#DBBC97] hover:bg-white/10"}`}>
              <span style={{ fontSize: "14px" }}>{icon}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
        <div onClick={() => navigate("/profile")} className="w-8 h-8 rounded-full bg-[#749EA1] flex items-center justify-center text-white text-xs font-bold cursor-pointer">
          {initials}
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-5">

        {/* Hero */}
        <div className="bg-[#2F2926] rounded-3xl p-6">
          <h1 className="font-playfair text-[#E9DBBD] text-2xl font-bold">🏥 Health Records</h1>
          <p className="text-[#DBBC97] text-sm mt-1">Upload and manage your pet's medical documents</p>
          <div className="flex gap-3 mt-4">
            {[{ num: records.length, label: "Total" }, { num: pdfs, label: "PDFs" }, { num: imgs, label: "Images" }].map(({ num, label }) => (
              <div key={label} className="bg-white/10 rounded-xl px-5 py-2 text-center">
                <span className="font-playfair text-[#E9DBBD] text-xl font-bold block">{num}</span>
                <span className="text-[#DBBC97] text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upload card */}
        <div className="bg-white rounded-2xl border-2 border-[#DBBC97] p-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#B22026] mb-4">📤 Upload New Record</h3>

          {showSuccess && (
            <div className="bg-green-50 border border-green-400 rounded-xl px-4 py-2 mb-3">
              <p className="text-xs text-green-700 font-bold">✅ Record saved successfully!</p>
            </div>
          )}

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Record title (e.g. Vaccination Report, X-Ray...)"
            className="w-full rounded-xl px-4 py-3 text-sm border-2 border-[#DBBC97] outline-none focus:border-[#749EA1] text-[#2F2926] mb-3"
          />

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
              dragOver ? "border-[#749EA1] bg-[#749EA1]/10"
              : selectedFile ? "border-[#749EA1] bg-[#749EA1]/5 border-solid"
              : "border-[#DBBC97] hover:border-[#749EA1] hover:bg-[#E9DBBD]/50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e.target.files[0])}
              className="hidden"
            />
            {selectedFile ? (
              <>
                <p className="text-3xl mb-2">{selectedFile.type === "application/pdf" ? "📄" : "🖼️"}</p>
                <p className="text-sm font-bold text-[#2F2926]">{selectedFile.name}</p>
                <p className="text-xs text-[#749EA1] mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB · Click to change</p>
              </>
            ) : (
              <>
                <p className="text-3xl mb-2">📁</p>
                <p className="text-sm font-bold text-[#2F2926]">Drop file here or click to browse</p>
                <p className="text-xs text-[#749EA1] mt-1">Supports JPG, PNG, WEBP, PDF · Max 10MB</p>
              </>
            )}
          </div>

          <button
            onClick={handleUpload}
            disabled={!selectedFile || !title.trim()}
            className="mt-4 w-full bg-[#B22026] text-white font-bold py-3 rounded-2xl text-sm hover:bg-[#8f1a1e] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {!selectedFile ? "Select a file first" : !title.trim() ? "Add a title first" : "Upload Record 📤"}
          </button>
        </div>

        {/* Records list */}
        <div className="bg-white rounded-2xl border-2 border-[#DBBC97] p-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#B22026] mb-4">📋 Saved Records</h3>

          {records.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-4xl mb-2">🏥</p>
              <p className="text-sm font-bold text-[#749EA1]">No records yet</p>
              <p className="text-xs text-[#2F2926]/40 mt-1">Upload your first health record above</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {records.map((record) => (
                <div key={record.id} className="flex items-center gap-3 bg-[#E9DBBD]/40 rounded-2xl p-3 border border-[#DBBC97]">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${record.fileType === "pdf" ? "bg-red-50" : "bg-[#E9DBBD]"}`}>
                    {record.fileType === "pdf" ? "📄" : "🖼️"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[#2F2926] truncate">{record.title}</p>
                    <p className="text-xs text-[#749EA1] mt-0.5">
                      {record.fileType === "pdf" ? "PDF" : "Image"} · {record.size} · {record.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a href={record.url} target="_blank" rel="noreferrer">
                      <button className="text-xs font-bold text-[#749EA1] border border-[#749EA1] px-3 py-1.5 rounded-xl hover:bg-[#749EA1]/10 transition">
                        View
                      </button>
                    </a>
                    {confirmDelete === record.id ? (
                      <div className="flex gap-1">
                        <button onClick={() => handleDelete(record.id)} className="text-xs font-bold bg-[#B22026] text-white px-2 py-1.5 rounded-xl">Yes</button>
                        <button onClick={() => setConfirmDelete(null)} className="text-xs font-bold bg-[#E9DBBD] text-[#2F2926] px-2 py-1.5 rounded-xl">No</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmDelete(record.id)} className="text-xs font-bold text-[#B22026] border border-[#B22026] px-3 py-1.5 rounded-xl hover:bg-red-50 transition">
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}