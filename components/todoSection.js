import { View, StyleSheet, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import colors from "../global/colors";

const TodoSection = ({ item, deleteTodo }) => {
  const [todoContent, setTodoContent] = useState(item.content);
  const [isDone, setIsDone] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    console.log("Use Effect runs...");
    if (isDone) {
      console.log("isDone, setting timeout");
      timeoutRef.current = setTimeout(() => {
        console.log("inside setTimeout");
        deleteTodo(item.id);
      }, 2000);
    } else {
      if (timeoutRef.current) {
        console.log("else block, clearing timeout");
        clearTimeout(timeoutRef.current);
      }
    }
  }, [isDone]);

  const handleIsDone = () => {
    setIsDone((prev) => !prev);
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
        <Ionicons
          name={isDone ? "checkmark-circle-outline" : "ellipse-outline"}
          size={30}
          color={colors.neonOrange}
          onPress={handleIsDone}
        />
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
