import { Router } from "express";
import { getItemsController, createItemController } from "./item.controller.js";

const router = Router();

router.get("/", getItemsController);
router.post("/", createItemController);

export default router;