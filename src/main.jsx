import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Play from './MemoryCardGame/Play';
import Easy from './MemoryCardGame/MemoryEasy';
import Medium from './MemoryCardGame/MemoryMedium';
import MemoryCardGame from './MemoryCardGame/MemoryCardGame';
import Congratulations from "./MemoryCardGame/Congratulation";
import CongtEasy from "./MemoryCardGame/Congratseasy";
import CongtNormal from "./MemoryCardGame/Congratsnormal";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/congratulations" element={<Congratulations />} />
        <Route path="/congt-easy" element={<CongtEasy />} />
        <Route path="/congt-normal" element={<CongtNormal />} />
        <Route path="/easy" element={<Easy />} />
        <Route path="/medium" element={<Medium />} />
        <Route path="/play" element={<Play />} />
        <Route path="/memory-card-game" element={<MemoryCardGame />} />
        <Route path="/" element={<Navigate to="/play" />} />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);