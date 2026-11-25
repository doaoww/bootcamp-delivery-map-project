
import {RouteServiceV1} from "@/modules/routing/application/RouteService";
import {RouteRepositoryV1} from '@/modules/routing/domain/RouteRepository';
import { OsrmServiceV1 } from "@/modules/routing/infrastructure/OsrmService";

export const RouteService = new RouteServiceV1();
export const RouteRepository = new RouteRepositoryV1();
export const OsrmService = new OsrmServiceV1();