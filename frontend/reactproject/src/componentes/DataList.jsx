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
            setData(prevData => prevData.filter(user => user.idusuario !== id));
        } catch (error) {
            console.error("Erro ao excluir usuário:", error.message);
        }
    };

    const handleUpdate = async (id, nome, telefone, email) => {
        console.log(`Atualizando usuário com ID: ${id}`);

        if (!id || !nome || !telefone || !email) {
            console.error("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8800/users/update/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, telefone, email })
            });

            if (!response.ok) throw new Error("Erro ao atualizar usuário");

            console.log(`Usuário com ID ${id} atualizado com sucesso!`);

            // Atualiza a lista sem precisar recarregar a página
            setData(prevData =>
                prevData.map(user =>
                    user.idusuario === id ? { ...user, nome, telefone, email } : user
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
                    <li key={item.idusuario} className="li-list">
                        {editingUser === item.idusuario ? (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const nome = e.target.nome.value;
                                const telefone = e.target.telefone.value;
                                const email = e.target.email.value;
                                handleUpdate(item.idusuario, nome, telefone, email);
                            }}>
                                <input type="text" name="nome" defaultValue={item.nome} required />
                                <input type="text" name="telefone" defaultValue={item.telefone} required />
                                <input type="email" name="email" defaultValue={item.email} required />
                                <button type="submit">Salvar</button>
                                <button type="button" onClick={() => setEditingUser(null)}>Cancelar</button>
                            </form>
                        ) : (
                            <div>
                                <p><strong>Nome:</strong> {item.nome}</p>
                                <p><strong>Telefone:</strong> {item.telefone}</p>
                                <p><strong>Email:</strong> {item.email}</p>
                                <button className="btn-list" onClick={() => clicked(item)}>Mais detalhes</button>
                                <button onClick={() => handleDelete(item.idusuario)}>Excluir</button>
                                <button onClick={() => setEditingUser(item.idusuario)}>Editar</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataList;
