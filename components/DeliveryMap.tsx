"use client";

import {MapContainer, TileLayer, CircleMarker, Tooltip, Polyline} from "react-leaflet";
import type { Point , OsrmRoute } from "@/types/point";
import MapClickHandler from "./MapClickHandler";

type Props = {
    points: Point[];
    routePoints: OsrmRoute;
    SelectedPoint: Point | null;
    isSelecting: boolean;
    onSelect(latitude: number, longitude: number): void;
};

export default function DeliveryMap({ points, routePoints, SelectedPoint ,isSelecting, onSelect }: Props) {

    const routeCoordinates = routePoints.map(
        ([lon, lat]) => [lat, lon] as [number, number]
    ) ?? [];

    return (
        <MapContainer
            center={[43.2371, 76.9456]}
            zoom={12}
        >
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />

            <MapClickHandler onSelect={onSelect} isSelecting={ isSelecting}></MapClickHandler>

            {SelectedPoint && (
                <CircleMarker
                    center={[
                        SelectedPoint.latitude,
                        SelectedPoint.longitude
                    ]}
                    radius={8}
                    color="red"
                />
            )}

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
