import { useContext } from "react";
import ExpensesOutput from "../../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../../store/expense-context";
import { getDatesMinusDays } from "../../util/date";

const ThreeDays = () => {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const Today = new Date();
    const date3daysAgo = getDatesMinusDays(Today, 3);
    return expense.date >= date3daysAgo;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 3 days"
      fallbackText="No expenses registered for last 3days"
    />
  );
};

export default ThreeDays;
