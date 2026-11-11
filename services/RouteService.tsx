import type {Point,RouteResult} from "@/types/point";
import {RequestMaker} from "@/services/index";


interface RouteBuilder{
    buildRoute(points : Point[]) : Promise<RouteResult>;
}
export class RouteBuilderV1 implements RouteBuilder{

     async buildRoute(points : Point[]) {
        const route = await RequestMaker.request("/api/v1/route/generate/", { points });

        return route;
    }
}
