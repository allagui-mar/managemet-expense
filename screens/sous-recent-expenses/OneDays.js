import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../../store/expense-context";
import { getDatesMinusDays } from "../../util/date";
import { fetchExpenses } from "../../util/http";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

const OneDays = () => {
  [isFetching, setIsFetching] = useState(true);
  [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("could not fetch Error !");
      }
      setIsFetching(false);
    };
    getExpenses();
  }, []);
  const errorHandler = () => {
    setError(null);
  };
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date1daysAgo = getDatesMinusDays(today, 1);
    return expense.date >= date1daysAgo;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensePeriod="Last 1 days"
      fallbackText="No expenses registered for the last 1 day"
    />
  );
};
export default OneDays;
