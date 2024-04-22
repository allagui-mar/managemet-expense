import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

const DateActual = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    justifyContent: "flex-start",
    paddingRight: 20,
  },
  dateText: {
    color: GlobalStyles.colors.primary800,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DateActual;
