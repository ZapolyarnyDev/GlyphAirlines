import {Pool, Submittable} from 'pg'

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

const query = <T extends Submittable>(text: string, params?: any[]) => {
    return pool.query<T>(text, params);
};

export const db =  {
    query<T extends Submittable>(text: string, params?: any[]) {
        return query<T>(text, params);
    }
}