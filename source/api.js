var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connection;
var app = express();
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

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

/**
 * Esquema de Livros
 */
var bookSchema = mongoose.Schema({
    nome: String,
    emprestado: {type: Boolean, default: false},
    authors: [{type: ObjectId, ref: 'Autor'}],
    publishing: {type: ObjectId, ref: 'Publishing'}
});

/**
 * Esquema de Emprestimos
 */
var loanSchema = mongoose.Schema({
    dateLoan: {type: Date, default: Date.now},
    dateReturn: Date,
    person: {type: ObjectId, ref: 'Person'},
    book: {type:ObjectId, ref: 'Book'}
});


/**
 * Contrução dos Models da Aplicação
 * TODO: verificar melhor maneira de separar os arquivos, e onde fazer os includes.
 */
var AutorsModel = mongoose.model('Autor', autorSchema);
var PublishingModel = mongoose.model('Publishing', publishingSchema);
var PersonModel = mongoose.model('Person',personSchema );
var BookModel = mongoose.model('Book', bookSchema);
var LoanModel = mongoose.model('Loan', loanSchema);

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

/**
 * API com resposta dos Livros
 */

app.put('/book', function(req, res){
    BookModel.findOneAndUpdate({_id: req.body._id}, {nome: req.body.nome, authors:  req.body.authors, publishing: req.body.publishing},
        {},
        function(err, book){
            if(err) return console.log(err);
            if(book) res.json(book);

            res.json({erro: true, msg: 'Mensagem: Erro ao editar Livros'});
        });
});

app.post('/book', function(req, res){
    var book = new BookModel({
        nome: req.body.nome,
        authors:  req.body.authors,
        publishing: req.body.publishing
    });

    book.save(function(err, book){
        if(err) return console.log(err);
        res.json(book);
    });
});

app.get('/book/:idBook', function (req, res){
    if(req.param('idBook') == 'all'){
        BookModel.find().populate('authors', 'nome').populate('publishing', 'nome').exec(function(err, book){
            if(err) return console.log(err);
            res.json(book);
        });
    } else {
        BookModel.findOne({_id:  req.param('idBook')}, function(err, book){
            if(err) return console.log(err);
            res.json(book);
        });
    }
});

app.delete('/book', function(req, res){
    BookModel.findByIdAndRemove(req.query._id, function(err, book){
        if(err) return console.log(err);
        if(book) res.json(book);
        res.json({erro: true, msg: 'Mensagem: Erro ao apagar Livro'});
    });
});

app.patch('/book/:idBook', function(req, res){
    if(req.param('idBook')){
        if(undefined != typeof req.param('emprestado')){
            BookModel.findOneAndUpdate({_id: req.param('idBook')}, {emprestado: req.param('emprestado')}, function(err, book){
                if(err) return console.log(err);
                if(book) {
                    if(book.emprestado){
                        var loan = LoanModel({
                            person: req.param('idPerson'),
                            book: req.param('idBook')
                        });
                        loan.save(function(err, loan){
                            if(err) return console.log(err);
                            if(loan) res.json(loan);
                            res.json({'msg': 'Erro ao Emprestar Livro (loan)'});
                        });
                    } else {
                        returnDate = new Date();
                        console.log(returnDate);
                        LoanModel.findOneAndUpdate({book: req.param('idBook'), dateReturn: {$exists: false} }, {dateReturn: new Date()}, function(err, loan){
                            if(err) return console.log(err);
                            if(loan) res.json(loan);
                            res.json({'msg': 'Erro ao Emprestar Livro (loan)'});
                        })
                    }
                } else {
                    res.json({erro: true, msg: 'Erro ao emprestar Livro'});
                }
            });
        }
    }
});

app.listen(process.env.PORT || 3000);
console.log('-- API UP ---');