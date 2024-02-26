import { Text, View, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import colors from "../global/colors";

const TodoSection = ({ item, deleteTodo }) => {
  const [todoContent, setTodoContent] = useState(item.content);
  const [isDone, setIsDone] = useState(false);

  const handleIsDone = () => {
    setIsDone((prev) => !prev);
    deleteTodo(item.id);
  };

  const handleTextChange = (enteredValue) => {
    setTodoContent(enteredValue);
  };

  const handleSaveChanges = () => {
    return;
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {!isDone && (
          <Ionicons
            name="ellipse-outline"
            size={30}
            color={colors.neonOrange}
            onPress={handleIsDone}
          />
        )}
        {isDone && (
          <Ionicons
            name="checkmark-circle-outline"
            size={28}
            color={colors.neonOrange}
            onPress={handleIsDone}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          keyboardAppearance="dark"
          autoFocus={true}
          value={todoContent}
          onChangeText={handleTextChange}
          onEndEditing={handleSaveChanges}
        />
      </View>
    </View>
  );
};

export default TodoSection;

const styles = StyleSheet.create({
  container: {
    padding: 2,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    marginRight: 8,
  },
  textInput: {
    color: colors.lightText,
    fontSize: 28,
  },
});
