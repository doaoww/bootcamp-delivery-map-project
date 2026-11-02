import type { Point } from "@/types/point";

interface RouteOptimizer{
    optimize(points: Point[]): {points: Point[] , algorithm: string};

}

export class TwoOptOptimizer implements RouteOptimizer {

     optimize(points: Point[]){
        if (points.length < 2) {
            throw new Error("минимум две точки");
        }

        const graph = points.map(a =>
            points.map(b => this.distance(a, b))
        );

        const startRoute = this.nearestNeighbor(graph);
        const endRoute = this.twoOpt(startRoute, graph);

        return {
            points: endRoute.map(i => points[i]),
            algorithm: "nearest-neighbor + 2-opt",
        };
    }

    distance(a: Point, b: Point) {
        const rad = (x: number) => x * Math.PI / 180;

        const dLat = rad(b.latitude - a.latitude);
        const dLon = rad(b.longitude - a.longitude);

        const h =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(rad(a.latitude)) *
            Math.cos(rad(b.latitude)) *
            Math.sin(dLon / 2) ** 2;

        return 2 * 6371 * Math.asin(Math.sqrt(Math.min(1, h)));
    }


    length(route: number[], graph: number[][]) {
        let total = 0;

        for (let i = 0; i < route.length - 1; i++) {
            const from = route[i];
            const to = route[i + 1];

            total += graph[from][to];
        }

        return total;
    }

    nearestNeighbor(graph: number[][]) {
        const route = [0];
        const visited = new Set([0]);

        while (route.length < graph.length) {
            const current = route[route.length - 1];
            let nearest = -1;

            for (let i = 0; i < graph.length; i++) {
                if (!visited.has(i) && (nearest === -1 || graph[current][i] < graph[current][nearest])) {
                    nearest = i;
                }
            }

            route.push(nearest);
            visited.add(nearest);
        }

        return route;
    }

    twoOpt(startRoute: number[], graph: number[][]) {
        let route = [...startRoute];
        let improved = true;

        while (improved) {
            improved = false;

            for (let i = 1; i < route.length - 1; i++) {
                for (let j = i + 1; j < route.length; j++) {

                    // Разворачиваем участок маршрута
                    const candidate = [
                        ...route.slice(0, i),
                        ...route.slice(i, j + 1).reverse(),
                        ...route.slice(j + 1),
                    ];

                    if (this.length(candidate, graph) < this.length(route, graph)) {
                        route = candidate;
                        improved = true;
                    }
                }
            }
        }

        return route;
    }


}

