import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CasosPage from '../pages/CasosPage';
import LoginPage from '../pages/LoginPage';
import ReporteCasos from '../pages/ReporteCasos';
import ReporteIntentos from '../pages/ReporteIntentos';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CasosPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<CasosPage />} />
        <Route path="/reporte-casos" element={<ReporteCasos />} />
        <Route path="/reporte-logs" element={<ReporteIntentos />} />
        
      </Routes>
    </BrowserRouter>
  );
}
