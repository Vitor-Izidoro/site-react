import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataList from "./componentes/DataList";
import Detalhes from "./componentes/Detalhes";

function App() {
  return (
    <Router>
      <div className="body1">
        <Routes>
          {/* Página principal com a lista de pontos turísticos */}
          <Route path="/" element={<DataList />} />

          {/* Página de detalhes do ponto turístico, baseada no ID */}
          <Route path="/detalhes/:id" element={<Detalhes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
