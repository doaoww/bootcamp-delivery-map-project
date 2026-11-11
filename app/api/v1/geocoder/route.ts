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

async function GET(request: Request)  {
    const {searchParams} = new URL(request.url);

    const address = searchParams.get('address');
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');

    if(address){
        const result = PointService.checkAddress(address)
        return result;

    }else if(latitude!=null && longitude!=null){
        const lat = Number(latitude);
        const lon = Number(longitude);

        const result = PointService.checkCoordinates(lat,lon);
        return result;
    }
}