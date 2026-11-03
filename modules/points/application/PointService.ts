//buisness logic
import {Point} from "../domain/point";
import {PointRepository} from "@/modules/points/";
import {GeocodeBuilder} from "@/lib/";

interface PointService {
    getAll(): Promise<Point[]>;
    putOne(address: string): Promise<Point>;
}

export class PointServiceV1 implements PointService {
    async getAll(){
        return await PointRepository.getAll();
    }

    async putOne(address: string){
        if (
            typeof address !== "string" ||
            address.trim().length < 3 ||
            address.length > 300
        ) {
            throw new Error("Введите нормальный адрес")
        }

        const text = address.trim();
        const coordinates = await GeocodeBuilder.resolve(text);

        if (!coordinates) {
            throw new Error("Адрес не найден");
        }
        const result = PointRepository.putOne(address, coordinates.latitude, coordinates.longitude );

        return result;
    }
}
