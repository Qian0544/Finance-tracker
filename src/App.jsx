import { useState } from "react";
import ExpensePage from "./ExpensePage";
import IncomePage from "./IncomePage";
import SummaryPage from "./SummaryPage";

function App(){
  const [page, setPage] = useState('expense')
  const [expenses, setExpenses] = useState([])
  const [incomes, setIncomes] = useState([])

  function addExpense(entry){
    setExpenses([...expenses,entry])
  }

  function addIncome(entry){
    setIncomes([...incomes, entry])
  }

  return(
    <div>
      <h1>Finance Tracker</h1>

      <nav>
        <button onClick={()=>setPage('expense')}>Expense</button>
        <button onClick={()=>setPage('income')}>Income</button>
        <button onClick={()=>setPage('summary')}>Summary</button>
      </nav>

      {page === 'expense' &&(
        <ExpensePage entries ={expenses} addEntry={addExpense}/>
      )}
      {page ==='income' && (
        <IncomePage entries={incomes} addEntry={addIncome}/>
      )}
      {page ==='summary'&&(
        <SummaryPage expenses={expenses} incomes={incomes}/>
      )}
    </div>
  )
}

export default App