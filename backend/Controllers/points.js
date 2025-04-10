import {db} from '../db.js';

export const getPoints = ( _, res) => {
    const q = "SELECT id, ponto, historia, visitantes, cidade, tipo FROM turismo";
    db.query(q, (err, data) =>{
        if (err) return res.json(err);
        return res.status(200).json(data);
         
    })
}
export const addPoint = (req, res) => {
    const { ponto, historia, visitantes, cidade, tipo } = req.body;
    
    if (!ponto || !historia || !visitantes || !cidade || !tipo) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const q = "INSERT INTO turismo (ponto, historia, visitantes, cidade, tipo) VALUES (?, ?, ?, ?, ?)";
    
    db.query(q, [ponto, historia, visitantes, cidade, tipo], (err, result) => {
        if (err) {
            console.error("Erro ao adicionar ponto turistico: ", err); // Mostra o erro no console
            return res.status(500).json({ error: "Erro ao adicionar ponto turistico" });
        }
        return res.status(201).json({ message: "ponto turistico adicionado com sucesso!" });
    });
};


export const deletePoint = (req, res) => {
    const { id } = req.params;
    
    if (!id) {
        return res.status(400).json({ error: "ID do ponto turistico é obrigatório!" });
    }

    const q = "DELETE FROM turismo WHERE id = ?";
    
    db.query(q, [id], (err, result) => {
        if (err) {
            console.error("Erro ao excluir ponto turistico:", err);
            return res.status(500).json({ error: "Erro ao excluir ponto turistico" });
        }
        return res.status(200).json({ message: "ponto turistico excluído com sucesso!" });
    });
};

export const updatePoint = (req, res) => {
    const { id } = req.params;
    const { ponto, historia, visitantes, cidade, tipo } = req.body;

    if (!id || !ponto || !historia || !visitantes || !cidade || !tipo) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const q = "UPDATE turismo SET ponto = ?, historia = ?, visitantes = ?, cidade = ?, tipo = ? WHERE id = ?";

    db.query(q, [ponto, historia, visitantes, cidade, tipo, id], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar ponto turistico:", err);
            return res.status(500).json({ error: "Erro ao atualizar ponto turistico" });
        }
        return res.status(200).json({ message: "ponto turistico atualizado com sucesso!" });
    });
};
