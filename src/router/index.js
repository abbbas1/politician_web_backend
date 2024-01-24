import { Router } from "express";
import MemberRouter from "./MemberRouter/MemberRoute.js";
import ConstituencyRouter from "./ConstituencyRouter/ConstituencyRoute.js";
import PollingStationRouter from "./ConstituencyRouter/PollingStationRoute.js";
import AdminRouter from "./AdminRouter/AdminRoute.js";
import EventsRouter from "./EventsRouter/EventsRoute.js";
import NewsRouter from "./News/NewsRouter.js";
import SocialActivityRouter from "./SocialActivityRouter/SocialActivityRoute.js";

const allRoutes = Router();

allRoutes.use("/admin", AdminRouter);
allRoutes.use("/member", MemberRouter);
allRoutes.use("/constituency", ConstituencyRouter);
allRoutes.use("/pollingStation", PollingStationRouter);
allRoutes.use("/events", EventsRouter);
allRoutes.use("/news", NewsRouter);
allRoutes.use("/socialActivity", SocialActivityRouter);


export default allRoutes;
