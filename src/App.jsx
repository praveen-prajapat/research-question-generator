import { Routes, Route } from "react-router-dom";
import WizardApp from "./pages/WizardApp";
import PresentationMode from "./pages/PresentationMode";
import TeamPage from "./pages/TeamPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WizardApp />} />
      <Route path="/presentation" element={<PresentationMode />} />
      <Route path="/team" element={<TeamPage />} />
    </Routes>
  );
}
