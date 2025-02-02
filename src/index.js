import express from "express"; 
import { PORT } from "./config.js";
import userRoutes from "./routes/users.routes.js";
import morgan from "morgan";

const app = express(PORT)

// Se usa para que entienda los datos en formato JSON
// como los que se suelen pasar x el body
app.use(express.json())

// Sirve para monitorear las peticiones del servidor desde consola
app.use(morgan('dev'))
app.use(userRoutes)
app.listen(PORT)

console.log("Server on port", PORT)