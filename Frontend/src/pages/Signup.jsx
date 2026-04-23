import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNo: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setError("");
    if (!form.name || !form.email || !form.password || !form.contactNo || !form.address)
      return setError("Please fill in all required fields.");
    if (form.password !== form.confirmPassword)
      return setError("Passwords don't match.");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters.");

    setLoading(true);
    try {
      await API.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        contactNo: form.contactNo,
        address: form.address,
      });
      // auto login after signup
      const { data } = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("token", data.token);
      const profile = await API.get("/profile", {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      localStorage.setItem("user", JSON.stringify(profile.data));
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#E9DBBD] flex items-center justify-center px-4 py-10"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#2F2926] flex items-center justify-center text-3xl mx-auto mb-3">
            🐾
          </div>
          <h1 className="font-playfair text-3xl font-bold text-[#2F2926]">PetPal</h1>
          <p className="text-[#749EA1] text-sm font-semibold mt-1">Create your account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border-2 border-[#DBBC97] p-8 shadow-sm">
          <h2 className="font-playfair text-xl font-bold text-[#2F2926] mb-6">Sign up</h2>

          {error && (
            <div className="bg-red-50 border border-[#B22026] rounded-xl px-4 py-2 mb-4">
              <p className="text-xs text-[#B22026] font-semibold">{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-4">

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#2F2926]/50 block mb-1">
                Full Name <span className="text-[#B22026]">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handle}
                placeholder="Sneha Rao"
                className="w-full rounded-xl px-4 py-3 text-sm border-2 border-[#DBBC97] outline-none focus:border-[#749EA1] text-[#2F2926] bg-[#E9DBBD]/30 transition"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#2F2926]/50 block mb-1">
                Email <span className="text-[#B22026]">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handle}
                placeholder="you@email.com"
                className="w-full rounded-xl px-4 py-3 text-sm border-2 border-[#DBBC97] outline-none focus:border-[#749EA1] text-[#2F2926] bg-[#E9DBBD]/30 transition"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#2F2926]/50 block mb-1">
                  Password <span className="text-[#B22026]">*</span>
                </label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handle}
                  placeholder="••••••••"
                  className="w-full rounded-xl px-4 py-3 text-sm border-2 border-[#DBBC97] outline-none focus:border-[#749EA1] text-[#2F2926] bg-[#E9DBBD]/30 transition"
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#2F2926]/50 block mb-1">
                  Confirm <span className="text-[#B22026]">*</span>
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handle}
                  placeholder="••••••••"
                  className="w-full rounded-xl px-4 py-3 text-sm border-2 border-[#DBBC97] outline-none focus:border-[#749EA1] text-[#2F2926] bg-[#E9DBBD]/30 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#2F2926]/50 block mb-1">
                Contact Number <span className="text-[#B22026]">*</span>
              </label>
              <input
                name="contactNo"
                type="tel"
                value={form.contactNo}
                onChange={handle}
                placeholder="+91 9876543210"
                className="w-full rounded-xl px-4 py-3 text-sm border-2 border-[#DBBC97] outline-none focus:border-[#749EA1] text-[#2F2926] bg-[#E9DBBD]/30 transition"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#2F2926]/50 block mb-1">
                Address <span className="text-[#B22026]">*</span>
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handle}
                placeholder="Khadki, Pune, Maharashtra"
                rows={2}
                className="w-full rounded-xl px-4 py-3 text-sm border-2 border-[#DBBC97] outline-none focus:border-[#749EA1] text-[#2F2926] bg-[#E9DBBD]/30 transition resize-none"
              />
            </div>

          </div>

          <button
            onClick={submit}
            disabled={loading}
            className="mt-6 w-full bg-[#B22026] text-white font-bold py-3 rounded-2xl text-sm hover:bg-[#8f1a1e] transition-colors disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account 🐾"}
          </button>

          <p className="text-center text-xs text-[#2F2926]/50 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-[#749EA1] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}