import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPoint from "./AddPoint";

const AdminPage = () => {
    const [data, setData] = useState([]);
    const [editingPoint, setEditingPoint] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8800/")
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.error("Erro ao carregar pontos turísticos:", error));
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8800/delete/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Erro ao excluir ponto turístico");

            setData(prevData => prevData.filter(point => point.id !== id));
        } catch (error) {
            console.error("Erro ao excluir ponto turístico:", error.message);
        }
    };

    const handleUpdate = async (id, ponto, historia, visitantes, cidade, tipo) => {
        try {
            const response = await fetch(`http://localhost:8800/update/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ponto, historia, visitantes, cidade, tipo })
            });

            if (!response.ok) throw new Error("Erro ao atualizar ponto turístico");

            setData(prevData =>
                prevData.map(point =>
                    point.id === id ? { ...point, ponto, historia, visitantes, cidade, tipo } : point
                )
            );

            setEditingPoint(null);
        } catch (error) {
            console.error("Erro ao atualizar ponto turístico:", error.message);
        }
    };

    const handleAddPoint = (novoPonto) => {
        setData(prevData => [...prevData, novoPonto]);
    };

    return (
        <div className="mainContainer">
            <h1 className="title">Administração de Pontos Turísticos</h1>
            <button onClick={() => navigate("/")}>Voltar para Página Inicial</button>

            {/* Componente de adicionar novo ponto turístico */}
            <AddPoint onAddPoint={handleAddPoint} />

            <ul className="list">
                {data.map((item) => (
                    <li key={item.id} className="li-list">
                        {editingPoint === item.id ? (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const ponto = e.target.ponto.value;
                                const historia = e.target.historia.value;
                                const visitantes = e.target.visitantes.value;
                                const cidade = e.target.cidade.value;
                                const tipo = e.target.tipo.value;
                                handleUpdate(item.id, ponto, historia, visitantes, cidade, tipo);
                            }}>
                                <input type="text" name="ponto" defaultValue={item.ponto} required />
                                <input type="text" name="historia" defaultValue={item.historia} required />
                                <input type="number" name="visitantes" defaultValue={item.visitantes} required />
                                <input type="text" name="cidade" defaultValue={item.cidade} required />
                                <input type="text" name="tipo" defaultValue={item.tipo} required />
                                <button type="submit">Salvar</button>
                                <button type="button" onClick={() => setEditingPoint(null)}>Cancelar</button>
                            </form>
                        ) : (
                            <div>
                                <p><strong>Ponto turístico:</strong> {item.ponto}</p>
                                <p><strong>Tipo:</strong> {item.tipo}</p>
                                <p><strong>Cidade:</strong> {item.cidade}</p>
                                <p><strong>Visitantes/dia:</strong> {item.visitantes}</p>
                                <button onClick={() => setEditingPoint(item.id)}>Editar</button>
                                <button onClick={() => handleDelete(item.id)}>Excluir</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;
