//path: Frontend/src/components/HealthRecords.jsx
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

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

function FileIcon({ fileType }) {
  const isImage = fileType === "image";
  return (
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
        isImage
          ? "bg-[#749EA1]/20 text-[#749EA1]"
          : "bg-[#DBBC97]/40 text-[#B22026]"
      }`}
    >
      {isImage ? "🖼️" : "📄"}
    </div>
  );
}

export default function HealthRecords({ petId }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  const token = localStorage.getItem("token");
  const authHeaders = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchDocs();
  }, [petId]);

  const fetchDocs = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE}/api/documents/pet/${petId}`,
        { headers: authHeaders }
      );
      setDocs(data);
    } catch {
      setError("Could not load documents.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return setError("Please select a file.");
    if (!title.trim()) return setError("Please enter a document title.");
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("petId", petId);
      formData.append("title", title.trim());
      const { data } = await axios.post(
        `${API_BASE}/api/documents/upload`,
        formData,
        {
          headers: {
            ...authHeaders,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setDocs((prev) => [data, ...prev]);
      setFile(null);
      setTitle("");
      fileInputRef.current.value = "";
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await axios.delete(`${API_BASE}/api/documents/${id}`, {
        headers: authHeaders,
      });
      setDocs((prev) => prev.filter((d) => d._id !== id));
    } catch {
      setError("Delete failed.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <SectionCard title="Health Records" icon="🩺">
      {/* Upload area */}
      <div className="mb-5">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
            dragOver
              ? "border-[#749EA1] bg-[#749EA1]/10"
              : "border-[#DBBC97] hover:border-[#B22026]/50 hover:bg-[#E9DBBD]/40"
          }`}
        >
          <p className="text-2xl mb-1">📎</p>
          <p className="text-xs font-bold text-[#2F2926]/60">
            {file ? (
              <span className="text-[#B22026] font-bold">{file.name}</span>
            ) : (
              <>Drop a file here or <span className="underline">browse</span></>
            )}
          </p>
          <p className="text-[10px] text-[#2F2926]/40 mt-1">
            PDF, JPG, PNG — max 5 MB
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="flex gap-2 mt-3">
          <input
            type="text"
            placeholder="Document title (e.g. Vaccination 2024)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUpload()}
            className="flex-1 text-sm bg-[#E9DBBD]/60 border border-[#DBBC97] rounded-xl px-4 py-2 text-[#2F2926] placeholder:text-[#2F2926]/30 focus:outline-none focus:border-[#749EA1]"
          />
          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              uploading || !file
                ? "bg-[#DBBC97]/40 text-[#2F2926]/30 cursor-not-allowed"
                : "bg-[#B22026] text-white hover:bg-[#8a1a1e] active:scale-95"
            }`}
          >
            {uploading ? "Uploading…" : "Upload"}
          </button>
        </div>

        {error && (
          <p className="text-xs text-[#B22026] mt-2 font-semibold">{error}</p>
        )}
      </div>

      {/* Document list */}
      {loading ? (
        <p className="text-xs text-[#2F2926]/40 animate-pulse">
          Loading records…
        </p>
      ) : docs.length === 0 ? (
        <p className="text-xs text-[#2F2926]/40 italic">
          No health records yet. Upload the first one above.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {docs.map((doc) => (
            <div
              key={doc._id}
              className="flex items-center gap-3 bg-[#E9DBBD]/50 rounded-xl px-4 py-3 border border-[#DBBC97] hover:border-[#749EA1] transition-all group"
            >
              <FileIcon fileType={doc.fileType} />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#2F2926] truncate">
                  {doc.title || "Untitled"}
                </p>
                <p className="text-[10px] text-[#2F2926]/50">
                  {formatDate(doc.createdAt)}
                </p>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-bold text-[#749EA1] hover:text-[#2F2926] uppercase tracking-wider"
                >
                  View
                </a>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="text-[10px] font-bold text-[#B22026]/60 hover:text-[#B22026] uppercase tracking-wider"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}