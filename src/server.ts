import "reflect-metadata";
import express  from "express";
import "./database"
import { router } from "./routes";


const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router);

app.listen(4000, () => console.log("Rodando servidor na porta 4000"))

export { app }