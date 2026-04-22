import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import PetProfile from "./pages/PetProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/pet/:id" element={<PetProfile />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
            
        </Routes>
    </BrowserRouter>
  );
}
