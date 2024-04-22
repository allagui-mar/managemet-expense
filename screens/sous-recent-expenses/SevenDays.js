import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../../store/expense-context";
import { getDatesMinusDays } from "../../util/date";
import { fetchExpenses } from "../../util/http";
import LoadingOverlay from "../../components/UI/LoadingOverlay";

const SevenDays = () => {
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
    const date7daysAgo = getDatesMinusDays(today, 7);
    return expense.date > date7daysAgo;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensePeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
};

export default SevenDays;
