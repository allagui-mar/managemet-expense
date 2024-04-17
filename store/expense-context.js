import { createContext, useReducer } from "react";
const STATIC_EXPENSES = [
  {
    id: "e1",
    description: " deux baguette farcée",
    amount: 29.33,
    date: new Date("2024-02-01"),
  },
  {
    id: "e2",
    description: " café",
    amount: 2.33,
    date: new Date("2024-02-02"),
  },

  {
    id: "e3",
    description: " kilo bananas",
    amount: 2.99,
    date: new Date("2024-04-13"),
  },
  {
    id: "e4",
    description: " a Book",
    amount: 5.99,
    date: new Date("2024-04-14"),
  },
  {
    id: "e5",
    description: " Gateaux",
    amount: 3.99,
    date: new Date("2024-04-15"),
  },
  {
    id: "e6",
    description: " coca-cola",
    amount: 3.23,
    date: new Date("2024-04-12"),
  },
  {
    id: "e7",
    description: " deux baguette farcée",
    amount: 29.33,
    date: new Date("2024-02-01"),
  },
  {
    id: "e8",
    description: " café",
    amount: 2.33,
    date: new Date("2024-02-02"),
  },

  {
    id: "e9",
    description: " kilo bananas",
    amount: 2.99,
    date: new Date("2024-04-13"),
  },
  {
    id: "e10",
    description: " a Book",
    amount: 5.99,
    date: new Date("2024-04-14"),
  },
  {
    id: "e11",
    description: " Gateaux",
    amount: 3.99,
    date: new Date("2024-04-15"),
  },
  {
    id: "e12",
    description: " coca-cola",
    amount: 3.23,
    date: new Date("2024-04-12"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ date, amount, description }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { date, amount, description }) => {},
});
const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = Date.now().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(
    expensesReducer,
    STATIC_EXPENSES
  );
  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };
  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
