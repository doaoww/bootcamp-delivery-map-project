interface AddressNormalizer {
    normalizeAddress(address: string): string;
}

export class AddressNormalizerV1 implements AddressNormalizer {
    normalizeAddress(address:string){
        const listProcpects = ["абая" , "абылай хана", "аль-фараби", "алатау","алтынсарина","гагарина","достык","жибек жолы","назарбаева","райымбека","рыскулова","сейфуллина","суюнбая"]

        const parts = address.split(" ");
        const house = parts.pop();
        const street = parts.join(" ").toLowerCase().replace(/аль фараби|альфараби/g, "аль-фараби");

        if(listProcpects.includes(street) ){
            address = `Казахстан, Алматы, проспект ${street}, ${house}`;
        }else {
            address = `Казахстан, Алматы, улица ${street}, ${house}`;
        }
        return address;
    }
}