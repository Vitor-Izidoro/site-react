import express from "express";


import { getUsers, addUser, deleteUser, updateUser } from "../Controllers/users.js";

const router = express.Router();
router.get("/", getUsers);
router.post("/add", addUser); // Nova rota para adicionar usuários
router.delete("/delete/:id", deleteUser); // Nova rota para excluir usuário
router.put("/update/:id", updateUser); // Rota para atualizar usuário

export default router;

