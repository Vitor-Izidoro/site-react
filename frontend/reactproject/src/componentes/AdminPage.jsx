// src/componentes/AdminPage.jsx
import React from "react";
import DataList from "./DataList";
import AddUser from "./AddUser";

const AdminPage = () => {
    return (
        <div className="admin-page">
            <h1>Área Administrativa</h1>
            <AddUser />
            <DataList clicked={() => {}} /> {/* Você pode adaptar se quiser mais detalhes */}
        </div>
    );
};

export default AdminPage;
