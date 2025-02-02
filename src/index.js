import express from "express"; 
import { PORT } from "./config.js";
import userRoutes from "./routes/users.routes.js";

const app = express(PORT)

app.use(userRoutes)

console.log("Server on port", PORT)