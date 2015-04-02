var mongoose = require('mongoose');
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