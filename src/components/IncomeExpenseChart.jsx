import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTransactionStore } from '../store/transactionStore';

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeExpenseChart = () => {
  const { transactions, filters } = useTransactionStore();

  const filtered = transactions.filter(txn => {
    const matchMonth =
      filters.month === 'all' || new Date(txn.date).getMonth() === Number(filters.month);
    const matchType = filters.type === 'all' || txn.type === filters.type;
    return matchMonth && matchType;
  });

  const incomeTotal = filtered
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expenseTotal = filtered
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: '₹',
        data: [incomeTotal, expenseTotal],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h3>Income vs Expense</h3>
      <Pie data={data} />
    </div>
  );
};

export default IncomeExpenseChart;
