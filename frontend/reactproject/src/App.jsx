import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataList from "./componentes/DataList";
import Detalhes from "./componentes/Detalhes";
import Admin from "./componentes/Admin"; // novo import

function App() {
  return (
    <Router>
      <div className="body1">
        <Routes>
          <Route path="/" element={<DataList />} />
          <Route path="/detalhes/:id" element={<Detalhes />} />
          <Route path="/admin" element={<Admin />} /> {/* nova rota */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;
