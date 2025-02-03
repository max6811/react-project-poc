import { useState, type FC } from "react";

const Transaction: FC = () => {
  const [rows, setRows] = useState([
    { account: "Banco", debe: 10000, haber: 0, formula: "" },
    {
      account: "IVA trasladado",
      debe: 0,
      haber: 0,
      formula: "rows[0].debe * 0.16",
    },
    { account: "Ventas", debe: 0, haber: 0, formula: "rows[0].debe / 1.16" },
  ]);

  const [totalDebe, setTotalDebe] = useState(10000);
  const [totalHaber, setTotalHaber] = useState(0);

  // Actualizar valores en la tabla
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = parseFloat(value) || 0;

    // Recalcular fórmulas basadas en los nuevos valores
    recalculateFormulas(updatedRows);
    updateTotals(updatedRows);
    setRows(updatedRows);
  };

  // Manejar cambios en las fórmulas
  const handleFormulaChange = (index, value) => {
    console.log(value, index)
    const updatedRows = [...rows];
    updatedRows[index].formula = value;

    // Recalcular fórmulas basadas en el nuevo cambio
    recalculateFormulas(updatedRows);
    updateTotals(updatedRows);
    setRows(updatedRows);
  };

  // Recalcular las fórmulas dinámicamente
  const recalculateFormulas = (updatedRows) => {
    updatedRows.forEach((row, index) => {
      if (row.formula) {
        try {
          // Evaluar la fórmula de manera controlada
          const calculatedValue = eval(row.formula);
          if (calculatedValue !== undefined && !isNaN(calculatedValue)) {
            // Asignar el cálculo automáticamente a Debe o Haber
            if (row.debe !== 0 || row.haber === 0) {
              updatedRows[index].debe = calculatedValue;
            } else {
              updatedRows[index].haber = calculatedValue;
            }
          }
        } catch (error) {
          console.error(`Error en la fórmula de la fila ${index + 1}:`, error);
        }
      }
    });
  };

  // Actualizar totales
  const updateTotals = (updatedRows) => {
    const newTotalDebe = updatedRows.reduce((sum, row) => sum + row.debe, 0);
    const newTotalHaber = updatedRows.reduce((sum, row) => sum + row.haber, 0);
    setTotalDebe(newTotalDebe);
    setTotalHaber(newTotalHaber);
  };

  return (
    <div>
      <h3>Asiento Contable con Fórmulas Dinámicas</h3>
      <table border='1' cellPadding='8'>
        <thead>
          <tr>
            <th>Cuenta</th>
            <th>Debe</th>
            <th>Haber</th>
            <th>Fórmula</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.account}</td>
              <td>
                <input
                  type='number'
                  value={row.debe}
                  onChange={(e) =>
                    handleInputChange(index, "debe", e.target.value)
                  }
                  disabled={!!row.formula} // Deshabilitar si hay fórmula
                />
              </td>
              <td>
                <input
                  type='number'
                  value={row.haber}
                  onChange={(e) =>
                    handleInputChange(index, "haber", e.target.value)
                  }
                  disabled={!!row.formula} // Deshabilitar si hay fórmula
                />
              </td>
              <td>
                <input
                  type='text'
                  value={row.formula}
                  onChange={(e) => handleFormulaChange(index, e.target.value)}
                  placeholder='Ej: rows[0].debe * 0.16'
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            <td>{totalDebe.toFixed(2)}</td>
            <td>{totalHaber.toFixed(2)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <p>
        {totalDebe === totalHaber
          ? "El asiento está balanceado ✅"
          : "El asiento no está balanceado ❌"}
      </p>
    </div>
  );
};

export default Transaction;
