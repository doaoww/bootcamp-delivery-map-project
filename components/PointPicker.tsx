"use client";

import type {SelectedPoint} from "@/types/point";

type Props = {
    onStart: () => void;
    SelectedPoint: SelectedPoint | null;
    addPoint : (latitude:number, longitude:number) => Promise<boolean>;
    onClear: () => void;

}

export default function PointPicker({onStart,SelectedPoint, addPoint,onClear } : Props) {
    async function handleSubmit() {
        console.log("submiting")
        if(!SelectedPoint){
            return;
        }
        const success = await addPoint(SelectedPoint.latitude, SelectedPoint.longitude);

        if(success){
            onClear();
        }
    }

    return (
        <div>
            <button onClick={onStart}>Выбрать точку на карте</button>

            <button disabled={!SelectedPoint} onClick = {handleSubmit}>Подтвердить</button>
        </div>
    )
}