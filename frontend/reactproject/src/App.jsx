import "./App.css"; 
import DataList from "./componentes/DataList";
import { useState } from "react";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemClicked, setItemClicked] = useState(null);

  function clicked(item) {
    console.log("Clicou no ponto turístico:", item.id);
    setModalIsOpen(true);
    setItemClicked(item);
  }

  function closeModal() {
    setModalIsOpen(false);
    setItemClicked(null);
  }

  return (
    <div className="body1">
      <DataList clicked={clicked} />

      {modalIsOpen && itemClicked && (
        <div className="modal">
          <div className="modal-content">
            <h1>Detalhes do Ponto Turístico</h1>
            <p><strong>Ponto:</strong> {itemClicked.ponto}</p>
            <p><strong>História:</strong> {itemClicked.historia}</p>
            <p><strong>Visitantes por dia:</strong> {itemClicked.visitantes}</p>
            <p><strong>Cidade:</strong> {itemClicked.cidade}</p>
            <p><strong>Tipo:</strong> {itemClicked.tipo}</p>
            <button onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
