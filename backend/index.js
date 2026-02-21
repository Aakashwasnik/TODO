const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db")();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/todos", require("./routes/todo"));

app.listen(5000, () => console.log("Server running on 5000"));
