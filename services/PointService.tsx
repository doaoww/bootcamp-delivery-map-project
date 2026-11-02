import type {Point} from "@/types/point";
import {RequestMaker} from "@/services/index";


interface PointHandler {
    addAddress(address: string): Promise<Point>;
}
export class PointHandlerV1 implements PointHandler {

     async addAddress(address: string) {
        const point: Point = await RequestMaker.request("/api/backend", { address });

        return point;
    }
}



