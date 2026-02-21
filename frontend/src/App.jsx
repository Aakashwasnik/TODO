 import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todos";
import Calendar from "./pages/Calendar"; // ✅ Capital C

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN as default page */}
        <Route path="/" element={<Login />} />

        {/* REGISTER page */}
        <Route path="/register" element={<Register />} />

        {/* MAIN APP */}
        <Route path="/todos" element={<Todos />} />

        {/* CALENDAR */}
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}
