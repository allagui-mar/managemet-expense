import { ActivityIndicator, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const LoadingOverlay = () => {
  return (
    <View style={Styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default LoadingOverlay;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItem: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.personalize,
  },
});
