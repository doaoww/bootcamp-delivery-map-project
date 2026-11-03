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