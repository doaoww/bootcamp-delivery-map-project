import { TwoOptOptimizer } from "@/lib/routing";
import type { Point } from "@/types/point";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const points: Point[] = data.points;

        const optimizer = new TwoOptOptimizer();
        const route = optimizer.optimize(points);

        return Response.json(route);
    } catch (error) {
        if (error instanceof SyntaxError) {
            return Response.json({ error: "Не удалось прочитать точки" }, { status: 400 });
        }
        console.error(error);
        return Response.json({ error: "Не удалось построить маршрут" }, { status: 500 });
    }
}


