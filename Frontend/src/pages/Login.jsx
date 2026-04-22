import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const submit = async () => {
  setError("");

  if (!form.email || !form.password)
    return setError("Please fill in all fields.");

  setLoading(true);

  try {
    const { data } = await API.post("/auth/login", form);

    localStorage.setItem("token", data.token);

    const profile = await API.get("/profile", {
      headers: { Authorization: `Bearer ${data.token}` },
    });

    localStorage.setItem("user", JSON.stringify(profile.data));

    navigate("/profile"); // clean redirect
  } catch (err) {
    setError(err.response?.data?.msg || "Login failed. Try again.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div
      className="min-h-screen bg-[#E9DBBD] flex items-center justify-center px-4"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#2F2926] flex items-center justify-center text-3xl mx-auto mb-3">
            🐾
          </div>
          <h1 className="font-playfair text-3xl font-bold text-[#2F2926]">PetPal</h1>
          <p className="text-[#749EA1] text-sm font-semibold mt-1">Welcome back!</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border-2 border-[#DBBC97] p-8 shadow-sm">
          <h2 className="font-playfair text-xl font-bold text-[#2F2926] mb-6">Sign in</h2>

          {error && (
            <div className="bg-red-50 border border-[#B22026] rounded-xl px-4 py-2 mb-4">
              <p className="text-xs text-[#B22026] font-semibold">{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#2F2926]/50 block mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handle}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="you@email.com"
                className="w-full rounded-xl px-4 py-3 text-sm border-2 border-[#DBBC97] outline-none focus:border-[#749EA1] text-[#2F2926] bg-[#E9DBBD]/30 transition"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#2F2926]/50 block mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handle}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="••••••••"
                className="w-full rounded-xl px-4 py-3 text-sm border-2 border-[#DBBC97] outline-none focus:border-[#749EA1] text-[#2F2926] bg-[#E9DBBD]/30 transition"
              />
            </div>
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className="mt-6 w-full bg-[#B22026] text-white font-bold py-3 rounded-2xl text-sm hover:bg-[#8f1a1e] transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In 🐾"}
          </button>

          <p className="text-center text-xs text-[#2F2926]/50 mt-5">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#749EA1] font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}