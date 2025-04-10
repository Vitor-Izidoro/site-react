# Como rodar o código?

1. **Backend**  
   - Abra o terminal (CMD) e entre na pasta do backend.
   - Execute o comando:  
     ```bash
     npm install
     ```  
     Isso instalará todas as dependências necessárias.
   - Após a instalação, abra o arquivo `db.js` e altere os seguintes campos com suas informações do MySQL:
     ```js
     user: "seu-usuario",
     password: "sua-senha",
     ```
   - Com isso feito, você pode iniciar o backend com o comando:
     ```bash
     npm start
     ```

2. **Frontend**  
   - Com o backend rodando, abra um novo terminal.
   - Entre na pasta `frontend`.
   - Execute o comando:
     ```bash
     npm install
     ```  
     para instalar as dependências.
   - Em seguida, entre na pasta `reactproject`:
     ```bash
     cd reactproject
     ```
   - E inicie o projeto com:
     ```bash
     npm start
     ```
