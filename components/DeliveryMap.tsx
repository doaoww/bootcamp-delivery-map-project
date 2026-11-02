"use client";

import {MapContainer, TileLayer, CircleMarker, Tooltip, Polyline} from "react-leaflet";
import type { Point } from "@/types/point";

type Props = {
    points: Point[];
    routePoints: Point[];
};

export default function DeliveryMap({ points, routePoints }: Props) {
    const routeCoordinates: [number, number][] = routePoints.map(point => [
        point.latitude,
        point.longitude,
    ]);

    return (
        <MapContainer
            center={[43.2371, 76.9456]}
            zoom={12}
        >
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />

            {points.map((point, index) => (
                <CircleMarker
                    key={point.id}
                    center={[point.latitude, point.longitude]}
                    radius={13}
                >
                    <Tooltip
                        permanent
                        direction="center"
                        className="point-number"
                    >
                        {index + 1}
                    </Tooltip>
                </CircleMarker>
            ))}

            {routeCoordinates.length >= 2 && (
                <Polyline
                    positions={routeCoordinates}
                />
            )}
        </MapContainer>
    );
}
