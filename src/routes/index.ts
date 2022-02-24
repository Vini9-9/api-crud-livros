import { Router } from 'express';
import { estoqueRoutes } from "./estoque.routes";

const router = Router();

router.use("/estoque", estoqueRoutes);

export { router }