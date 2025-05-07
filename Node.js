const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); 
const app = express();

app.use(express.json());


function registrarLog(id, nomeAluno) {
  const mensagem = `ID: ${id} - Nome: ${nomeAluno}\n`;
  fs.appendFileSync('logs.txt', mensagem);
}


app.post('/logs', (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: 'Nome do aluno é obrigatório.' });
  }

  const id = uuidv4(); 
  registrarLog(id, nome);

  res.status(201).json({
    mensagem: 'Log registrado com sucesso.',
    id: id
  });
});


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando `);
});
