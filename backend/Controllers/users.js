import {db} from '../db.js';

export const getUsers = ( _, res) => {
    const q = "SELECT idusuario, nome, telefone, email FROM usuario";
    db.query(q, (err, data) =>{
        if (err) return res.json(err);
        return res.status(200).json(data);
         
    })
}
export const addUser = (req, res) => {
    const { nome, telefone, email } = req.body;
    
    if (!nome || !telefone || !email) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const q = "INSERT INTO usuario (nome, telefone, email) VALUES (?, ?, ?)";
    
    db.query(q, [nome, telefone, email], (err, result) => {
        if (err) {
            console.error("Erro ao adicionar usuário:", err); // Mostra o erro no console
            return res.status(500).json({ error: "Erro ao adicionar usuário" });
        }
        return res.status(201).json({ message: "Usuário adicionado com sucesso!" });
    });
};


export const deleteUser = (req, res) => {
    const { id } = req.params;
    
    if (!id) {
        return res.status(400).json({ error: "ID do usuário é obrigatório!" });
    }

    const q = "DELETE FROM usuario WHERE idusuario = ?";
    
    db.query(q, [id], (err, result) => {
        if (err) {
            console.error("Erro ao excluir usuário:", err);
            return res.status(500).json({ error: "Erro ao excluir usuário" });
        }
        return res.status(200).json({ message: "Usuário excluído com sucesso!" });
    });
};

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { nome, telefone, email } = req.body;

    if (!id || !nome || !telefone || !email) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const q = "UPDATE usuario SET nome = ?, telefone = ?, email = ? WHERE idusuario = ?";

    db.query(q, [nome, telefone, email, id], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar usuário:", err);
            return res.status(500).json({ error: "Erro ao atualizar usuário" });
        }
        return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    });
};
