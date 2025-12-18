import {Submittable} from "pg";

export interface Profile extends Submittable{
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    middle_name: string | null;
    birthday: string;
}
