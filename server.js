const bodyParser = require('body-parser');
const express = require('express');

// Cria a aplicação
const app = express();

app.use(express.static('.')); // Os arquivos estáticos nesta pasta são servidos
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //Transforma os dados 'json' no 'body' em objeto

app.get('/teste', (req, res) => res.send('OK, tudo certo!'));

//----Para upload de arquivos----
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, './upload');
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage }).single('arquivo');

app.post('/upload', (req, res) => {
  upload(req, res, err => {
    err ? res.end('Ocorreu um erro') : res.end('Concluído com sucesso');
  });
});
//-------------------------------

// ====Para upload de arquivos usando a API fetch====
app.post('/formulario', (req, res) => {
  res.send({
    ...req.body,
    id: 1,
  });
});
// ==================================================

// Inicia o servidor
app.listen(8080, () => console.log('Executando...'));
