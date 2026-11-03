import {RouteRepository} from "@/modules/routing/";
import {Point , RouteResult} from "../domain/route";
import {RouteOptimizer} from "@/lib";

interface RouteService {
    optimize(points: Point[]): RouteResult;
}

export class RouteServiceV1 implements RouteService{
    optimize(points: Point[]){
        const route = RouteOptimizer.optimize(points);
        return route;
    }
}