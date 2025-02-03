import AutoCompleteExample from "../modules/finance/AutoComplete/AutoComplete";
import GenerateFormula from "../modules/finance/GenerateFormula/GenerateFormula";

import "./App.css";

import reactLogo from "../assets/react.svg";

function App() {
  return (
    <>
      <div style={{ alignContent: "flex-start", display: "flex", flex: "row" }}>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React19</h1>

      <div className='card'>
        {/* <ExcelDownload /> */}
        <AutoCompleteExample />
        <br />
        <GenerateFormula />
      </div>
    </>
  );
}

export default App;
