import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CasosPage from '../pages/CasosPage';
import LoginPage from '../pages/LoginPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CasosPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<CasosPage />} />
      </Routes>
    </BrowserRouter>
  );
}
