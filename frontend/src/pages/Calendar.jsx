 import { useEffect, useState } from "react";
import { api } from "../api";
import "./Calendar.css";

const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9AM–8PM
const days = ["Sun", "Mon", "Tue", "Wed", "Thu"];

export default function Calendar() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    api.get("/todos").then(res => setTodos(res.data));
  }, []);

  const getTasksForDayHour = (dayIndex, hour) => {
    return todos.filter(t => {
      const d = new Date(t.createdAt);
      return d.getDay() === dayIndex && d.getHours() === hour;
    });
  };

  return (
    <div className="calendar-wrapper">

      {/* SIDEBAR */}
      <aside className="calendar-sidebar">
        <h3>Datewise</h3>
        <button className="active">Calendar</button>
        <button onClick={() => window.location.href="/todos"}>To do list</button>
      </aside>

      {/* MAIN CALENDAR */}
      <div className="calendar-main">
        <header className="calendar-header">
          <h2>April, 2026</h2>
        </header>

        <div className="calendar-grid">

          {/* TOP ROW (DAYS) */}
          <div className="time-col"></div>
          {days.map(d => (
            <div key={d} className="day-header">{d}</div>
          ))}

          {/* TIME ROWS */}
          {hours.map(hour => (
            <>
              <div key={hour} className="time-col">
                {hour}:00
              </div>

              {days.map((_, dayIndex) => (
                <div key={dayIndex} className="cell">
                  {getTasksForDayHour(dayIndex, hour).map(task => (
                    <div key={task._id} className="event">
                      {task.title}
                    </div>
                  ))}
                </div>
              ))}
            </>
          ))}

        </div>
      </div>

    </div>
  );
}
