import {RouteOptimizerService} from "@/modules/routing/";
import {Point , RouteResult} from "../domain/route";

interface RouteService {
    optimize(points: Point[]): RouteResult;
}

export class RouteServiceV1 implements RouteService{
    optimize(points: Point[]){
        const route = RouteOptimizerService.optimize(points);
        return route;
    }
}