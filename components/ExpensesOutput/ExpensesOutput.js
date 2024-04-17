import { View, StyleSheet } from "react-native";
import ExpensesSummary from "../Expenses/ExpensesSummary";
import ExpensesList from "../Expenses/ExpensesList";
import { GlobalStyles } from "../../constants/styles";
const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={Styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

export default ExpensesOutput;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.personalize100,
  },
});
