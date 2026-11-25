"use client";

import AddressForm from "./AddressForm";
import PointPicker from "@/components/PointPicker";
import type { Point } from "@/types/point";

type Props = {
    points: Point[];
    addAddress: (address: string) => Promise<boolean>;
    addPoint: (point : Point) => Promise<boolean>;
    buildRoute: () => Promise<void>;
    SelectedPoint: Point | null;
    onStart: () => void;
    onClear: () => void;
    deletePoint: (pointId: string) => Promise<boolean>;
    isSelecting: boolean;
    isResolvingPoint : boolean;
};

export default function Sidebar({ points, addAddress,addPoint, buildRoute, SelectedPoint,onStart,onClear, deletePoint,isSelecting,isResolvingPoint }: Props) {
    return (
        <aside className="sidebar">
            <h1>Карта</h1>

            <div className="point-entry">
                <AddressForm addAddress={addAddress} SelectedPoint={SelectedPoint} addPoint={addPoint} onClear={onClear} isResolvingPoint={isResolvingPoint}/>
                <PointPicker onStart={onStart} isSelecting={isSelecting} />
            </div>

            {isSelecting && (
                <div className="point-picker-info">
                    <h4>Нажмите на карту, чтобы выбрать точку</h4>

                    {isResolvingPoint && <p>Определяем адрес…</p>}

                    {SelectedPoint && (
                        <p>
                            Выбранный адрес: <strong>{SelectedPoint.address}</strong>
                        </p>
                    )}
                </div>
            )}

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
