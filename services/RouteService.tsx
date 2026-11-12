import type {Point,RouteResult} from "@/types/point";
import {RequestMaker} from "@/services/index";


interface RouteService{
    buildRoute(points : Point[]) : Promise<RouteResult>;
}
export class RouteServiceV1 implements RouteService{

     async buildRoute(points : Point[]) {
        const route = await RequestMaker.request("/api/v1/route/generate/", { points},'POST');
        return route;
    }
}
