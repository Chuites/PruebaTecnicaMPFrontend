import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';

export default function CasosPage() {
  const [casos, setCasos] = useState([]);
  const [form, setForm] = useState({
    numero_caso: '',
    descripcion: '',
    estado: 'pendiente',
    id_fiscal_actual: '',
    id_fiscalia: ''
  });

  const [reasignar, setReasignar] = useState({ id_caso: '', id_fiscal_destino: '' });

  const cargarCasos = async () => {
    const res = await api.get('/casos');
    setCasos(res.data);
  };

  const crearCaso = async () => {
    await api.post('/casos', form);
    cargarCasos();
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    await api.put(`/casos/${id}/estado`, { estado: nuevoEstado });
    cargarCasos();
  };

  const reasignarFiscal = async () => {
    await api.post('/casos/reasignar', reasignar);
    cargarCasos();
  };

  useEffect(() => {
    cargarCasos();
  }, []);

  return (
    <div className="container bg-white shadow p-4 rounded" style={{ width: '100%', maxWidth: 900 }}>


      <h2 className="mb-4">⚖️ Gestión de Casos</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">📄 Nuevo Caso</h5>
          <div className="row g-2">
            <div className="col-md-6">
              <input className="form-control" placeholder="Número de caso" onChange={e => setForm({ ...form, numero_caso: e.target.value })} />
            </div>
            <div className="col-md-6">
              <input className="form-control" placeholder="Descripción" onChange={e => setForm({ ...form, descripcion: e.target.value })} />
            </div>
            <div className="col-md-4">
              <input className="form-control" placeholder="ID Fiscal" onChange={e => setForm({ ...form, id_fiscal_actual: e.target.value })} />
            </div>
            <div className="col-md-4">
              <input className="form-control" placeholder="ID Fiscalía" onChange={e => setForm({ ...form, id_fiscalia: e.target.value })} />
            </div>
            <div className="col-md-4 d-grid">
              <button className="btn btn-primary" onClick={crearCaso}>Crear</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5>📂 Casos Registrados</h5>
        {casos.length === 0 ? (
          <p className="text-muted">No hay casos registrados.</p>
        ) : (
          casos.map(caso => (
            <div key={caso.id} className="card mb-3">
              <div className="card-body">
                <h6 className="card-title">
                  <strong>{caso.numero_caso}</strong> — <span className="badge bg-secondary">{caso.estado}</span>
                </h6>
                <p className="card-text">Fiscal: {caso.id_fiscal_actual} | Fiscalía: {caso.id_fiscalia}</p>
                <div className="btn-group">
                  <button className="btn btn-outline-warning btn-sm" onClick={() => cambiarEstado(caso.id, 'en_progreso')}>Marcar En Progreso</button>
                  <button className="btn btn-outline-success btn-sm" onClick={() => cambiarEstado(caso.id, 'cerrado')}>Marcar Cerrado</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">🔄 Reasignar Fiscal</h5>
          <div className="row g-2">
            <div className="col-md-5">
              <input className="form-control" placeholder="ID Caso" onChange={e => setReasignar({ ...reasignar, id_caso: e.target.value })} />
            </div>
            <div className="col-md-5">
              <input className="form-control" placeholder="ID Fiscal destino" onChange={e => setReasignar({ ...reasignar, id_fiscal_destino: e.target.value })} />
            </div>
            <div className="col-md-2 d-grid">
              <button className="btn btn-dark" onClick={reasignarFiscal}>Reasignar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
