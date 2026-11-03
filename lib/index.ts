import {GeocodeBuilderV1} from "@/lib/geocode";
import {TwoOptOptimizer} from "@/lib/routing";

export const GeocodeBuilder = new GeocodeBuilderV1();
export const RouteOptimizer = new TwoOptOptimizer();