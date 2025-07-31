import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import DataTable from 'react-data-table-component';

export default function ReporteCasos() {
  const [casos, setCasos] = useState([]);

  const columnas = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Número de Caso', selector: row => row.numero_caso },
    { name: 'Estado', selector: row => row.estado },
    { name: 'Fiscal', selector: row => row.id_fiscal_actual },
    { name: 'Fiscalía', selector: row => row.id_fiscalia },
    { name: 'Fecha', selector: row => new Date(row.fecha_registro).toLocaleDateString() }
  ];

  useEffect(() => {
    api.get('/casos').then(res => setCasos(res.data));
  }, []);

  return (
    <div className="container mt-4">
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
