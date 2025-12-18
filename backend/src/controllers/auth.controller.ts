import { Request, Response } from "express";
import { register, login } from "../services/auth.service.ts";
import { logout } from "../services/auth.service.ts";
import {ApiError} from "../errors/AppError.ts";

export async function registerUser(req: Request, res: Response): Promise<void> {
    const token = await register(req.body);
    res.status(201).json(token);
}

export async function loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.status(200).json(token);
}

export async function logoutUser(
    req: Request,
    res: Response
): Promise<void> {
    const header = req.headers.authorization;
    if (!header) throw new ApiError(401, "Unauthorized");

    const token = header.split(" ")[1];
    if (!token) throw new ApiError(401, "Unauthorized");

    await logout(token);
    res.status(204).send();
}
