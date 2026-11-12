import {RouteOptimizer} from "@/lib";
import {Point, RouteResult} from "@/modules/routing/domain/route";
import {RouteRepository} from "@/modules/routing";

interface RouteService {
    optimize(points: Point[]): RouteResult;
    getAll() : Promise<Point[]>;
    putPoint(point_id : string) : Promise<Point>;
    deletePoint(point_id : string) : Promise<Point>
}

export class RouteServiceV1 implements RouteService{
    optimize(points: Point[]){
        return RouteOptimizer.optimize(points);
    }

    async getAll() {
        return RouteRepository.getAll();
    }

    async putPoint(point_id : string) {
        return RouteRepository.putPoint(point_id);
    }
    async deletePoint(point_id : string) {
        return RouteRepository.deletePoint(point_id)
    }

}



