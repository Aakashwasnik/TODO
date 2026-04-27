 import { useEffect, useState } from "react";
import { api } from "../api";
import "./Todos.css";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [view, setView] = useState("todo"); // todo | inbox | trash
  const [selected, setSelected] = useState(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    api.get("/todos").then(res => setTodos(res.data));
  }, []);

  const addTask = async () => {
    if (!newTask) return;
    const res = await api.post("/todos", { title: newTask });
    setTodos([...todos, res.data]);
    setNewTask("");
  };

  const toggleTask = async (id) => {
    const res = await api.put(`/todos/${id}`);
    setTodos(todos.map(t => (t._id === id ? res.data : t)));
  };

  const deleteTask = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodos(todos.filter(t => t._id !== id));
    setSelected(null);
  };

  // FILTER LOGIC (NO CALENDAR HERE)
  const filteredTodos = () => {
    if (view === "trash") return [];
    if (view === "inbox") return todos.filter(t => !t.completed);
    return todos;
  };

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h3>Emir's Space</h3>

        <nav>
          <button
            onClick={() => setView("todo")}
            className={view === "todo" ? "active" : ""}
          >
            Todo
          </button>

          <button
            onClick={() => setView("inbox")}
            className={view === "inbox" ? "active" : ""}
          >
            Inbox
          </button>

          {/* ✅ CALENDAR NAVIGATION */}
          <button
            onClick={() => window.location.href = "/calendar"}
          >
            Calendar

          </button>

          <button
            onClick={() => setView("trash")}
            className={view === "trash" ? "active" : ""}
          >
            Trash
          </button>
        </nav>

        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Sign Out
        </button>
      </aside>

      {/* CENTER PANEL */}
      <main className="center">
        <header>
          <h2>{view.toUpperCase()}</h2>
          <button className="new-btn" onClick={addTask}>
            + New Task Add
          </button>
        </header>

        <input
          className="task-input"
          placeholder="Add new task"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />

        {filteredTodos().map(todo => (
          <div
            key={todo._id}
            className={`task ${
              selected?._id === todo._id ? "selected" : ""
            }`}
            onClick={() => setSelected(todo)}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTask(todo._id)}
            />
            <span className={todo.completed ? "done" : ""}>
              {todo.title}
            </span>
          </div>
        ))}

        {filteredTodos().length === 0 && (
          <p className="empty">No tasks found</p>
        )}
      </main>

      {/* RIGHT DETAILS PANEL */}
      <section className="details">
        {selected ? (
          <>
            <h3>Task Details</h3>
            <p className="title">{selected.title}</p>

            <p>Status: {selected.completed ? "Completed" : "Pending"}</p>
            <p>
              Created:{" "}
              {new Date(selected.createdAt).toDateString()}
            </p>

            <button
              className="delete"
              onClick={() => deleteTask(selected._id)}
            >
              Delete Task
            </button>
          </>
        ) : (
          <p className="empty">Select a task</p>
        )}
      </section>

    </div>
  );
}
