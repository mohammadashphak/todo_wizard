import { useState } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([
    "Buy groceries",
    "Call the dentist",
    "Go for a run",
    "Finish homework",
  ]);
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const addTodo = async (e) => {
    e.preventDefault(); // will stop the defalut refreshing behaviour
    setTodos([...todos, input]);
    setInput("");
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
          <Todo key={index} text={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
