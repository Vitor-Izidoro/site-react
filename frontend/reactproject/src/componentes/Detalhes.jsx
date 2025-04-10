import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Detalhes = () => {
  const { id } = useParams(); // ID passado pela URL
  const navigate = useNavigate();
  const [pontoTuristico, setPontoTuristico] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar os dados do ponto turístico específico
    fetch(`http://localhost:8800/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar o ponto turístico");
        return res.json();
      })
      .then((data) => {
        setPontoTuristico(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando detalhes...</p>;

  if (!pontoTuristico) return <p>Ponto turístico não encontrado.</p>;

  return (
    <div className="detalhes-container">
      <h1>Detalhes do Ponto Turístico</h1>
      <p><strong>Ponto:</strong> {pontoTuristico.ponto}</p>
      <p><strong>História:</strong> {pontoTuristico.historia}</p>
      <p><strong>Visitantes por dia:</strong> {pontoTuristico.visitantes}</p>
      <p><strong>Cidade:</strong> {pontoTuristico.cidade}</p>
      <p><strong>Tipo:</strong> {pontoTuristico.tipo}</p>

      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
};

export default Detalhes;
