import { useState } from 'react'

function SummaryPage({ expenses, incomes }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const rangeInvalid = startDate && endDate && endDate < startDate

  // helper: keep only entries within the date range (or all, if no valid range)
  function inRange(entry) {
    if (!startDate || !endDate || rangeInvalid) return true
    return entry.date >= startDate && entry.date <= endDate
  }

  const filteredExpenses = expenses.filter(inRange)
  const filteredIncomes = incomes.filter(inRange)

  // totals now reflect the filtered data
  const totalIncome = filteredIncomes.reduce((sum, e) => sum + Number(e.amount), 0)
  const totalExpense = filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0)
  const balance = totalIncome - totalExpense

  // helper: group any list of entries by month (YYYY-MM)
  function groupByMonth(entries) {
    const byMonth = {}
    for (const entry of entries) {
      const month = entry.date.slice(0, 7)
      if (!byMonth[month]) {
        byMonth[month] = []
      }
      byMonth[month].push(entry)
    }
    return byMonth
  }

  const expensesByMonth = groupByMonth(filteredExpenses)
  const incomesByMonth = groupByMonth(filteredIncomes)

  // helper: render a grouped section (reused for income and expense)
  function renderMonths(byMonth) {
    return Object.keys(byMonth).map((month) => {
      const monthEntries = byMonth[month]
      const monthTotal = monthEntries.reduce((sum, e) => sum + Number(e.amount), 0)
      return (
        <div key={month}>
          <h4>{month} — Total: {monthTotal}</h4>
          <ul>
            {monthEntries.map((entry, index) => (
              <li key={index}>
                {entry.date} - {entry.description}: {entry.amount}
              </li>
            ))}
          </ul>
        </div>
      )
    })
  }

  return (
    <div>
      <h2>Summary</h2>

      <h3>Filter by date range</h3>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      {rangeInvalid && (
        <p style={{ color: 'red' }}>End date must be after start date</p>
      )}

      <p>Total Income: {totalIncome}</p>
      <p>Total Expense: {totalExpense}</p>
      <p>Balance: {balance}</p>

      <h3>Income by Month</h3>
      {renderMonths(incomesByMonth)}

      <h3>Expenses by Month</h3>
      {renderMonths(expensesByMonth)}
    </div>
  )
}

export default SummaryPage