import {RouteOptimizer} from "@/lib";
import {Point, RouteResult} from "@/modules/routing/domain/route";

interface RouteOptimizerService {
    optimize(points: Point[]): RouteResult;
}

export class RouteOptimizerServiceV1 implements RouteOptimizerService{
    optimize(points: Point[]){
        return RouteOptimizer.optimize(points);
    }

}



