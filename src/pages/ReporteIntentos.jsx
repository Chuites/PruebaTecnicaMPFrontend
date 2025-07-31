import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import DataTable from 'react-data-table-component';

export default function ReporteIntentos() {
  const [logs, setLogs] = useState([]);

  const columnas = [
    { name: 'ID', selector: row => row.id },
    { name: 'Número de Caso', selector: row => row.numero_caso },
    { name: 'Fiscal Origen', selector: row => row.id_fiscal_origen },
    { name: 'Fiscal Destino', selector: row => row.id_fiscal_destino },
    { name: 'Motivo', selector: row => row.motivo },
    { name: 'Fecha', selector: row => new Date(row.fecha).toLocaleString() }
  ];

  useEffect(() => {
    api.get('/logs').then(res => setLogs(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h4 className="mb-3">🚫 Reporte de Intentos Fallidos</h4>
      <DataTable
        columns={columnas}
        data={logs}
        pagination
        highlightOnHover
        striped
        dense
      />
    </div>
  );
}
