"use client";

import { useState } from "react";
import type {Point} from "@/types/point";

type Props = {
    addAddress: (address: string) => Promise<boolean>;
    SelectedPoint: Point | null;
    addPoint : (point : Point) => Promise<boolean>;
    onClear: () => void;
    isResolvingPoint : boolean;
};

export default function AddressForm({ addAddress, SelectedPoint,addPoint, onClear,isResolvingPoint }: Props) {
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
        const success = await addPoint(SelectedPoint);

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
