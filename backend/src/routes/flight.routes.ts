import { Router } from "express";
import { searchFlights } from "../controllers/flight.controller.ts";

const router = Router();

router.get("/search", searchFlights);

export default router;
