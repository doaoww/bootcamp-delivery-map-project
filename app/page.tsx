"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/SideBar";
import type { Point, RouteResult } from "@/types/point";

const DeliveryMap = dynamic(() => import("@/components/DeliveryMap"), { ssr: false });

async function request(url: string, body: object) {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    let data;
    try {
        data = await response.json();
    } catch {
        throw new Error("Что-то пошло не так");
    }
    if (!response.ok) {
        throw new Error(data?.error || "Что-то пошло не так");
    }
    return data;
}

export default function Home() {
    const [points, setPoints] = useState<Point[]>([]);
    const [route, setRoute] = useState<RouteResult | null>(null);
    const [error, setError] = useState("");

    function showError(error: unknown) {
        setError(error instanceof Error ? error.message : "Что-то пошло не так");
    }

    async function addAddress(address: string) {
        setError("");
        try {
            const point: Point = await request("/api/backend", { address });
            setPoints((previous) => [...previous, point]);
            setRoute(null);
            return true;
        } catch (error) {
            showError(error);
            return false;
        }
    }

    async function buildRoute() {
        if (points.length < 2) return;
        setError("");
        try {
            const route = await request("/api/route", { points });
            setRoute(route);
        } catch (error) {
            showError(error);
        }
    }

    return (
        <main className="container">
            <div className="sidebar-wrapper">
                <Sidebar
                    points={points}
                    addAddress={addAddress}
                    buildRoute={buildRoute}
                />
                {error && <div className="error-message">{error}</div>}
            </div>
            <div className="map">
                <DeliveryMap points={points} routePoints={route?.points ?? []} />
            </div>
        </main>
    );
}
