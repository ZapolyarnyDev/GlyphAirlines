import {Submittable} from "pg";

export interface User extends Submittable{
    id: number;
    email: string;
    password: string;
    role: "user" | "admin";
}
