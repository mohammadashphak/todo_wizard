import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import React from "react";
import db from "../../firebase";
import "./Todo.css";
import { useState } from "react";

const Todo = (props) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(props.todo.todo);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = (e) => {
    setDoc(doc(db, "todos", props.todo.id), { todo: input }, { merge: true });
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              padding: "20px",
              width: "400px",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button>
              <CheckIcon onClick={updateTodo} />
            </Button>
          </Box>
        </div>
      </Modal>
      <List className="todo_list">
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText
            primary={props.todo.todo}
            secondary="Task Deadline ⏰"
          />
          <Button>
            <EditIcon onClick={handleOpen} />
          </Button>
          <Button>
            <DeleteForeverIcon
              onClick={async (e) => {
                await deleteDoc(doc(db, "todos", props.todo.id));
              }}
            />
          </Button>
        </ListItem>
      </List>
    </>
  );
};

export default Todo;
