import { useState } from "react";

function ExpensePage({ entries, addEntry }) {

    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [error, setError] = useState('')

    function handleAdd() {
        const trimmed = description.trim()
        if (trimmed === '') {
            setError('Description is required')
            return
        }
        if (!/^[a-zA-Z0-9 -]+$/.test(description)) {
            setError('Description has invalid characters')
            return
        }
        if (isNaN(amount) || Number(amount) <= 0) {
            setError('Amount must be a positive number')
            return
        }

        addEntry({ description, amount, date})
        setDescription('')
        setAmount('')
        setError('')
    }

    return(
        <div>
            <h2>Add Expense</h2>

            <input
            type="text"
            placeholder="Description"
            maxLength={50}
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            />

            <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            />

            <input
            type="date"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
            />

            <button onClick={handleAdd}>Add Expense</button>
            {error && <p style={{color: 'red'}}>{error}</p>}

            <ul>
                {entries.map((entry, index)=>(
                    <li key = {index}>
                        {entry.date} - {entry.description}: {entry.amount}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ExpensePage