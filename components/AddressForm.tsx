"use client";

import { useState } from "react";

type Props = {
    addAddress: (address: string) => Promise<boolean>;
};

export default function AddressForm({ addAddress }: Props) {
    const [address, setAddress] = useState("");

    async function handleSubmit() {
        if (!address.trim()) return;

        const added = await addAddress(address.trim());
        if (added) setAddress("");
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            handleSubmit().then(() => {});
        }}>
            <input
                type="text"
                placeholder="Введите адрес"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
            />

            <button type="submit">
                Добавить адрес
            </button>
        </form>
    );
}
