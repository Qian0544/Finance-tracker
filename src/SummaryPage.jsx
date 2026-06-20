import { useState } from "react";

function SummaryPage({expenses, incomes}){
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [filterError, setFilterError] = useState('')

    const totalIncome = incomes.reduce((sum,e)=>sum+Number(e.amount),0)
    const totalExpense = expenses.reduce((sum,e)=>sum+Number(e.amount),0)
    const balance = totalIncome - totalExpense

    //decide which expenses to show based on the date range
    const rangeInvalid = startDate && endDate && endDate<startDate
    let visibleExpenses = expenses
    if(startDate && endDate && !rangeInvalid){
            visibleExpenses = expenses.filter(
                (e)=>e.date >=startDate && e.date<=endDate
            )
        }
    

    //group expenses by month(YYYY-MM)
    const byMonth={}
    for(const entry of visibleExpenses){
        const month = entry.date.slice(0,7)
        if(!byMonth[month]){
            byMonth[month] = []
        }
        byMonth[month].push(entry)
    }
    /*byMonth['2026-06'] = [
  { description: 'food', amount: '342', date: '2026-06-19' },   // ← whole object, element 0
  { description: 'gym',  amount: '500', date: '2026-06-01' }    // ← whole object, element 1
]*/

    return(
        <div>
            <h2>Summary</h2>

            <p>Total Income: {totalIncome}</p>
            <p>Total Expense: {totalExpense}</p>
            <p>Balance: {balance}</p>

            <h3>Filter by date range</h3>
            <input
            type='date'
            value={startDate}
            onChange={(e)=>setStartDate(e.target.value)}
            />

            <input
            type="date"
            value={endDate}
            onChange={(e)=>setEndDate(e.target.value)}
            />

            {startDate && endDate && endDate<startDate && (
                <p style={{color:'red'}}>End date must be after start date</p>
            )}

            <h3>Expenses by Month</h3>
            {Object.keys(byMonth).map((month)=>{
                const monthEntries=byMonth[month]
                const monthTotal=monthEntries.reduce((sum,e)=>sum+Number(e.amount),0)
                return(
                    <div key={month}>
                        <h4>{month} - Total: {monthTotal}</h4>
                        <ul>
                            {monthEntries.map((entry, index)=>(
                                <li key={index}>
                                    {entry.date} - {entry.description}:{entry.amount}
                                </li>
                            ))}
                        </ul>
                </div>
                )
            })}
        </div>
    )
}

export default SummaryPage