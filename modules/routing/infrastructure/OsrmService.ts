import {Point,OsrmResponse} from "../domain/route" ;

interface OsrmService {
    getRoute(points : Point[]) : Promise<Point[]>;
}

export class OsrmServiceV1 implements OsrmService {
    async getRoute(points : Point[]){
        const coordinates = points
            .map(p => `${p.longitude},${p.latitude}`)
            .join(';');

        const url =
            `https://router.project-osrm.org/route/v1/driving/${coordinates}` +
            `?overview=full&geometries=geojson`;

        const response = await fetch(url, {method: "GET"});

        if(!response.ok){
            throw new Error("OsrmService error");
        }

        const data : OsrmResponse = await response.json();

        return data.routes[0];
    }
}