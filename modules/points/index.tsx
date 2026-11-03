import { PointRepositoryV1 } from "@/modules/points/domain/PointRepository"
import {PointServiceV1} from "@/modules/points/application/PointService";


export const PointRepository = new PointRepositoryV1();
export const PointService = new PointServiceV1();