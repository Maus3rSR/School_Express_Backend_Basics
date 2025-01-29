import { Router } from "express";
import { addNewPotion, retrieveOnePotion, retrievePotions } from "./controller";

const router = Router();

router.get("/potions", retrievePotions);
router.get("/potions/:id", retrieveOnePotion);
router.post("/potions", addNewPotion);

export default router;
