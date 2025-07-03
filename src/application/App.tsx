import reactLogo from '../assets/react.svg'
import ExcelDownload from '../modules/Attachments/ExcelDownsolad/ExcelDownload'
import AccountCurrencyTable from '../modules/finance/AccountCurrencyTable'
import MyTableWithDoubleHeader from '../modules/Products/ListProductWithHeder'
import './App.css'
import viteLogo from '/vite.svg'

function App() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-center rounded-4xl bg-amber-950">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>

        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>

        <h1>Vite + React19</h1>
      </div>

      <ExcelDownload />

      <AccountCurrencyTable />

      <MyTableWithDoubleHeader />
    </div>
  )
}

export default App
