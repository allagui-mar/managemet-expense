import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: ({ amount, description, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpenses: (id) => {},
  updateExpenses: (id, { amount, description, date }) => {},
});
const actions = {
  ADD_EXPENSE: "ADD_EXPENSE",
  SET_EXPENSES: "SET_EXPENSES",
  DELETE_EXPENSE: "DELETE_EXPENSE",
  UPDATE_EXPENSE: "UPDATE_EXPENSE",
};
const expenseReducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_EXPENSE:
      return [action.payload, ...state];
    case actions.SET_EXPENSES:
      return action.payload;
    case actions.DELETE_EXPENSE:
      return state.filter((expense) => expense.id !== action.payload);
    case actions.UPDATE_EXPENSE:
      return state.map((expense) =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.data }
          : expense
      );
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expenses, dispatch] = useReducer(expenseReducer, []);

  const addExpenses = (expenseData) => {
    dispatch({ type: actions.ADD_EXPENSE, payload: expenseData });
  };

  const setExpensesState = (newExpenses) => {
    dispatch({
      type: actions.SET_EXPENSES,
      payload: [...newExpenses, ...expenses],
    });
  };

  const deleteExpenses = (id) => {
    dispatch({ type: actions.DELETE_EXPENSE, payload: id });
  };

  const updateExpenses = (id, expenseData) => {
    dispatch({
      type: actions.UPDATE_EXPENSE,
      payload: { id, data: expenseData },
    });
  };

  const value = {
    expenses,
    setExpenses: setExpensesState,
    addExpenses,
    deleteExpenses,
    updateExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;

// import { createContext, useReducer } from "react";

// export const ExpensesContext = createContext({
//   expenses: [],
//   addExpenses: ({ amount, description, date }) => {},
//   setExpenses: (expenses) => {},
//   deleteExpenses: (id) => {},
//   updateExpenses: (id, { amount, description, date }) => {},
// });
// const actions = {
//   ADD_EXPENSE: "ADD_EXPENSE",
//   SET_EXPENSES: "SET_EXPENSES",
//   DELETE_EXPENSE: "DELETE_EXPENSE",
//   UPDATE_EXPENSE: "UPDATE_EXPENSE",
// };
// const expenseReducer = (state, action) => {
//   switch (action.type) {
//     case actions.ADD_EXPENSE:
//       return [...state, action.payload];
//     case actions.SET_EXPENSES:
//       return action.payload;
//     case actions.DELETE_EXPENSE:
//       return state.filter((expense) => expense.id !== action.payload);
//     case actions.UPDATE_EXPENSE:
//       return state.map((expense) =>
//         expense.id === action.payload.id
//           ? { ...expense, ...action.payload.data }
//           : expense
//       );
//     default:
//       return state;
//   }
// };

// const ExpensesContextProvider = ({ children }) => {
//   const [expenses, dispatch] = useReducer(expenseReducer, []);

//   const addExpenses = (expenseData) => {
//     dispatch({ type: actions.ADD_EXPENSE, payload: expenseData });
//   };

//   const setExpensesState = (newExpenses) => {
//     dispatch({ type: actions.SET_EXPENSES, payload: newExpenses });
//   };

//   const deleteExpenses = (id) => {
//     dispatch({ type: actions.DELETE_EXPENSE, payload: id });
//   };

//   const updateExpenses = (id, expenseData) => {
//     dispatch({
//       type: actions.UPDATE_EXPENSE,
//       payload: { id, data: expenseData },
//     });
//   };

//   const value = {
//     expenses,
//     setExpenses: setExpensesState,
//     addExpenses,
//     deleteExpenses,
//     updateExpenses,
//   };

//   return (
//     <ExpensesContext.Provider value={value}>
//       {children}
//     </ExpensesContext.Provider>
//   );
// };

// export default ExpensesContextProvider;
// // ///
// // import { createContext, useReducer } from "react";
// // const STATIC_EXPENSES = [
// //   {
// //     id: "e1",
// //     description: " deux baguette farcée",
// //     amount: 29.33,
// //     date: new Date("2024-02-01"),
// //   },
// //   {
// //     id: "e2",
// //     description: " café",
// //     amount: 2.33,
// //     date: new Date("2024-02-02"),
// //   },

// //   {
// //     id: "e3",
// //     description: " kilo bananas",
// //     amount: 2.99,
// //     date: new Date("2024-04-18"),
// //   },
// //   {
// //     id: "e4",
// //     description: " a Book",
// //     amount: 5.99,
// //     date: new Date("2024-04-19"),
// //   },
// //   {
// //     id: "e5",
// //     description: " Gateaux",
// //     amount: 3.99,
// //     date: new Date("2024-04-15"),
// //   },
// //   {
// //     id: "e6",
// //     description: " coca-cola",
// //     amount: 3.23,
// //     date: new Date("2024-04-20"),
// //   },
// //   {
// //     id: "e7",
// //     description: " deux baguette farcée",
// //     amount: 29.33,
// //     date: new Date("2024-02-01"),
// //   },
// //   {
// //     id: "e8",
// //     description: " café",
// //     amount: 2.33,
// //     date: new Date("2024-02-02"),
// //   },

// //   {
// //     id: "e9",
// //     description: " kilo bananas",
// //     amount: 2.99,
// //     date: new Date("2024-04-13"),
// //   },
// //   {
// //     id: "e10",
// //     description: " a Book",
// //     amount: 5.99,
// //     date: new Date("2024-04-14"),
// //   },
// //   {
// //     id: "e11",
// //     description: " Gateaux",
// //     amount: 3.99,
// //     date: new Date("2024-04-15"),
// //   },
// //   {
// //     id: "e12",
// //     description: " coca-cola",
// //     amount: 3.23,
// //     date: new Date("2024-04-12"),
// //   },
// // ];

// // export const ExpensesContext = createContext({
// //   expenses: [],
// //   addExpense: ({ date, amount, description }) => {},
// //   deleteExpense: (id) => {},
// //   updateExpense: (id, { date, amount, description }) => {},
// // });
// // const expensesReducer = (state, action) => {
// //   switch (action.type) {
// //     case "ADD":
// //       return [action.payload, ...state];
// //     case "SET":
// //       const inverted = action.payload.reverse();
// //       return inverted;
// //     case "DELETE":
// //       return state.filter((expense) => expense.id !== action.payload);
// //     case "UPDATE":
// //       const updatableExpenseIndex = state.findIndex(
// //         (expense) => expense.id === action.payload.id
// //       );
// //       const updatableExpense = state[updatableExpenseIndex];
// //       const updatedItem = { ...updatableExpense, ...action.payload.data };
// //       const updatedExpenses = [...state];
// //       updatedExpenses[updatableExpenseIndex] = updatedItem;
// //       return updatedExpenses;
// //     default:
// //       return state;
// //   }
// // };

// // const ExpensesContextProvider = ({ children }) => {
// //   const [expensesState, dispatch] = useReducer(
// //     expensesReducer,
// //     STATIC_EXPENSES
// //   );
// //   const addExpense = (expenseData) => {
// //     dispatch({ type: "ADD", payload: expenseData });
// //   };
// //   const deleteExpense = (id) => {
// //     dispatch({ type: "DELETE", payload: id });
// //   };
// //   const updateExpense = (id, expenseData) => {
// //     dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
// //   };
// //   const value = {
// //     expenses: expensesState,
// //     addExpense: addExpense,
// //     deleteExpense: deleteExpense,
// //     updateExpense: updateExpense,
// //   };

// //   return (
// //     <ExpensesContext.Provider value={value}>
// //       {children}
// //     </ExpensesContext.Provider>
// //   );
// // };

// // export default ExpensesContextProvider;
