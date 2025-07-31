import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import CasosTable from '../components/CasosTable';
import { useNavigate } from 'react-router-dom';




export default function CasosPage() {

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (!user) navigate('/login');
  }, []);

  const [fiscalias, setFiscalias] = useState([]);
  const [fiscales, setFiscales] = useState([]);
  
  useEffect(() => {
    cargarCasos();
    cargarFiscalias();
  }, []);

  useEffect(() => {
    cargarCasos();
    cargarFiscalias();
    cargarCasosDisponibles();
    cargarTodosFiscales(); // o según lógica
  }, []);


  const cargarFiscalias = async () => {
    const res = await api.get('/fiscalias');
    setFiscalias(res.data);
  };

  const cargarFiscales = async (idFiscalia) => {
    const res = await api.get(`/fiscales/fiscalia/${idFiscalia}`);
    setFiscales(res.data);
  };


  const [casosDisponibles, setCasosDisponibles] = useState([]);
  const [fiscalesDisponibles, setFiscalesDisponibles] = useState([]);

  const cargarCasosDisponibles = async () => {
    const res = await api.get('/casos');
    setCasosDisponibles(res.data);
  };

  const cargarTodosFiscales = async () => {
    // Opcional: crea un nuevo endpoint si quieres obtener todos
    const res = await api.get('/fiscales/fiscalia/1'); // o según fiscalía seleccionada
    setFiscalesDisponibles(res.data);
  };



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
    const { numero_caso, descripcion, id_fiscal_actual, id_fiscalia } = form;

    if (!numero_caso || !descripcion || !id_fiscal_actual || !id_fiscalia) {
      alert('Todos los campos son obligatorios para crear un caso.');
      return;
    }

    try {
      await api.post('/casos', form);
      cargarCasos();
      alert('Caso creado correctamente');
    } catch (error) {
      alert('Error al crear caso');
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    await api.put(`/casos/${id}/estado`, { estado: nuevoEstado });
    cargarCasos();
  };

  const reasignarFiscal = async () => {
    const { id_caso, id_fiscal_destino } = reasignar;

    if (!id_caso || !id_fiscal_destino) {
      alert('Debe ingresar el ID del caso y del fiscal destino.');
      return;
    }

    try {
      const res = await api.post('/casos/reasignar', reasignar);
      alert(res.data.mensaje || 'Reasignado con éxito');
    } catch (error) {
      alert(error.response?.data?.error || 'No se pudo reasignar el caso');
    }
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
              <select className="form-select" onChange={e => {
                setForm({ ...form, id_fiscalia: e.target.value });
                cargarFiscales(e.target.value); // actualizar fiscales disponibles
              }}>
                <option value="">Seleccione fiscalía</option>
                {fiscalias.map(f => (
                  <option key={f.id} value={f.id}>{f.nombre}</option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <select className="form-select" onChange={e => setForm({ ...form, id_fiscal_actual: e.target.value })}>
                <option value="">Seleccione fiscal</option>
                {fiscales.map(f => (
                  <option key={f.id} value={f.id}>{f.nombre}</option>
                ))}
              </select>
            </div>




            <div className="col-md-4 d-grid">
              <button className="btn btn-primary" onClick={crearCaso}>Crear</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <CasosTable casos={casos} onCambiarEstado={cambiarEstado} />
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">🔄 Reasignar Fiscal</h5>
          <div className="row g-2">
            <div className="col-md-5">
              <select className="form-select" onChange={e => setReasignar({ ...reasignar, id_caso: e.target.value })}>
                <option value="">Seleccione caso</option>
                {casosDisponibles.map(c => (
                  <option key={c.id} value={c.id}>{c.numero_caso} — {c.estado}</option>
                ))}
              </select>
            </div>

            <div className="col-md-5">
              <select className="form-select" onChange={e => setReasignar({ ...reasignar, id_fiscal_destino: e.target.value })}>
                <option value="">Seleccione fiscal</option>
                {fiscalesDisponibles.map(f => (
                  <option key={f.id} value={f.id}>{f.nombre}</option>
                ))}
              </select>
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
