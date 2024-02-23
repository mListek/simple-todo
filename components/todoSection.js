import { Text, View, StyleSheet } from "react-native";
import colors from "../global/colors";

const TodoSection = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.content}</Text>
    </View>
  );
};

export default TodoSection;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  text: {
    color: colors.lightText,
    fontSize: 16,
  },
});
