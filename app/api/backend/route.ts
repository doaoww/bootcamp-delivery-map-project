import pool from "@/lib/db";
import { PointService } from "@/modules/points";

export async function GET() {
    try {
        const result = await PointService.getAll();
        return Response.json(result);
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

        const result = await PointService.putOne(address);

        return Response.json(result, { status: 201 });
    } catch (error) {
        return Response.json(
            { error: "Не удалось добавить точку" },
            { status: 500 }
        );
    }
}