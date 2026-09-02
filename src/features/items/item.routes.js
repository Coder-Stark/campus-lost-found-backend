import { Router } from "express";
import { getItemsController, createItemController } from "./item.controller.js";
import validate from "../../middleware/validate.js";
import { createItemSchema } from "./item.validation.js";

const router = Router();

router.get("/", getItemsController);
router.post("/", validate(createItemSchema), createItemController);

export default router;