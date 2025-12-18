import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.ts";
import { createBooking } from "../controllers/booking.controller.ts";

const router = Router();

router.post("/", auth, createBooking);

export default router;
