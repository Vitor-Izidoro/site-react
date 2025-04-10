import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DataList = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8800/")
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.error("Erro ao carregar pontos turísticos:", error));
    }, []);

    return (
        <div className="mainContainer">
            <h1 className="title">Pontos Turísticos</h1>

            <button onClick={() => navigate("/admin")}>Ir para Administração</button>

            <ul className="list">
                {data.map((item) => (
                    <li key={item.id} className="li-list">
                        <div>
                            <p><strong>Ponto turístico:</strong> {item.ponto}</p>
                            <p><strong>Tipo:</strong> {item.tipo}</p>
                            <p><strong>Cidade:</strong> {item.cidade}</p>
                            <p><strong>Média de visitantes por dia:</strong> {item.visitantes}</p>

                            <button onClick={() => navigate(`/detalhes/${item.id}`)}>
                                Mais detalhes
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataList;
