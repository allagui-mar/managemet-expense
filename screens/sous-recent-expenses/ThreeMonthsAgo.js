import { useContext } from "react";
import ExpensesOutput from "../../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../../store/expense-context";
import { getDatesMinusDays } from "../../util/date";

const ThreeMonthsDaysAgo = () => {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const Today = new Date();
    const date120daysAgo = getDatesMinusDays(Today, 120);
    return expense.date >= date120daysAgo && expense.date <= Today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 3 Months"
      fallbackText="No expenses registered for last 3 Months"
    />
  );
};

export default ThreeMonthsDaysAgo;
