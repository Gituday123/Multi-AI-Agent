import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/", authRoutes);

app.get("/", (req, res) => {
    res.send("Hello from auth service");
});

app.listen(port, () => {
    console.log(`Auth service started at port ${port}`);
});