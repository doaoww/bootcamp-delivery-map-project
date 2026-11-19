import type {Point} from "@/types/point";
import {RequestMaker} from "@/services/index";


interface PointService {
    getAll() : Promise<Point[]>;
    addPointAddress(address: string): Promise<Point>;
    resolveCoordinates(latitude: number, longitude: number): Promise<Point>
    addPointToRoute(point: Point): Promise<Point>;
}
export class PointServiceV1 implements PointService {
    async getAll(){
        return await RequestMaker.request("/api/v1/route/",{},'GET');
    }

    async addPointAddress(address: string) {
        const point= await RequestMaker.request(`/api/v1/geocoder?address=${encodeURIComponent(address)}`, { address },'GET');
        return await RequestMaker.request("/api/v1/route/points", { point_id : point.id },'POST');
    }

    async resolveCoordinates(latitude: number, longitude: number) {
        return await RequestMaker.request(
            `/api/v1/geocoder?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}`,
            {}, "GET"
        );
    }

    async addPointToRoute(point: Point) {
        return await RequestMaker.request("/api/v1/route/points", { point_id : point.id },'POST');
    }


    async deletePoint(pointId : string){
        const point = await RequestMaker.request(`/api/v1/route/points/${pointId}`,{pointId : pointId},'DELETE');
        return point;
    }
}
