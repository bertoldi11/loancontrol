var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    console.log(req.body);
    res.json({ "nome": req.body.nome, "email": req.body.email});
});

app.listen(process.env.PORT || 3000);
console.log('-- API UP ---');