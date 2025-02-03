import React, { FC, useState } from "react";

import { evaluate } from "mathjs";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";

export enum TypeAmountEnum {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

export interface TransactionTemplateAccount {
  _id: string;
  accountId: string;
  accountName: string;
  accountingCode: string;
  currencies: string[];
  typeAmount: TypeAmountEnum | null;
  formula: string;
  __typename: string;
}

interface InitEditEventObject {
  index: string;
  rowData: TransactionTemplateAccount;
}

const GenerateFormula: FC = () => {
  const [accounts, setAccounts] = useState<TransactionTemplateAccount[]>([
    {
      _id: "678ff509320cc91be8a58f9b",
      accountId: "677036be09c4b41461496c0d",
      accountName: "Cuentas por cobrar clientes",
      accountingCode: "1.1.2.1.01",
      currencies: [],
      typeAmount: TypeAmountEnum.CREDIT,
      formula: "",
      __typename: "ListAccountsTransactionTemplateOutput",
    },
    {
      _id: "678ff4f1320cc91be8a58f8b",
      accountId: "6786cb0687cc0746cfe29948",
      accountName: "PASIVO A CORTO PLAZO",
      accountingCode: "2.1.A",
      currencies: ["USD Dólar estadounidense", "BOB Boliviano"],
      typeAmount: TypeAmountEnum.CREDIT,
      formula: "",
      __typename: "ListAccountsTransactionTemplateOutput",
    },
    {
      _id: "678ff4e7320cc91be8a58f7a",
      accountId: "6786ca8b9556667eb7129779",
      accountName: "PASIVO CORRIENTE",
      accountingCode: "2.1",
      currencies: [],
      typeAmount: TypeAmountEnum.DEBIT,
      formula: "",
      __typename: "ListAccountsTransactionTemplateOutput",
    },
  ]);

  const renderIcon = () => (
    <i className='pi pi-check' style={{ fontSize: "2rem" }}></i>
  );

  const debitTemplate = (rowData: TransactionTemplateAccount) =>
    rowData.typeAmount === TypeAmountEnum.DEBIT ? renderIcon() : <></>;

  const creditTemplate = (rowData: TransactionTemplateAccount) =>
    rowData.typeAmount === TypeAmountEnum.CREDIT ? renderIcon() : <></>;

  // Estado para la fórmula
  const [formula, setFormula] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  // Maneja el cambio de la fórmula
  const handleFormulaChange = (
    inputValue: string,
    // rowData: TransactionTemplateAccount
  ) => {
    setFormula(inputValue);

    // Validate and evaluate formula
    try {
      const identifiers = inputValue.match(/[A-Z]\d+/g) || [];
      const isValid = identifiers.every((id) =>
        Object.prototype.hasOwnProperty.call(accounts, id)
      );

      if (!isValid) {
        throw new Error(
          "La fórmula contiene referencias a celdas no existentes."
        );
      }

      const evaluation = evaluate(inputValue, accounts);
      setResult(evaluation);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fórmula inválida.");
      setResult(null);
    }
  };

  const handleCellClick = (cellId: string) => {
    // console.log(cellId);
    setFormula((prevFormula) => `${prevFormula}${cellId}`);
  };

  const getHighlightedStyle = (cellId: string): string => {
    // console.log(cellId);
    return formula.includes(cellId) ? "bg-green-400" : "";
  };

  const cellCodeTemplate = (rowData: TransactionTemplateAccount) => (
    <div
      className={`${
        getHighlightedStyle(rowData._id) ? "bg-yellow-500" : ""
      } cursor-pointer border border-gray-300 p-2`}
      onClick={() => handleCellClick(rowData._id)}
    >
      {rowData._id}
    </div>
  );

  const [editingRow, setEditingRow] = useState("");

  const onRowEditInit = (eventValues: InitEditEventObject) => {
    console.log(eventValues.index);
    setEditingRow(eventValues.rowData._id);
  };

  const onRowEditSave = () => {
    const updatedProducts = [...accounts];

    updatedProducts.map((data) => {
      if (data._id === editingRow) {
        data.formula = formula;
      }
    });
    setAccounts(updatedProducts); // update main list
    setEditingRow(""); // End edition and reset
    setFormula(""); // reset formula
  };

  const onRowEditCancel = () => {
    setEditingRow(""); // End edition and reset
    setFormula(""); // reset formula
  };

  const bodyEditorTemplate = (rowData: TransactionTemplateAccount) =>
    editingRow === rowData._id ? (
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
        icon='pi pi-pencil'
        onClick={() => onRowEditInit({ index: rowData._id, rowData: rowData })}
      />
    );

  const bodyFormulaTemplate = (rowData: TransactionTemplateAccount) => {
    return editingRow === rowData._id ? (
      <InputText
        type='text'
        value={formula || rowData.formula}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleFormulaChange(e.target.value)
        }
      />
    ) : (
      <>{rowData.formula}</>
    );
  };

  return (
    <>
      <DataTable
        title='Lista de cuentas de la plantilla'
        value={accounts}
        tableStyle={{ minWidth: "50rem" }}
        editMode='row'
      >
        <Column field='_id' header='Code' body={cellCodeTemplate} />
        <Column field='typeAmount' header='Debe' body={debitTemplate} />
        <Column field='typeAmount' header='Haber' body={creditTemplate} />
        <Column field='formula' header='Formula' body={bodyFormulaTemplate} />
        <Column
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
          body={bodyEditorTemplate}
        />
      </DataTable>

      {/* Result */}
      <div>
        {error ? (
          <p className='text-red-500 font-medium'>{error}</p>
        ) : (
          <p className='text-green-600 font-medium'>
            <strong>Resultado:</strong> {result}
          </p>
        )}
      </div>
    </>
  );
};

export default GenerateFormula;
