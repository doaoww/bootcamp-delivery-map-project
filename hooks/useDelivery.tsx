import {useState} from "react";
import type {Point, RouteResult} from "@/types/point";
import {RequestMaker, RouteBuilder,PointHandler} from "@/services/index";


export function useDelivery() {
    const [points, setPoints] = useState<Point[]>([]);
    const [route, setRoute] = useState<RouteResult | null>(null);
    const [error, setError] = useState("");

    function showError(error: unknown) {
        setError(error instanceof Error ? error.message : "Что-то пошло не так");
    }

    async function addAddress(address: string) {
        setError("");
        try {
            const point = await PointHandler.addAddress(address);
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
            const result =  await RouteBuilder.buildRoute(points);
            setRoute(result);
        } catch (error) {
            showError(error);
        }
    }

    return {
        points,
        route,
        error,
        addAddress,
        buildRoute
    };
}



