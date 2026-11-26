"use client";

import dynamic from "next/dynamic";
import Sidebar from "@/components/SideBar";
import {useDelivery} from "@/hooks/useDelivery";

const DeliveryMap = dynamic(() => import("@/components/DeliveryMap"), { ssr: false });

export default  function Home(){
    const {
        points,
        routes,
        error,
        addAddress,
        addPoint,
        buildRoute,
        SelectedPoint ,
        handleStart,
        handleClear,
        isSelecting,
        handleSelect,
        deletePoint,
        isResolvingPoint,
        distanceKm,
        durationMin,
        durationHours,
        isRouting
    } = useDelivery();
    return (
        <main className="container">
            <div className="sidebar-wrapper">
                <Sidebar
                    points={points}
                    addAddress={addAddress}
                    addPoint={addPoint}
                    buildRoute={buildRoute}
                    SelectedPoint={SelectedPoint}
                    onStart={handleStart}
                    onClear={handleClear}
                    deletePoint={deletePoint}
                    isSelecting = {isSelecting}
                    isResolvingPoint = {isResolvingPoint}
                    distanceKm = {distanceKm}
                    durationMin = {durationMin}
                    durationHours = {durationHours}
                    isRouting={isRouting}
                />
                {error && <div className="error-message">{error}</div>}
            </div>
            <div className="map">
                <DeliveryMap points={points} routePoints={routes ?? {}} SelectedPoint={SelectedPoint} isSelecting={isSelecting} onSelect={handleSelect} />
            </div>
        </main>
    );
}




