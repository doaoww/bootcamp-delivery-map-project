import {RouteOptimizer} from "@/lib";
import {Point,RouteResult} from "./route";

interface RouteRepository{
    optimize(points: Point[]): RouteResult;
}

export class RouteRepositoryV1 implements RouteRepository{
    optimize(points: Point[]){
        const route = RouteOptimizer.optimize(points);
        return route;
    }

}



