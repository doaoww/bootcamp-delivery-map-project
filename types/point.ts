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

export type SelectedPoint = {
    latitude: number;
    longitude: number;
};
