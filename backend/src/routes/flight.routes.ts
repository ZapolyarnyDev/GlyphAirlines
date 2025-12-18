import { Router } from "express";
import { searchFlights } from "../controllers/flight.controller.ts";
import { auth } from "../middleware/auth.middleware.ts";

const router = Router();

router.get("/search", auth, searchFlights);

export default router;
