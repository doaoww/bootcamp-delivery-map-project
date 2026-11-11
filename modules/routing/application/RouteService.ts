import {RouteOptimizer} from "@/lib";
import {Point, RouteResult} from "@/modules/routing/domain/route";
import {RouteRepository} from "@/modules/routing";

interface RouteService {
    optimize(points: Point[]): RouteResult;
}

export class RouteServiceV1 implements RouteService{
    optimize(points: Point[]){
        return RouteOptimizer.optimize(points);
    }

    async getAll() {
        return await RouteRepository.getAll();
    }

    async putPoint(point : Point) {
        const point_id = point.id;
        return RouteRepository.putPoint(point_id);
    }
    async deletePoint(point_id : string) {
        return RouteRepository.deletePoint(point_id)
    }

}



