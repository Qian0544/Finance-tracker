import { useState } from 'react'

function SummaryPage({ expenses, incomes }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const rangeInvalid = startDate && endDate && endDate < startDate

  function inRange(entry) {
    if (!startDate || !endDate || rangeInvalid) return true
    return entry.date >= startDate && entry.date <= endDate
  }

  // tag each entry with its type and a signed amount, then combine
  const signedExpenses = expenses
    .filter(inRange)
    .map((e) => ({ ...e, type: 'expense', signed: -Number(e.amount) }))

  const signedIncomes = incomes
    .filter(inRange)
    .map((e) => ({ ...e, type: 'income', signed: Number(e.amount) }))

  const allEntries = [...signedIncomes, ...signedExpenses]

  // totals from the filtered data
  const totalIncome = signedIncomes.reduce((sum, e) => sum + Number(e.amount), 0)
  const totalExpense = signedExpenses.reduce((sum, e) => sum + Number(e.amount), 0)
  const balance = totalIncome - totalExpense

  // group the combined list by month (YYYY-MM)
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

  const byMonth = groupByMonth(allEntries)
  const months = Object.keys(byMonth).sort()

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

      <hr />

      <h3>By Month</h3>
      {months.length === 0 && <p style={{ color: 'red' }}>No entries in this range.</p>}
      {months.map((month) => (
        <div key={month}>
          <h4>{month}</h4>
          <ul>
            {byMonth[month].map((entry, index) => (
              <li key={index}>
                {entry.date} - {entry.description}: {entry.signed}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default SummaryPage