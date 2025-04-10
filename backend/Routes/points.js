import express from "express";


import { getPoints, addPoint, deletePoint, updatePoint } from "../Controllers/points.js";

const router = express.Router();
router.get("/", getPoints);
router.post("/add", addPoint); // Nova rota para adicionar usuários
router.delete("/delete/:id", deletePoint); // Nova rota para excluir usuário
router.put("/update/:id", updatePoint); // Rota para atualizar usuário

export default router;

