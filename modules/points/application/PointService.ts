//buisness logic
import {Point} from "../domain/point";
import {PointRepository} from "@/modules/points/";
import {GeocodeBuilder} from "@/lib/";

interface PointService {
    checkAddress(address: string): Promise<Point>;
    checkCoordinates(latitude:number,longitude:number) : Promise<Point>;
}

export class PointServiceV1 implements PointService {

    async checkAddress(address: string): Promise<Point> { //проверить есть ли эта точка в табл поинтс если да то вернуть
        //если нет то putPoint и GeocodeBuilder
        address = address.trim();
        const existing = await PointRepository.findAddress(address);
        if(existing){
            return existing;
        }

        const coordinates = await GeocodeBuilder.resolve(address);

        if(!coordinates){
            throw new Error(`Could not find address`);
        }

        return await PointRepository.putPoint(address, coordinates.latitude, coordinates.longitude)

    }

    async checkCoordinates(latitude:number,longitude:number) {
        const existing = await PointRepository.findCoordinates(latitude,longitude);
        if(existing){
            return existing;
        }

        const address = await GeocodeBuilder.reverse(latitude,longitude);

        if(!address){
            throw new Error(`Could not find coordinates`);
        }

        return await PointRepository.putPoint(address, latitude, longitude)
    }

}
