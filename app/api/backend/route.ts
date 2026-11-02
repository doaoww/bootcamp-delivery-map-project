import pool from "@/lib/db";
import { geocodeAddress } from "@/lib/geocode";

export async function GET() {
    try {
        const result = await pool.query(
            `SELECT id, address, latitude, longitude
             FROM points ORDER BY id ASC`
        );

        return Response.json(result.rows);
    } catch (error) {
        console.error("GET points:", error);

        return Response.json(
            { error: "Не удалось загрузить точки" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const address = body?.address;

        if (
            typeof address !== "string" ||
            address.trim().length < 3 ||
            address.length > 300
        ) {
            return Response.json(
                { error: "Введите нормальный адрес" },
                { status: 400 }
            );
        }

        const text = address.trim();
        const coordinates = await geocodeAddress(text);

        if (!coordinates) {
            return Response.json(
                { error: "Адрес не найден" },
                { status: 404 }
            );
        }

        const result = await pool.query(
            `INSERT INTO points (address, latitude, longitude)
             VALUES ($1, $2, $3)
                 RETURNING id, address, latitude, longitude`,
            [text, coordinates.latitude, coordinates.longitude]
        );

        return Response.json(result.rows[0], { status: 201 });
    } catch (error) {
        return Response.json(
            { error: "Не удалось добавить точку" },
            { status: 500 }
        );
    }
}
