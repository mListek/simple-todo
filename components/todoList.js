import { Text, View, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Todo from "../model/todo";
import TodoSection from "./todoSection";
import Button from "../ui/button";
import colors from "../global/colors";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching data...");
      const data = await AsyncStorage.getItem("todos");

      if (data) {
        setTodoList(JSON.parse(data));
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Saving data...");
    async function saveData() {
      AsyncStorage.setItem("todos", JSON.stringify(todoList));
    }
    saveData();
  }, [todoList]);

  const addTodo = () => {
    const id = Date.now().toString() + Math.random().toString();
    const date = new Date();
    const dateString = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    setTodoList((prev) => [...prev, new Todo(id, "", dateString)]);
  };

  const updateTodo = (id, content) => {
    console.log("Inside updateTodo, content: " + content);
    const updatedTodoIndex = todoList.findIndex((todo) => todo.id === id);
    const updatedTodo = todoList[updatedTodoIndex];
    updatedTodo.content = content;
    const updatedTodoList = [...todoList];
    updatedTodoList[updatedTodoIndex] = updatedTodo;
    setTodoList(updatedTodoList);
    console.log(updatedTodoList);
  };

  const deleteTodo = (id) => {
    console.log("Deleting todo: " + id);
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <>
      {todoList.length === 0 && (
        <Text style={styles.infoText}>No tasks created yet...</Text>
      )}
      <FlatList
        data={todoList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoSection
            item={item}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        )}
      />
      <View style={styles.buttonContainer}>
        <Button
          name="add-circle"
          color={colors.neonOrange}
          size={30}
          onPress={addTodo}
          label="New Task"
        />
      </View>
    </>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  infoText: {
    color: "white",
    marginLeft: 20,
  },
  buttonContainer: {
    marginBottom: 45,
  },
});
