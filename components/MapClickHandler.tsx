"use client";

import { useMapEvents, Marker } from "react-leaflet";
import type { LatLng } from "leaflet";
import { useState } from "react";
import L from "leaflet";

type Props = {
    onSelect : (latitude: number, longitude: number) => void;
    isSelecting: boolean;
}

export default function MapClickHandler({onSelect, isSelecting} : Props) {
    const [position, setPosition] = useState<LatLng | null>(null);

    useMapEvents({
        click(e){
            if (!isSelecting) return;
            console.log("Клик по карте:", e.latlng.lat, e.latlng.lng);
            setPosition(e.latlng);
            onSelect(e.latlng.lat, e.latlng.lng);
        }
    });

    if(!position) return null;

    return isSelecting ? (
        <Marker
            position={position}
            icon={L.icon({
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
            })}
            draggable={isSelecting}
            eventHandlers={{
                dragend(e) {
                    const marker = e.target;
                    const point = marker.getLatLng();

                    setPosition(point);
                    onSelect(point.lat, point.lng);
                }
            }}
        />
    ) : null
}