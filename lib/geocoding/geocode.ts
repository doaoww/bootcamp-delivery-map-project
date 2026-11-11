import {AddressNormalizer} from "./";

type Coordinates = {
    latitude: number;
    longitude: number;
};

interface GeocodeBuilder{
    resolve(address: string): Promise<Coordinates | null>;
    reverse(latitude:number,longitude:number) : Promise<string | null>;
}

export class GeocodeBuilderV2 implements GeocodeBuilder{

    async resolve(address: string): Promise<Coordinates | null> {
        address = AddressNormalizer.normalizeAddress(address);
        const url = new URL("https://nominatim.openstreetmap.org/search");
        url.searchParams.set("q", address);
        url.searchParams.set("format", "json");
        url.searchParams.set("limit", "1");

        const response = await fetch(url, {
            headers: { "User-Agent": "DeliveryApp/1.0 (contact: dilaravahitova215@gmail.com)" }
            }
        );

        if (!response.ok) {
            throw new Error("nominatim error"+ response.statusText);
        }
        const data = await response.json();

        if(data.length === 0){
            return null;
        }

        return {
            latitude: Number(data[0].lat),
            longitude: Number(data[0].lon),
        };
    }

    async reverse(latitude:number,longitude:number): Promise<string | null>{

        const url = new URL("https://nominatim.openstreetmap.org/search");
        url.searchParams.set("lat", String(latitude));
        url.searchParams.set("lon", String(longitude));
        url.searchParams.set("format", "json");
        url.searchParams.set("limit", "1");

        const response = await fetch(url, {
                headers: { "User-Agent": "DeliveryApp/1.0 (contact: dilaravahitova215@gmail.com)" }
            }
        );

        if (!response.ok) {
            throw new Error("nominatim error"+ response.statusText);
        }
        const data = await response.json();

        if(!data || data.error){
            return null;
        }

        return data.display_name ?? null;

    }
}
