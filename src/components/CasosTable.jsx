import DataTable from 'react-data-table-component';

export default function CasosTable({ casos, onCambiarEstado }) {
  const columnas = [
    { name: 'Número de Caso', selector: row => row.numero_caso, sortable: true },
    { name: 'Estado', selector: row => row.estado, sortable: true },
    { name: 'Fiscal', selector: row => row.nombre_fiscal },
    { name: 'Fiscalía', selector: row => row.nombre_fiscalia },
    {
      name: 'Acciones',
      cell: row => (
        <div className="d-flex justify-content-center align-items-center" style={{ gap: '4px', flexWrap: 'nowrap' }}>
          <button
            className="btn btn-sm btn-outline-warning"
            style={{ whiteSpace: 'nowrap' }}
            onClick={() => onCambiarEstado(row.id, 'en_progreso')}
          >
            En Progreso
          </button>
          <button
            className="btn btn-sm btn-outline-success"
            style={{ whiteSpace: 'nowrap' }}
            onClick={() => onCambiarEstado(row.id, 'cerrado')}
          >
            Cerrado
          </button>
        </div>
      ),
      width: '200px',
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];


  return (
    <DataTable
      title="📂 Casos Registrados"
      columns={columnas}
      data={casos}
      pagination
      highlightOnHover
      dense
      striped
    />
  );
}
