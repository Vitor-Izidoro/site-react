import React, { useState } from "react";

const AddUser = () => {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novoUsuario = { nome, telefone, email };

        try {
            const response = await fetch("http://localhost:8800/users/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novoUsuario),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Erro ao adicionar usuário");

            console.log("Usuário adicionado com sucesso:", data);
            
            // Limpa os campos após adicionar
            setNome("");
            setTelefone("");
            setEmail("");

        } catch (error) {
            console.error("Erro ao enviar usuário:", error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Adicionar Usuário</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
};

export default AddUser;
