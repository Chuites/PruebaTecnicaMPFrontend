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
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3 className="mb-3">🔐 Iniciar Sesión</h3>
      <input className="form-control mb-2" placeholder="Correo" onChange={e => setCorreo(e.target.value)} />
      <input className="form-control mb-3" type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary w-100" onClick={login}>Ingresar</button>
    </div>
  );
}
