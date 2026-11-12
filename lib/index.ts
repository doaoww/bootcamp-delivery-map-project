import {GeocodeBuilderV2} from "@/lib/geocoding/geocode";
import {TwoOptOptimizerService} from "@/lib/routing";

export const GeocodeBuilder = new GeocodeBuilderV2();
export const RouteOptimizer = new TwoOptOptimizerService();
