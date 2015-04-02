var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connection;
var app = express();

mongoose.connect('mongodb://localhost/loan');
db.on('error', console.error.bind(console, 'connection erro: '));
db.once('open', function(){
    console.log('Conectou ao DB Loan');
});

/**
 * Esquema de Autores
 */
var autorSchema = mongoose.Schema({
    nome: String,
    email: String
});

/**
 * Esquema de Editoras
 */
var publishingSchema = mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
    site: String
});

var AutorsModel = mongoose.model('Autor', autorSchema);
var EditoraModel = mongoose.model('Publishing', publishingSchema);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.json({msg: 'Página não encontrada'});
});

/**
 * Api com resposta dos autores.
 */
app.put('/autor', function(req, res){
    AutorsModel.findOneAndUpdate({_id: req.body._id}, {nome: req.body.nome, email:  req.body.email}, {}, function(err, autor){
        if(err) return console.log(err);
        if(autor) res.json(autor);

        res.json({erro: true, msg: 'Mensagem: Erro ao editar autor'});
    });
});

app.post('/autor', function(req, res){
    var autor = new AutorsModel({
        nome: req.body.nome,
        email:  req.body.email
    });

    autor.save(function(err, autor){
        if(err) return console.log(err);
        res.json(autor);
    });
});

app.get('/autor/:idAutor', function (req, res){
    if(req.param('idAutor') == 'all'){
        AutorsModel.find(function(err, autors){
            if(err) return console.log(err);
            res.json(autors);
        });
    } else {
        AutorsModel.findOne({_id:  req.param('idAutor')}, function(err, autor){
            if(err) return console.log(err);
            res.json(autor);
        });
    }
});

app.delete('/autor', function(req, res){
    AutorsModel.findByIdAndRemove(req.query._id, function(err, autor){
        if(err) return console.log(err);
        if(autor) res.json(autor);
        res.json({erro: true, msg: 'Mensagem: Erro ao apagar autor'});
    });
});

app.listen(process.env.PORT || 3000);
console.log('-- API UP ---');