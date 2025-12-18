import { Router } from "express";
import {
    getAirports,
    getAirportByIdentifier,
} from "../controllers/airport.controller.ts";
import { auth } from "../middleware/auth.middleware.ts";

const router = Router();

router.get("/", auth, getAirports);
router.get("/:identifier", auth, getAirportByIdentifier);

export default router;
