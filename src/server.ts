import "reflect-metadata";

import express  from "express";
import { estoqueRoutes } from "./routes/estoque.routes";

import "./database"

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/estoque", estoqueRoutes);

app.listen(4000, () => console.log("Rodando servidor na porta 4000"))