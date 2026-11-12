import {HttpRequestMaker} from "@/services/HttpService";
import {PointServiceV1} from "@/services/PointService";
import {RouteServiceV1} from "@/services/RouteService";

export const RequestMaker = new HttpRequestMaker();
export const PointService = new PointServiceV1();
export const RouteService = new RouteServiceV1();