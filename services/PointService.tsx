import type {Point} from "@/types/point";
import {RequestMaker} from "@/services/index";


interface PointService {
    getAll() : Promise<Point[]>;
    addPointAddress(address: string): Promise<Point>;
    addPointCoordinates(latitude: number,longitude: number) : Promise<Point>;
}
export class PointServiceV1 implements PointService {
    async getAll(){
        return await RequestMaker.request("/api/v1/route/",{},'GET');
    }

    async addPointAddress(address: string) {
        const point= await RequestMaker.request(`/api/v1/geocoder?address=${encodeURIComponent(address)}`, { address },'GET');
        const result = await RequestMaker.request("/api/v1/route/points", { point_id : point.id },'POST');
        return result;
    }

    async addPointCoordinates(latitude: number,longitude: number) {
        const point = await RequestMaker.request(`/api/v1/geocoder?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}`, { latitude, longitude},'GET');
        const result = await RequestMaker.request("/api/v1/route/points", { point_id : point.id },'POST');
        return result;
    }
}
