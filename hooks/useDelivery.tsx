import {useEffect, useState} from "react";
import type {Point, RouteResult} from "@/types/point";
import { RouteService,PointService} from "@/services/index";


export function useDelivery() {
    const [points, setPoints] = useState<Point[]>([]);
    const [route, setRoute] = useState<RouteResult | null>(null);
    const [error, setError] = useState("");
    const [SelectedPoint, setSelectedPoint] =
        useState<Point | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [isResolvingPoint, setIsResolvingPoint] = useState(false);

    const [routes , setRoutes] = useState<[number, number][]>([]);

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

    async function handleSelect(latitude: number, longitude: number) {
        console.log("Координаты получены:", latitude, longitude);
        setError("");
        setSelectedPoint(null);
        setIsResolvingPoint(true)
        try{
            const point = await PointService.resolveCoordinates(latitude, longitude);
            setSelectedPoint(point);
        }catch(error){
            showError(error);
        }finally {
            setIsResolvingPoint(false);
        }

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

    async function addPoint(point : Point) {
        console.log("addPoint");
        setError("");
        try {
            const routePoint = await PointService.addPointToRoute(point);
            setPoints((previous) => [...previous, routePoint]);
            setRoute(null);
            return true;
        } catch (error) {
            showError(error);
            return false;
        }
    }

    async function deletePoint(pointId : string){
        console.log("deletePoint");
        setError("");
        try {
            const point = await PointService.deletePoint(pointId);
            setPoints(prev =>
                prev.filter(point => point.id !== pointId)
            );
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
            await getRoutes(result.points)
        } catch (error) {
            showError(error);
        }
    }

    async function getRoutes(route : Point[]) {
        if (points.length < 2) return;
        setError("");
        const result =  await RouteService.getRoutes(route);
        setRoutes(result.geometry.coordinates);

    }

    return {
        points,
        routes,
        error,
        addAddress,
        addPoint,
        buildRoute,
        SelectedPoint,
        handleStart,
        handleClear,
        isSelecting,
        handleSelect,
        deletePoint,
        isResolvingPoint
    };
}



