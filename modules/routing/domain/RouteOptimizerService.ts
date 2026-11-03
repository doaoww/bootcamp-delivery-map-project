import {RouteOptimizer} from "@/lib";
import {Point,RouteResult} from "./route";

interface RouteOptimizerService {
    optimize(points: Point[]): RouteResult;
}

export class RouteOptimizerServiceV1 implements RouteOptimizerService{
    optimize(points: Point[]){
        const route = RouteOptimizer.optimize(points);
        return route;
    }

}



