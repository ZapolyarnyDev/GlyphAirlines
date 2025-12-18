import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.ts";
import {
    cancelMyBookingController,
    createBooking,
    getMyBookingByIdController,
    getMyBookingsController
} from "../controllers/booking.controller.ts";

const router = Router();

router.post("/", auth, createBooking);
router.get("/my", auth, getMyBookingsController);
router.get("/my/:id", auth, getMyBookingByIdController);
router.delete("/my/:id", auth, cancelMyBookingController);

export default router;
