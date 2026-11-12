"use client";

import {useMapEvents} from "react-leaflet";

type Props = {
    onSelect : (latitude: number, longitude: number) => void;
    isSelecting: boolean;
}

export default function MapClickHandler({onSelect, isSelecting} : Props) {

    useMapEvents({
        click(e){
            if (!isSelecting) return;
            console.log("Клик по карте:", e.latlng.lat, e.latlng.lng);

            onSelect(e.latlng.lat, e.latlng.lng);
        }
    });

    return null;
}