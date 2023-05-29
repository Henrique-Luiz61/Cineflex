import axios from "axios";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SeatsPage from "./components/SeatsPage";
import SessionsPage from "./components/SessionsPage";
import SuccessPage from "./components/SuccessPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  axios.defaults.headers.common["Authorization"] = "whm6529QKuCC73XvX1wBh1PI";

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sessoes/:idMovie" element={<SessionsPage />} />
        <Route path="/assentos/:idSession" element={<SeatsPage />} />
        <Route path="/sucesso" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}
