import express from "express";
import cors from "cors";
import itemRoutes from "./features/items/item.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";

const app = express();

const allowedOrigins = process.env.CLIENT_URLS.split(",");

app.use(
  cors({
    origin: allowedOrigins,
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

app.use(notFound);

app.use(errorHandler);             //it always after the routes

export default app;
