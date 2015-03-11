var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.conection;
var app = express();

mongoose.connect('mongodb://localhost/loan');
db.on('error', console.error.bind(console, 'connection erro: '));
db.once('open', function(){
    console.log('Conectou ao DB Loan');
});

var autorSchema = mongoose.Schema({
    nome: string,
    email: string
});

var Autor = mongoose.model('Autor', autorSchema);

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

app.post('/autor', function(req, res){
    console.log('Salvou Autor');
    console.log(req.body);
    res.json({ "nome": req.body.nome, "email": req.body.email});
});


app.get('/autor', function (req, res){
    console.log('Listou Autor')
    res.json({ "nome": 'Fernando Sabino', "email": 'fernando@sabino.com.br'});
});

app.listen(process.env.PORT || 3000);
console.log('-- API UP ---');