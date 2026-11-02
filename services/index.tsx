import {HttpRequestMaker} from "@/services/HttpService";
import {PointHandlerV1} from "@/services/PointService";
import {RouteBuilderV1} from "@/services/RouteService";

export const RequestMaker = new HttpRequestMaker();
export const PointHandler = new PointHandlerV1();
export const RouteBuilder = new RouteBuilderV1();