import { FlatList } from "react-native";
import Todo from "../model/todo";
import TodoSection from "./todoSection";

const todoList = [
  new Todo(0, "buy fish for dinner", new Date(Date.now)),
  new Todo(1, "use steamcooker", new Date(Date.now)),
  new Todo(2, "eat dinner", new Date(Date.now)),
];

const renderTodoItem = (itemData) => {
  return <TodoSection item={itemData.item} />;
};

const TodoList = () => {
  return (
    <FlatList
      data={todoList}
      keyExtractor={(item) => item.id}
      renderItem={renderTodoItem}
    />
  );
};

export default TodoList;