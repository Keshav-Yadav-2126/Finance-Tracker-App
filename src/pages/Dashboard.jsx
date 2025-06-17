import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactionStore } from '../store/transactionStore';
import IncomeExpenseChart from "../components/IncomeExpenseChart";


const Dashboard = () => {

  const navigate = useNavigate();
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    editTransaction,
    filters,
    setFilters
  } = useTransactionStore();

  const [form, setForm] = useState({
    title: '',
    amount: '',
    type: 'income',
    category: '',
  });

  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(form.amount);

    if (!form.title || isNaN(parsedAmount) || !form.category) {
      alert('Please fill in all fields correctly');
      return;
    }

    const transactionData = {
      ...form,
      amount: parsedAmount,
      date: new Date(),
    };

    if (editId) {
      editTransaction(editId, transactionData);
      setEditId(null);
    } else {
      addTransaction(transactionData);
    }

    setForm({
      title: '',
      amount: '',
      type: 'income',
      category: '',
    });
  };

  const handleEdit = (txn) => {
    setForm({
      title: txn.title,
      amount: txn.amount,
      type: txn.type,
      category: txn.category || '',
    });
    setEditId(txn.id);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Filtered Data Logic
  const filteredTransactions = transactions.filter((txn) => {
    const matchMonth =
      filters.month === 'all' ||
      new Date(txn.date).getMonth() === Number(filters.month);
    const matchType = filters.type === 'all' || txn.type === filters.type;
    return matchMonth && matchType;
  });

  const filteredIncome = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const filteredExpense = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const filteredBalance = filteredIncome - filteredExpense;

  return (
    <div className="container" style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Dashboard</h2>
      <button style={{marginBottom: '10px'}} onClick={logout}>Logout</button>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="salary">Salary</option>
          <option value="freelance">Freelance</option>
          <option value="food">Food</option>
          <option value="shopping">Shopping</option>
          <option value="bills">Bills</option>
        </select>

        <button type="submit">{editId ? 'Update' : 'Add'} Transaction</button>
      </form>

      <h3>Filters</h3>
      <select
        onChange={(e) => setFilters({ month: e.target.value })}
        value={filters.month}
      >
        <option value="all">All Months</option>
        {[...Array(12)].map((_, i) => (  // here we took empty array of 12 items 
          <option key={i} value={i}>
            {new Date(0, i).toLocaleString('default', { month: 'long' })}   {/*extract the month name*/} 
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setFilters({ type: e.target.value })}
        value={filters.type}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      
      <h3>Filtered Balance: ₹{filteredBalance}</h3>
      <h4>
        Income: ₹{filteredIncome} | Expense: ₹{filteredExpense}
      </h4>

      <h3>Transaction History</h3>
      <ul>
        {filteredTransactions.map((txn) => (
          <li key={txn.id}>
            {txn.title} - ₹{txn.amount} ({txn.type}) [{txn.category}]
            <div>
              <button onClick={() => handleEdit(txn)}>Edit</button>
              <button onClick={() => deleteTransaction(txn.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <IncomeExpenseChart />
    </div>
  );
};

export default Dashboard;
