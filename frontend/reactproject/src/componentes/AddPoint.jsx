import React, { useState } from "react";

const AddPoint = ({ onAddPoint }) => {
    const [ponto, setPonto] = useState("");
    const [historia, setHistoria] = useState("");
    const [visitantes, setVisitantes] = useState("");
    const [cidade, setCidade] = useState("");
    const [tipo, setTipo] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novoPonto = { ponto, historia, visitantes, cidade, tipo };

        try {
            const response = await fetch("http://localhost:8800/users/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novoPonto),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Erro ao adicionar ponto turístico");

            console.log("Ponto turístico adicionado com sucesso:", data);

            // ✅ Chama a função para atualizar o estado no AdminPage
            onAddPoint(data);

            // Limpa os campos após adicionar
            setPonto("");
            setHistoria("");
            setVisitantes("");
            setCidade("");
            setTipo("");

        } catch (error) {
            console.error("Erro ao enviar ponto turístico:", error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Adicionar Ponto Turístico</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome do ponto" value={ponto} onChange={(e) => setPonto(e.target.value)} required />
                <input type="text" placeholder="História" value={historia} onChange={(e) => setHistoria(e.target.value)} required />
                <input type="number" placeholder="Visitantes por dia" value={visitantes} onChange={(e) => setVisitantes(e.target.value)} required />
                <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
                <input type="text" placeholder="Tipo (praia, museu...)" value={tipo} onChange={(e) => setTipo(e.target.value)} required />
                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
};

export default AddPoint;
