import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpenses from "./screens/ManageExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import { GlobalStyles } from "./constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expense-context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ThreeDays from "./screens/sous-recent-expenses/ThreeDays";
import SevenDays from "./screens/sous-recent-expenses/SevenDays";
import MonthDaysAgo from "./screens/sous-recent-expenses/MonthDaysAgo";
import OneDays from "./screens/sous-recent-expenses/OneDays";
import ThreeMonthsAgo from "./screens/sous-recent-expenses/ThreeMonthsAgo";
import "react-native-gesture-handler";
import DateActual from "./util/DateActual";
import { View } from "react-native";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const RecentExpensesDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.personalize200 },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#c32275" },
        drawerContentStyle: { backgroundColor: "#c3187c" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#351442",
        drawerActiveBackgroundColor: "#d4a98f",
      }}>
      <Drawer.Screen name="OneDays" component={OneDays} />
      <Drawer.Screen name="ThreeDays" component={ThreeDays} />
      <Drawer.Screen name="SevenDays" component={SevenDays} />
      <Drawer.Screen name="OneMonth" component={MonthDaysAgo} />
      <Drawer.Screen name="ThreeMonths" component={ThreeMonthsAgo} />
    </Drawer.Navigator>
  );
};

const ExpenseOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.personalize },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.personalize },
        tabBarActiveTintColor: GlobalStyles.colors.primary500,
        headerRight: ({ tintColor }) => (
          <View
            style={{
              flexDirection: "row",

              alignItems: "center",
              justifyContent: "space-evenly",
            }}>
            <DateActual />
            <IconButton
              icon="add"
              size={28}
              color={tintColor}
              onPress={() => {
                navigation.navigate("ManageExpenses");
              }}
            />
          </View>
        ),
      })}>
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpensesDrawer}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses ",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="basket" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.personalize200,
              },
              headerTintColor: "white",
            }}>
            <Stack.Screen
              name="ExpenseOverview"
              component={ExpenseOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpenses}
              options={{ title: "Manage Expenses", presentation: "modal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
};
export default App;
