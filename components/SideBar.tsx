"use client";

import AddressForm from "./AddressForm";
import type { Point } from "@/types/point";

type Props = {
    points: Point[];
    addAddress: (address: string) => Promise<boolean>;
    buildRoute: () => Promise<void>;
};

export default function Sidebar({ points, addAddress, buildRoute }: Props) {
    return (
        <aside className="sidebar">
            <h1>Карта</h1>

            <AddressForm addAddress={addAddress} />

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
