var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

var objRetorno = [
    {"idAutor":"1", "nome": "Fernando Sabino", "email": "fernando@sabino.com.br"},
    {"idAutor":"2", "nome": "Sun Tzu", "email": "sun@tzu.com.br"},
    {"idAutor":"3", "nome": "Agatha Christie", "email": "agata@cristie.com.br"}
];

app.get('/', function(req, res){
    console.log('Entrou na raiz');
    res.json(objRetorno);
});

app.get('/autors', function(req, res){
    console.log('Entrou no autor');
    console.log(objRetorno);
    res.json(objRetorno);
});

app.post('/autors', function(req, res){
    console.log('Salvou Autor');
    console.log(req);
    res.json({ "idAutor": req.get('id')});
});

app.listen(process.env.PORT || 3000);
console.log('-- API UP ---');