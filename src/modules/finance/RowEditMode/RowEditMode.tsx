import { useState, type FC } from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";

interface Product {
  id: string;
  name: string;
}

interface InitEditEventObject {
  index: string;
  data: Product;
}

const RowEditMode: FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Product 1" },
    { id: "2", name: "Product 2" },
    { id: "3", name: "Product 3" },
  ]);
  const [editingRow, setEditingRow] = useState('');
  const [newName, setNewName] = useState("");

  // Start edition
  const onRowEditInit = (eventValues: InitEditEventObject) => {
    console.log(eventValues)
    setEditingRow(eventValues.index);
    setNewName(eventValues.data.name);
  };

  // Save changes in edited row
  const onRowEditSave = () => {
    const updatedProducts = [...products];

    if (editingRow) {
      updatedProducts.map((data) => {
        if (data.id === editingRow) {
          data.name = newName;
        }
      });

      setProducts(updatedProducts);
      setEditingRow('');
    }
  };

  // Cancel edition
  const onRowEditCancel = () => {
    console.log("onRowEditCancel");
    setEditingRow(''); 
    setNewName(""); 
  };

  const bodyFormula = (rowData: Product) =>
    editingRow === rowData.id ? (
      <InputText
        type='text'
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
    ) : (
      <>{rowData.name}</>
    );

  const bodyEditButtons = (rowData: Product) =>
    editingRow === rowData.id ? (
      <div>
        <Button icon='pi pi-check' onClick={onRowEditSave} />
        <Button
          icon='pi pi-times'
          onClick={onRowEditCancel}
          className='p-button-danger'
        />
      </div>
    ) : (
      <Button
        className='p-button-info'
        icon='pi pi-pencil'
        onClick={() => onRowEditInit({ index: rowData.id, data: rowData })}
      />
    );

  return (
    <div>
      <DataTable dataKey='id' editMode='row' value={products}>
        <Column
          field='name'
          header='Nombre'
          body={bodyFormula}
        />

        <Column rowEditor={true} body={bodyEditButtons}/>
      </DataTable>
    </div>
  );
};

export default RowEditMode;
