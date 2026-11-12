import {useEffect, useState} from "react";
import type {Point, RouteResult, SelectedPoint} from "@/types/point";
import { RouteService,PointService} from "@/services/index";


export function useDelivery() {
    const [points, setPoints] = useState<Point[]>([]);
    const [route, setRoute] = useState<RouteResult | null>(null);
    const [error, setError] = useState("");
    const [SelectedPoint, setSelectedPoint] =
        useState<SelectedPoint | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);

    useEffect(() => {
        async function loadPoints() {
            try {
                const data = await PointService.getAll();
                setPoints(data);
            } catch (error) {
                console.error("Ошибка загрузки точек:", error);
            }
        }

        loadPoints();
    }, []);

    function handleSelect(latitude: number, longitude: number) {
        console.log("Координаты получены:", latitude, longitude);
        setSelectedPoint({ latitude, longitude });
    }

    function handleStart() {
        console.log("Режим выбора включён");
        setSelectedPoint(null);
        setIsSelecting(true);
    }

    function handleClear() {
        setSelectedPoint(null);
        setIsSelecting(false);
    }


    function showError(error: unknown) {
        setError(error instanceof Error ? error.message : "Что-то пошло не так");
    }

    async function addAddress(address: string) {
        setError("");
        try {
            const point = await PointService.addPointAddress(address);
            setPoints((previous) => [...previous, point]);
            setRoute(null);
            return true;
        } catch (error) {
            showError(error);
            return false;
        }
    }

    async function addPoint(latitude: number, longitude: number) {
        console.log("addPoint");
        setError("");
        try {
            const point = await PointService.addPointCoordinates(latitude,longitude);
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
            const result =  await RouteService.buildRoute(points);
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
        addPoint,
        buildRoute,
        SelectedPoint,
        handleStart,
        handleClear,
        isSelecting,
        handleSelect,
    };
}



