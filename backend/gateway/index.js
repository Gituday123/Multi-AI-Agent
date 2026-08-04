import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import proxy from "express-http-proxy";

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

// CORS — allow requests from the frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Proxy all /auth requests to the auth microservice
app.use("/auth", proxy(process.env.AUTH_SERVICE_URL));

app.get("/", (req, res) => {
  res.send("Gateway is running");
});

app.listen(port, () => {
  console.log(`Gateway started at port ${port}`);
});