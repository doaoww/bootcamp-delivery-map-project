//добавляет точку
//POST        /api/v1/route/points

import {RouteService} from '@/modules/routing'

export async function POST(request: Request) {
    try {
        const body = await request.json(); //point
        let result;

        if(typeof body.address === "string") {
            result = await RouteService.putPoint(body.point);
        }
        return Response.json(result, { status: 201 });
    } catch (error) {
        console.error("POST points error:", error);
        return Response.json(
            { error: "Не удалось добавить точку, api/v1/route/points" },
            { status: 500 }
        );
    }
}