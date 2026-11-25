import type {Point,RouteResult,OsrmRoute} from "@/types/point";
import {RequestMaker} from "@/services/index";


interface RouteService{
    buildRoute(points : Point[]) : Promise<RouteResult>;
    getRoutes(points : Point[]) : Promise<OsrmRoute>;
}
export class RouteServiceV1 implements RouteService{

     async buildRoute(points : Point[]) {
        const route = await RequestMaker.request("/api/v1/route/generate/", {points},'POST');
        return route;
    }

    async getRoutes(points : Point[]) {
        const route = await RequestMaker.request("/api/v1/route/driving/", {points},'POST');
        return route;
    }
}
