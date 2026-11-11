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
        return result.rows[0];
    }

    async findAddress(address : string): Promise<Point> {
        const result = await pool.query(
            'SELECT EXISTS (SELECT 1 FROM points WHERE address=$1) as exists',[address]
        )

        return result.rows[0].exists;
    }

    async findCoordinates(latitude:number, longitude:number): Promise<Point> {
        const result = await pool.query(
            'SELECT EXISTS (SELECT 1 FROM points WHERE latitude=$1,longitude=$2 ) as exists',[latitude,longitude]
        )

        return result.rows[0].exists;
    }

}