export type Point = {
    id: string;
    address: string;
    latitude: number;
    longitude: number;
};
export type RouteResult = {
    points: Point[];
    algorithm: string;
};

export type OsrmResponse = {
    code : string;
    waypoints? : OsrmWaypoint[];
    routes? : OsrmRoute[];
}

export type OsrmWaypoint = {
    name: string;
    location: [number, number];
    distance: number;
}

export type OsrmRoute = {
    distance: number;
    duration: number;
    geometry: {
        type: "LineString";
        coordinates: [number, number][];
    };
}