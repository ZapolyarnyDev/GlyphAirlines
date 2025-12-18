import { Router } from "express";
import {
    getAirports,
    getAirportByIdentifier,
} from "../controllers/airport.controller.ts";

const router = Router();

router.get("/", getAirports);
router.get("/:identifier", getAirportByIdentifier);

export default router;
