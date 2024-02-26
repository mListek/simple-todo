import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import TodoList from "./components/todoList";
import colors from "./global/colors";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.headerText}>To do:</Text>
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 70,
  },
  headerText: {
    color: colors.neonOrange,
    fontWeight: "bold",
    fontSize: 30,
    margin: 15,
  },
});
