import pool from "@/lib/db";
import type {Point} from "./point.ts";

interface PointRepository {
    getAll(): Promise<Point[]>;
    putOne(address: string,
           latitude: number,
           longitude: number): Promise<Point>;
}

export class PointRepositoryV1 implements PointRepository {
    async getAll(){
        const result = await pool.query(
            `SELECT id, address, latitude, longitude
             FROM points ORDER BY id ASC`
        );

        return result.rows;
    }

    async putOne(address: string,
                 latitude: number,
                 longitude: number): Promise<Point> {

        const result = await pool.query(
            `INSERT INTO points (address, latitude, longitude)
             VALUES ($1, $2, $3)
                 RETURNING id, address, latitude, longitude`,
            [address, latitude ,longitude]
        );

        return result.rows[0];
    }
}