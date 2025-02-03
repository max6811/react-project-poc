import React, { useState } from "react";

import { evaluate } from "mathjs";

type TableData = {
  [key: string]: number;
};

const TableCellReference: React.FC = () => {
  const [table, setTable] = useState<TableData>({
    F1: 10,
    F2: 20,
    F3: 30,
    F4: 40,
    F5: 50,
  });

  const [formula, setFormula] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const handleCellChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    cellId: string
  ) => {
    setTable({ ...table, [cellId]: Number(e.target.value) });
  };

  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setFormula(input);

    try {
      const identifiers = input.match(/[A-Z]\d+/g) || [];
      // const isValid = identifiers.every((id) => table.hasOwnProperty(id));
      const isValid = identifiers.every((id) =>
        Object.prototype.hasOwnProperty.call(table, id)
      );

      if (!isValid) {
        throw new Error(
          "La fórmula contiene referencias a celdas no existentes."
        );
      }

      const evaluation = evaluate(input, table);
      setResult(evaluation);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fórmula inválida.");
      setResult(null);
    }
  };

  const handleCellClick = (cellId: string) => {
    setFormula((prevFormula) => `${prevFormula}${cellId}`);
  };

  const getHighlightedStyle = (cellId: string): string => {
    return formula.includes(cellId) ? "bg-yellow-100" : "";
  };

  return (
    <div className='p-8 font-sans'>
      <h1 className='text-2xl font-bold mb-6'>Tabla Dinámica con Fórmulas</h1>

      {/* Tabla */}
      <table className='table-auto border-collapse border border-gray-300 w-full mb-6'>
        <thead>
          <tr>
            <th className='border border-gray-300 p-2'>ID</th>
            <th className='border border-gray-300 p-2'>Valor</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(table).map((cellId) => (
            <tr key={cellId}>
              <td className='border border-gray-300 p-2 text-center'>
                {cellId}
              </td>
              <td
                className={`${getHighlightedStyle(
                  cellId
                )} cursor-pointer border border-gray-300 p-2`}
                onClick={() => handleCellClick(cellId)}
              >
                <input
                  type='number'
                  value={table[cellId]}
                  onChange={(e) => handleCellChange(e, cellId)}
                  className='w-full border border-gray-300 p-1'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Input for formula */}
      <div className='mb-4'>
        <h2 className='text-lg font-semibold mb-2'>Escribe tu fórmula:</h2>
        <input
          type='text'
          value={formula}
          onChange={handleFormulaChange}
          placeholder='Ejemplo: (F1 + F3) * 13%'
          className='w-full border border-gray-300 p-2'
        />
      </div>

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
    </div>
  );
};

export default TableCellReference;
