"use client";

import { useState } from "react";
import type {SelectedPoint} from "@/types/point";

type Props = {
    addAddress: (address: string) => Promise<boolean>;
    SelectedPoint: SelectedPoint | null;
    addPoint : (latitude:number, longitude:number) => Promise<boolean>;
    onClear: () => void;
};

export default function AddressForm({ addAddress, SelectedPoint,addPoint, onClear }: Props) {
    const [address, setAddress] = useState("");

    async function handleSubmit() {
        if (address) {
            const added = await addAddress(address.trim());
            if (added) setAddress("");
            return;
        }

        if(!SelectedPoint){
            return;
        }
        const success = await addPoint(SelectedPoint.latitude, SelectedPoint.longitude);

        if(success){
            onClear();
        }
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            handleSubmit().then(() => {});
        }} className="address-form">
            <input
                type="text"
                placeholder="Введите адрес"
                value={address}
                onChange={(e) => setAddress(e.target.value)}

            />

            <button type="submit" className="add-button" disabled={!SelectedPoint && !address} >
                +
            </button>

        </form>
    );
}
