import { Router, type IRouter } from "express";
import healthRouter from "./health";
import categoriesRouter from "./categories";
import productsRouter from "./products";
import regionsRouter from "./regions";
import ordersRouter from "./orders";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);
router.use("/regions", regionsRouter);
router.use("/orders", ordersRouter);

export default router;
