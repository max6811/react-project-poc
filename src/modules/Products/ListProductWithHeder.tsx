import { useState } from 'react'

import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { ColumnGroup } from 'primereact/columngroup'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { Row } from 'primereact/row'

const MyTableWithDoubleHeader = () => {
  const warehouses = [
    { id: 'w1', name: 'Almacén A' },
    { id: 'w2', name: 'Almacén B' },
  ]

  const allProducts = [
    {
      code: 'P001',
      name: 'Laptop',
      category: 'Electronics',
      quantity: 30,
      warehouseStock: { w1: 10, w2: 15 },
    },
    {
      code: 'P002',
      name: 'Phone',
      category: 'Electronics',
      quantity: 50,
      warehouseStock: { w1: 20, w2: 20 },
    },
  ]

  const [filters, setFilters] = useState({
    code: '',
    name: '',
    category: '',
    quantity: '',
  })

  const [appliedFilters, setAppliedFilters] = useState(filters)

  const handleInputChange = (e, field) => {
    setFilters({ ...filters, [field]: e.target.value })
  }

  const handleSearch = () => {
    setAppliedFilters(filters)
  }

  const handleReset = () => {
    const cleared = { code: '', name: '', category: '', quantity: '' }
    setFilters(cleared)
    setAppliedFilters(cleared)
  }

  const filteredProducts = allProducts.filter((product) =>
    Object.entries(appliedFilters).every(([key, value]) =>
      product[key].toString().toLowerCase().includes(value.toLowerCase())
    )
  )

  // Header con dos filas
  const headerGroup = (
    <ColumnGroup>
      {/* Primera fila: títulos */}
      <Row>
        <Column header="Código" field="code" sortable />
        <Column header="Nombre" field="name" sortable />
        <Column header="Categoría" field="category" sortable />
        <Column header="Cantidad" field="quantity" sortable />

        <Column header="Acciones" />

        {warehouses.map((w) => (
          <Column key={w.id} header={w.name} />
        ))}
      </Row>

      {/* Segunda fila: inputs de filtro */}
      <Row>
        <Column
          header={
            <InputText
              value={filters.code}
              onChange={(e) => handleInputChange(e, 'code')}
              placeholder="Código"
            />
          }
        />

        <Column
          header={
            <InputText
              value={filters.name}
              onChange={(e) => handleInputChange(e, 'name')}
              placeholder="Nombre"
            />
          }
        />

        <Column
          header={
            <InputText
              value={filters.category}
              onChange={(e) => handleInputChange(e, 'category')}
              placeholder="Categoría"
            />
          }
        />

        <Column
          header={
            <InputText
              value={filters.quantity}
              onChange={(e) => handleInputChange(e, 'quantity')}
              placeholder="Cantidad"
            />
          }
        />

        <Column
          header={
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button label="Buscar" icon="pi pi-search" onClick={handleSearch} />
              <Button label="Reset" icon="pi pi-times" onClick={handleReset} />
            </div>
          }
        />

        {/* columnas vacías debajo de los almacenes (sin filtros) */}
        {warehouses.map((w) => (
          <Column key={w.id} header="" />
        ))}
      </Row>
    </ColumnGroup>
  )

  return (
    <div className="card bg-primary mt-10 overflow-hidden">
      <h1>{`Research ==> Filtos en colunas `}</h1>

      <section className="relative grid h-fit w-full items-center justify-center gap-4 bg-blue-900">
        <Card className="size-full overflow-auto px-3 max-md:px-0 max-sm:px-0">
          Lista de Productos
          <DataTable
            value={filteredProducts}
            headerColumnGroup={headerGroup}
            tableStyle={{ minWidth: '80rem' }}
            sortMode="single"
          >
            <Column
              field="code"
              body={(data) => {
                console.log(data)
                return <p className="bg-red-300">{data.code}</p>
              }}
            />

            <Column
              field="name"
              body={(data) => {
                console.log(data)
                return <p className="bg-red-300">{data.name}</p>
              }}
            />

            <Column field="category" />

            <Column field="quantity" />

            <Column body={() => null} />

            {warehouses.map((w) => (
              <Column key={w.id} body={(rowData) => rowData.warehouseStock[w.id] ?? 0} />
            ))}
          </DataTable>
        </Card>
      </section>
    </div>
  )
}

export default MyTableWithDoubleHeader
