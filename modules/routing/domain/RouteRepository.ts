import pool from "@/lib/db";
import type {Point} from "./route.ts";

interface RouteRepository {
    getAll(): Promise<Point[]>;
    putPoint(point : Point): Promise<Point>;
}

export class RouteRepositoryV1 implements RouteRepository {
    async getAll(){
        const result = await pool.query(
            `
            SELECT p.id, p.address,p.latitude,p.longitude 
            from routes r join points p on r.point_id = p.id
            order by r.id ASC`
        );

        return result.rows;
    }

    async putPoint(pointId : string): Promise<Point> {
        const result = await pool.query(
            `
            WITH inserted as (INSERT INTO routes (point_id)
            VALUES ($1)
            RETURNING point_id)
            SELECT p.id, p.address, p.latitude, p.longitude 
            FROM inserted i join points p on i.point_id = p.id
            `, [pointId]
        );

        return result.rows[0];
    }

    async deletePoint(pointId : string): Promise<Point> {
        const result = await pool.query(
            'DELETE FROM routes WHERE point.point_id = p.id',
        )
        return result.rows[0];
    }

}