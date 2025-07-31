import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CasosPage from '../pages/CasosPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CasosPage />} />
      </Routes>
    </BrowserRouter>
  );
}
