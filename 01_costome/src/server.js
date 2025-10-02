import express from "express";
import path from "path";
import todoRoutes from "./routes/todos.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/todos", todoRoutes);
app.use("/", express.static(path.join(__dirname, "../public")));
app.use("/app", express.static(path.join(__dirname, "../app/dist")));
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
    console.log("http://localhost:3000");
});
