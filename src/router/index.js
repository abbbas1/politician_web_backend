import { Router } from "express";
import MemberRouter from "./MemberRouter/MemberRoute.js";
import ConstituencyRouter from "./ConstituencyRouter/ConstituencyRoute.js";
import PollingStationRouter from "./ConstituencyRouter/PollingStationRoute.js";
import AdminRouter from "./AdminRouter/AdminRoute.js";
import EventsRouter from "./EventsRouter/EventsRoute.js";
import NewsRouter from "./News/NewsRouter.js";

const allRoutes = Router();

allRoutes.use("/admin", AdminRouter);
allRoutes.use("/member", MemberRouter);
allRoutes.use("/constituency", ConstituencyRouter);
allRoutes.use("/pollingStation", PollingStationRouter);
allRoutes.use("/event", EventsRouter);
allRoutes.use("/news", NewsRouter);


export default allRoutes;
