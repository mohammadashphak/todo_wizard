import { useState } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import Todo from "./components/Todo";
import { useEffect } from "react";
import db from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // when The app loads, we need to listen to the database and fetch new todos as they get added/removed
  const fetchPost = async () => {
    onSnapshot(
      query(collection(db, "todos"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
        // console.log(
        //   "Current data: ",
        //   snapshot.docs.map((doc) => doc.data().todo)
        // );
      }
    );
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const addTodo = async (e) => {
    e.preventDefault(); // will stop the defalut refreshing behaviour
    try {
      await addDoc(collection(db, "todos"), {
        todo: input,
        timestamp: Timestamp.now(),
      });
      // setTodos([input, ...todos]);
      setInput(""); // clear up the input after clicking add todo button
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="App">
      <h1>ToDo Wizard</h1>
      <form>
        <FormControl>
          <InputLabel>✅ Write a Todo</InputLabel>
          <Input type="text" value={input} onChange={handleInput} />
        </FormControl>
        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
          onClick={addTodo}
        >
          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <Todo key={index} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
