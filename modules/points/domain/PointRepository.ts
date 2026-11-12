import pool from "@/lib/db";
import type {Point} from "./point.ts";

interface PointRepository {
    putPoint(address : string, latitude:number, longitude:number): Promise<Point>;
    findAddress(address : string): Promise<Point>;
    findCoordinates(latitude:number, longitude:number): Promise<Point>
}

export class PointRepositoryV1 implements PointRepository {

    async putPoint(address : string, latitude:number, longitude:number): Promise<Point> {
        const result = await pool.query(
            `INSERT INTO points (address, latitude, longitude)
             VALUES ($1, $2, $3)
                 RETURNING id, address, latitude, longitude`,
            [address, latitude ,longitude]
        );
        return result.rows[0] ;
    }

    async findAddress(address : string): Promise<Point> {
        const result = await pool.query(
            'SELECT id, address, latitude, longitude FROM points WHERE address = $1 LIMIT 1',[address]
        )

        return result.rows[0] ?? null;
    }

    async findCoordinates(latitude:number, longitude:number): Promise<Point> {
        const result = await pool.query(
            'SELECT id, address, latitude, longitude FROM points WHERE latitude = $1 AND longitude = $2 LIMIT 1',[latitude,longitude]
        )

        return result.rows[0] ?? null;
    }

}