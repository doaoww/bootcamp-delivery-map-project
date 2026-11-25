"use client";

type Props = {
    onStart: () => void;
    isSelecting: boolean;
}

export default function PointPicker({onStart,isSelecting} : Props) {

    return (
        <div className="point-picker">
            <button
                type="button"
                className="map-pick-button"
                aria-label="Выбрать точку на карте"
                title="Выбрать точку на карте"
                onClick={onStart}
            >
                <span className="map-pin-icon" aria-hidden="true" />
            </button>
        </div>
    )
}
