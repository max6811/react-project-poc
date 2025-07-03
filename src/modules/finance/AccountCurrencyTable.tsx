import { useState } from 'react'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Checkbox } from 'primereact/checkbox'
import { InputNumber } from 'primereact/inputnumber'

type Currency = {
  currencyCode: string
  currencyName: string
  selected?: boolean
  balance?: number
}

type Account = {
  _id: string
  accountName: string
  currencies: Currency[]
}

const initialAccounts: Account[] = [
  {
    _id: 'acc1',
    accountName: 'Caja Principal',
    currencies: [
      { currencyCode: 'BOB', currencyName: 'Boliviano', selected: false, balance: 0 },
      { currencyCode: 'USD', currencyName: 'Dólar', selected: false, balance: 0 },
    ],
  },
  {
    _id: 'acc2',
    accountName: 'Banco Mercantil',
    currencies: [
      { currencyCode: 'USD', currencyName: 'Dólar', selected: false, balance: 0 },
      { currencyCode: 'EUR', currencyName: 'Euro', selected: false, balance: 0 },
    ],
  },
]

const AccountCurrencyTable = () => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts)

  const toggleCurrencySelection = (accountId: string, currencyCode: string, checked: boolean) => {
    const updatedAccounts = accounts.map((account) => {
      if (account._id === accountId) {
        const updatedCurrencies = account.currencies.map((currency) => {
          if (currency.currencyCode === currencyCode) {
            return { ...currency, selected: checked }
          }
          return currency
        })
        return { ...account, currencies: updatedCurrencies }
      }
      return account
    })

    setAccounts(updatedAccounts)
  }

  const handleBalanceChange = (accountId: string, currencyCode: string, value: number | null) => {
    const updatedAccounts = accounts.map((account) => {
      if (account._id === accountId) {
        const updatedCurrencies = account.currencies.map((currency) => {
          if (currency.currencyCode === currencyCode) {
            return { ...currency, balance: value || 0 }
          }
          return currency
        })
        return { ...account, currencies: updatedCurrencies }
      }
      return account
    })

    setAccounts(updatedAccounts)
  }

  const currenciesTemplate = (rowData: Account) => (
    <div className="flex flex-col gap-2">
      {rowData.currencies.map((currency) => {
        const checkboxId = `${rowData._id}-${currency.currencyCode}`
        return (
          <div key={checkboxId} className="flex items-center gap-2">
            <Checkbox
              inputId={checkboxId}
              checked={currency.selected || false}
              onChange={(e) =>
                toggleCurrencySelection(rowData._id, currency.currencyCode, e.checked)
              }
            />
            <label htmlFor={checkboxId}>{currency.currencyCode}</label>
          </div>
        )
      })}
    </div>
  )

  const balancesTemplate = (rowData: Account) => (
    <div className="flex flex-col gap-2">
      {rowData.currencies.map((currency) => {
        const inputId = `${rowData._id}-${currency.currencyCode}-balance`
        return (
          <div key={inputId} className="flex items-center gap-2">
            <InputNumber
              disabled={!currency.selected}
              value={currency.balance || 0}
              onValueChange={(e) =>
                handleBalanceChange(rowData._id, currency.currencyCode, e.value)
              }
              mode="decimal"
              minFractionDigits={2}
              className="w-24"
              inputClassName="text-sm"
              placeholder="Saldo"
            />
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="grid gap-2">
      <h1>{`Research ==> Checkbox active edit balance in Table`}</h1>

      <DataTable value={accounts} size="small" tableStyle={{ minWidth: '70rem' }}>
        <Column field="accountName" header="Cuenta" />

        <Column header="Saldos" body={balancesTemplate} />

        <Column header="Monedas" body={currenciesTemplate} />
      </DataTable>
    </div>
  )
}

export default AccountCurrencyTable
