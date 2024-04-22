import { useContext } from "react";
import ExpensesOutput from "../../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../../store/expense-context";
import { getDatesMinusDays } from "../../util/date";

const MonthDaysAgo = () => {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const Today = new Date();
    const date30daysAgo = getDatesMinusDays(Today, 30);
    return expense.date >= date30daysAgo && expense.date <= Today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 1 days"
      fallbackText="No expenses registered for last Month"
    />
  );
};

export default MonthDaysAgo;

// const expensesCtx = useContext(ExpensesContext);
// useEffect(() => {
//   const getExpenses = async () => {
//     const expenses = await fetchExpenses();
//   };
// }, []);
