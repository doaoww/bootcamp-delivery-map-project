//ищет адрес и возвращает координаты
//GET        /api/v1/geocoder?address=Абая 111
//GET        /api/v1/geocoder?lat=43.23&lon=76.89

//{
//   "id": "uuid",
//   "fullAddress": "Алматы, проспект Абая, 111",
//   "lat": 43.23,
//   "lon": 76.89
// }

import { PointService} from "@/modules/points";

export async function GET(request: Request)  {
    const {searchParams} = new URL(request.url);

    const address = searchParams.get('address');
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');

    if(address){
        const result = await PointService.checkAddress(address);
        return Response.json(result);

    }else if(latitude!=null && longitude!=null){
        const lat = Number(latitude);
        const lon = Number(longitude);

        const result = await PointService.checkCoordinates(lat, lon);
        return Response.json(result);
    }

    return Response.json(
        { error: "Address or coordinates required" },
        { status: 400 }
    );

}