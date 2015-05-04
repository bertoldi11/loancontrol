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

/**
 * Esquema das Pessoas
 */

var personSchema = mongoose.Schema({
    nome: String,
    email: String,
    telefone: String
});

var AutorsModel = mongoose.model('Autor', autorSchema);
var PublishingModel = mongoose.model('Publishing', publishingSchema);
var PersonModel = mongoose.model('Person',personSchema );

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

/**
 * API com resposta para Editoras
 */
app.put('/publishing', function(req, res){
    PublishingModel.findOneAndUpdate({_id: req.body._id}, {nome: req.body.nome, email:  req.body.email, telefone: req.body.telefone, site: req.body.site},
        {},
        function(err, publishing){
            if(err) return console.log(err);
            if(publishing) res.json(publishing);

            res.json({erro: true, msg: 'Mensagem: Erro ao editar Editora'});
    });
});

app.post('/publishing', function(req, res){
    var publishing = new PublishingModel({
        nome: req.body.nome,
        email:  req.body.email,
        telefone: req.body.telefone,
        site: req.body.site
    });

    publishing.save(function(err, publishing){
        if(err) return console.log(err);
        res.json(publishing);
    });
});

app.get('/publishing/:idEditora', function (req, res){
    if(req.param('idEditora') == 'all'){
        PublishingModel.find(function(err, publishing){
            console.log(publishing);
            if(err) return console.log(err);
            res.json(publishing);
        });
    } else {
        PublishingModel.findOne({_id:  req.param('idEditora')}, function(err, publishing){
            if(err) return console.log(err);
            res.json(publishing);
        });
    }
});

app.delete('/publishing', function(req, res){
    PublishingModel.findByIdAndRemove(req.query._id, function(err, publishing){
        if(err) return console.log(err);
        if(publishing) res.json(publishing);
        res.json({erro: true, msg: 'Mensagem: Erro ao apagar editora'});
    });
});


/**
 * API com resposta de pessoas
 */

app.put('/person', function(req, res){
    PersonModel.findOneAndUpdate({_id: req.body._id}, {nome: req.body.nome, email:  req.body.email, telefone: req.body.telefone},
        {},
        function(err, person){
            if(err) return console.log(err);
            if(person) res.json(person);

            res.json({erro: true, msg: 'Mensagem: Erro ao editar Pessoa'});
        });
});

app.post('/person', function(req, res){
    var person = new PersonModel({
        nome: req.body.nome,
        email:  req.body.email,
        telefone: req.body.telefone
    });

    person.save(function(err, person){
        if(err) return console.log(err);
        res.json(person);
    });
});

app.get('/person/:idPerson', function (req, res){
    if(req.param('idPerson') == 'all'){
        PersonModel.find(function(err, person){
            console.log(person);
            if(err) return console.log(err);
            res.json(person);
        });
    } else {
        PersonModel.findOne({_id:  req.param('idPerson')}, function(err, person){
            if(err) return console.log(err);
            res.json(person);
        });
    }
});

app.delete('/person', function(req, res){
    PersonModel.findByIdAndRemove(req.query._id, function(err, person){
        if(err) return console.log(err);
        if(person) res.json(person);
        res.json({erro: true, msg: 'Mensagem: Erro ao apagar Pessoa'});
    });
});

app.listen(process.env.PORT || 3000);
console.log('-- API UP ---');