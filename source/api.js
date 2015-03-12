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

var autorSchema = mongoose.Schema({
    nome: String,
    email: String
});

var AutorsModel = mongoose.model('Autor', autorSchema);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    console.log('Entrou na raiz');
    res.json(objRetorno);
});

app.get('/autors', function(req, res){
    AutorsModel.find(function(err, autors){
        if(err) return console.log(err);
        res.json(autors);
    });
});

app.post('/autor', function(req, res){
    if(req.body._id){
        AutorsModel.findOneAndUpdate({_id: req.body._id}, {nome: req.body.nome, email:  req.body.email}, {}, function(err, autor){
            if(err) return console.log(err);
            if(autor) res.json(autor);

            res.json({erro: true, msg: 'Mensagem: Erro ao editar autor'});
        });
    } else{
        var autor = new AutorsModel({
            nome: req.body.nome,
            email:  req.body.email
        });

        autor.save(function(err, autor){
            if(err) return console.log(err);
            res.json(autor);
        });
    }
});

app.get('/autor', function (req, res){
    AutorsModel.findOne({_id:  req.query._id}, function(err, autor){
        if(err) return console.log(err);
        res.json(autor);
    });
});

app.delete('/autor', function(req, res){
    console.log(req.query);
    AutorsModel.findByIdAndRemove(req.query._id, function(err, autor){
        if(err) return console.log(err);
        if(autor) res.json(autor);
        res.json({erro: true, msg: 'Mensagem: Erro ao apagar autor'});
    });
});

app.listen(process.env.PORT || 3000);
console.log('-- API UP ---');