import { useState } from 'react';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    if (!correo || !password) return alert('Todos los campos son obligatorios');

    try {
      const res = await api.post('/fiscales/login', { correo, password });
      localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#ffffffff' }}>
      <div className="card shadow p-4" style={{ width: 350 }}>
        <h4 className="mb-4 text-center">🔐 Iniciar Sesión</h4>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input className="form-control" type="email" onChange={e => setCorreo(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input className="form-control" type="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary w-100" onClick={login}>Ingresar</button>
      </div>
    </div>
  );

}
