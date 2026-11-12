"use client";

import AddressForm from "./AddressForm";
import PointPicker from "@/components/PointPicker";
import type { Point } from "@/types/point";
import type {SelectedPoint} from "@/types/point";

type Props = {
    points: Point[];
    addAddress: (address: string) => Promise<boolean>;
    addPoint: (latitude: number, longitude:number) => Promise<boolean>;
    buildRoute: () => Promise<void>;
    SelectedPoint: SelectedPoint | null;
    onStart: () => void;
    onClear: () => void;
};

export default function Sidebar({ points, addAddress,addPoint, buildRoute, SelectedPoint,onStart,onClear }: Props) {
    return (
        <aside className="sidebar">
            <h1>Карта</h1>

            <AddressForm addAddress={addAddress} />
            <PointPicker onStart={onStart} SelectedPoint={SelectedPoint} addPoint={addPoint} onClear={onClear}></PointPicker>

            <h3>Адресов: {points.length}</h3>

            {points.map((point, index) => (
                <div className="point" key={point.id}>
                    <h3>Точка {index + 1}</h3>
                    <p>Адрес: {point.address}</p>
                </div>
            ))}

            <button onClick={buildRoute} disabled={points.length < 2}>
                Построить маршрут
            </button>
        </aside>
    );
}
