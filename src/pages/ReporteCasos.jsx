import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';


export default function ReporteCasos() {
  const [casos, setCasos] = useState([]);

  const columnas = [
    { name: 'Número de Caso', selector: row => row.numero_caso, sortable: true },
    { name: 'Estado', selector: row => row.estado },
    { name: 'Fiscal', selector: row => row.nombre_fiscal },
    { name: 'Fiscalía', selector: row => row.nombre_fiscalia },
    { name: 'Fecha', selector: row => new Date(row.fecha_registro).toLocaleDateString() }
  ];

  const navigate = useNavigate();



  useEffect(() => {
    api.get('/casos').then(res => setCasos(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>
        ← Regresar
      </button>

      <h4 className="mb-3">📊 Reporte de Casos</h4>
      <DataTable
        columns={columnas}
        data={casos}
        pagination
        highlightOnHover
        striped
        dense
      />
    </div>
  );
}
