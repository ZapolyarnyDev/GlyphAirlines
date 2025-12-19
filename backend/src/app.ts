import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import {ApiError} from "./errors/ApiError.ts";
import airportRoutes from "./routes/airport.routes.ts";
import flightRoutes from "./routes/flight.routes.ts";
import authRoutes from "./routes/auth.routes.ts";
import bookingRoutes from "./routes/booking.routes.ts";
import cors from 'cors'

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ message: "GlyphAirlines Backend API is running!" });
});

app.use("/api/v1/airports", airportRoutes);
app.use("/api/v1/flights", flightRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/bookings", bookingRoutes);

app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: "Resource not found" });
});

app.use(
    (
        err: Error,
        _req: Request,
        res: Response,
        _next: NextFunction
    ): void => {
        if (err instanceof ApiError) {
            res.status(err.statusCode).json({
                status: "error",
                message: err.message,
            });
            return;
        }

        console.error(err);

        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
