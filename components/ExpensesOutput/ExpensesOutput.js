import { View, StyleSheet, Text } from "react-native";
import ExpensesSummary from "../Expenses/ExpensesSummary";
import ExpensesList from "../Expenses/ExpensesList";
import { GlobalStyles } from "../../constants/styles";
const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  let content =
    expenses.length > 0 ? (
      <ExpensesList expenses={expenses} />
    ) : (
      <Text style={Styles.infoText}>{fallbackText}</Text>
    );

  return (
    <View style={Styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
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
  infoText: {
    color: "#FFFF",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
