"use client";


import dynamic from "next/dynamic";
import Sidebar from "@/components/SideBar";
import {useDelivery} from "@/hooks/useDelivery";

const DeliveryMap = dynamic(() => import("@/components/DeliveryMap"), { ssr: false });

export default  function Home(){
    const {
        points,
        route,
        error,
        addAddress,
        buildRoute
    } = useDelivery();
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




