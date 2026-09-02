import express from "express";
import cors from "cors";
import itemRoutes from "./features/items/item.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Campus Lost & Found API is running"
  })
});

app.use("/api/items", itemRoutes);

export default app;
