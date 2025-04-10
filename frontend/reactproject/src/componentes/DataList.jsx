import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";  // Certifique-se de importar corretamente

const DataList = ({ clicked }) => {
    const [data, setData] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8800/users")
            .then(res => res.json())
            .then(data => {
                console.log("Usuários carregados:", data);
                setData(data);
            })
            .catch(error => console.error("Erro ao carregar usuários:", error));
    }, []);

    const handleDelete = async (id) => {
        console.log("Tentando excluir o usuário com ID:", id);
        if (!id) {
            console.error("ID do usuário não encontrado.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8800/users/delete/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Erro ao excluir usuário");

            console.log(`Usuário com ID ${id} excluído com sucesso!`);
            setData(prevData => prevData.filter(user => user.id !== id));
        } catch (error) {
            console.error("Erro ao excluir usuário:", error.message);
        }
    };

    const handleUpdate = async (id, ponto, historia, visitantes, cidade, tipo) => {
        console.log(`Atualizando usuário com ID: ${id}`);

        if (!id || !ponto || !historia || !visitantes) {
            console.error("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8800/users/update/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ponto, historia, visitantes })
            });

            if (!response.ok) throw new Error("Erro ao atualizar usuário");

            console.log(`Usuário com ID ${id} atualizado com sucesso!`);

            // Atualiza a lista sem precisar recarregar a página
            setData(prevData =>
                prevData.map(user =>
                    user.id === id ? { ...user, ponto, historia, visitantes } : user
                )
            );

            setEditingUser(null);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error.message);
        }
    };

    return (
        <div className="mainContainer">
            <h1 className="title">Listando Usuários</h1>

            {/* Adicionando a funcionalidade de adicionar usuário na tela */}
            <AddUser />

            <ul className="list">
                {data.map((item) => (
                    <li key={item.id} className="li-list">
                        {editingUser === item.id ? (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const ponto = e.target.ponto.value;
                                const historia = e.target.historia.value;
                                const visitantes = e.target.visitantes.value;
                                handleUpdate(item.id, ponto, historia, visitantes);
                            }}>
                                <input type="text" name="ponto" defaultValue={item.ponto} required />
                                <input type="text" name="historia" defaultValue={item.historia} required />
                                <input type="visitantes" name="visitantes" defaultValue={item.visitantes} required />
                                <button type="submit">Salvar</button>
                                <button type="button" onClick={() => setEditingUser(null)}>Cancelar</button>
                            </form>
                        ) : (
                            <div>
                                <p><strong>Ponto turistico :</strong> {item.ponto}</p>
                                <p><strong>Tipo :</strong> {item.tipo}</p>
                                <p><strong>Media de visitantes por dia :</strong> {item.visitantes}</p>
                                <button className="btn-list" onClick={() => clicked(item)}>Mais detalhes</button>
                                <button onClick={() => handleDelete(item.id)}>Excluir</button>
                                <button onClick={() => setEditingUser(item.id)}>Editar</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataList;
