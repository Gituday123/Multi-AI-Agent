import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Proxy all requests to the auth service
app.use("/auth", proxy(process.env.AUTH_SERVICE_URL));

app.get("/", (req, res) => {
    res.send("Gateway is running");
});

app.listen(port, () => {
    console.log(`Gateway started at ${port}`);
});