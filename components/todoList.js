import { View, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Todo from "../model/todo";
import TodoSection from "./todoSection";
import Button from "../ui/button";
import colors from "../global/colors";

const renderTodoItem = (itemData) => {
  return <TodoSection item={itemData.item} />;
};

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
    const dateString = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${
      date.getMinutes
    }`;
    setTodoList((prev) => [...prev, new Todo(id, "", dateString)]);
  };

  const updateTodo = (id, content) => {
    const updatedTodoIndex = todoList.findIndex((todo) => todo.id === id);
    const updatedTodo = todoList[updatedTodoIndex];
    updatedTodo.content = content;
    const updatedTodoList = todoList;
    updatedTodoList[updatedTodoIndex] = updatedTodo;
    setTodoList(updatedTodoList);
  };

  const deleteTodo = (id) => {
    console.log("Deleting todo: " + id);
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <FlatList
        data={todoList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoSection item={item} deleteTodo={deleteTodo} />
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
  buttonContainer: {
    borderColor: "white",
    marginBottom: 45,
  },
});
