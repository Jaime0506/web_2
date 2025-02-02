import express from "express"; 
import { PORT } from "./config.js";
import userRoutes from "./routes/users.routes.js";

const app = express(PORT)

// Se usa para que entienda los datos en formato JSON
// como los que se suelen pasar x el body
app.use(express.json())

app.use(userRoutes)
app.listen(PORT)

console.log("Server on port", PORT)