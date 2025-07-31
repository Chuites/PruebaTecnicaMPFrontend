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
    <div style={{ padding: 20 }}>
      <h2>Gestión de Casos</h2>

      <div>
        <h3>Nuevo Caso</h3>
        <input placeholder="Número de caso" onChange={e => setForm({ ...form, numero_caso: e.target.value })} />
        <input placeholder="Descripción" onChange={e => setForm({ ...form, descripcion: e.target.value })} />
        <input placeholder="ID Fiscal" onChange={e => setForm({ ...form, id_fiscal_actual: e.target.value })} />
        <input placeholder="ID Fiscalía" onChange={e => setForm({ ...form, id_fiscalia: e.target.value })} />
        <button onClick={crearCaso}>Crear</button>
      </div>

      <hr />

      <div>
        <h3>Casos Registrados</h3>
        {casos.map(caso => (
          <div key={caso.id} style={{ marginBottom: 10, border: '1px solid #ccc', padding: 10 }}>
            <strong>{caso.numero_caso}</strong> - {caso.estado} <br />
            Fiscal: {caso.id_fiscal_actual} | Fiscalía: {caso.id_fiscalia} <br />
            <button onClick={() => cambiarEstado(caso.id, 'en_progreso')}>Marcar En Progreso</button>
            <button onClick={() => cambiarEstado(caso.id, 'cerrado')}>Marcar Cerrado</button>
          </div>
        ))}
      </div>

      <hr />

      <div>
        <h3>Reasignar Fiscal</h3>
        <input placeholder="ID Caso" onChange={e => setReasignar({ ...reasignar, id_caso: e.target.value })} />
        <input placeholder="ID Fiscal destino" onChange={e => setReasignar({ ...reasignar, id_fiscal_destino: e.target.value })} />
        <button onClick={reasignarFiscal}>Reasignar</button>
      </div>
    </div>
  );
}
