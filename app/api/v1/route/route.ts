//возвращает все точки

import { RouteService } from "@/modules/routing";

export async function GET() {
    try {
        const result = await RouteService.getAll();
        return Response.json(result);
    } catch (error) {
        console.error("GET points:", error);

        return Response.json(
            { error: "Не удалось загрузить точки" },
            { status: 500 }
        );
    }
}