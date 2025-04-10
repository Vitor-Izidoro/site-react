import mysql from "mysql2";


export const db = mysql.createConnection({
    host: "localhost",
    user: "seu-usuario",
    password: "sua-senha",
    database: "criativa"
    
});

