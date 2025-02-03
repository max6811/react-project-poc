import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState, type FC } from "react";
import { ProductService } from "./service/ProductService";

interface TableTransactionProps {}

const TableTransaction: FC<TableTransactionProps> = ({}) => {
  const [accounts, setAccounts] = useState([
    { account: "Banco", debe: 10000, haber: 0 },
    { account: "IVA trasladado", debe: 0, haber: 1379.31 },
    { account: "Ventas", debe: 0, haber: 8620.69 },
  ]);

  return (
    <DataTable value={accounts} tableStyle={{ minWidth: "50rem" }}>
      <Column field='code' header='Code'></Column>
      <Column field='name' header='Name'></Column>
      <Column field='category' header='Category'></Column>
      <Column field='quantity' header='Quantity'></Column>
    </DataTable>
  );
};
export default TableTransaction;
