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
    deletePoint: (pointId: string) => Promise<void>;
};

export default function Sidebar({ points, addAddress,addPoint, buildRoute, SelectedPoint,onStart,onClear, deletePoint }: Props) {
    return (
        <aside className="sidebar">
            <h1>Карта</h1>

            <div className="point-entry">
                <AddressForm addAddress={addAddress} />
                <PointPicker onStart={onStart} SelectedPoint={SelectedPoint} addPoint={addPoint} onClear={onClear} />
            </div>

            <h3>Адресов: {points.length}</h3>

            {points.map((point, index) => (
                <div className="point" key={point.id}>
                    <div className="point-details">
                        <h3>Точка {index + 1}</h3>
                        <p>Адрес: {point.address}</p>
                    </div>
                    <button
                        type="button"
                        className="point-delete-button"
                        aria-label={`Удалить точку ${index + 1}`}
                        title="Удалить точку"
                        onClick={() => deletePoint(point.id)}
                    >
                        <span className="trash-icon" aria-hidden="true" />
                    </button>
                </div>
            ))}

            <button onClick={buildRoute} disabled={points.length < 2}>
                Построить маршрут
            </button>
        </aside>
    );
}
