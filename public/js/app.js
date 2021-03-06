'use strict';

/* APP */

var loanControlApp = angular.module('loanControlApp', ['ngRoute', 'loanControlControllers', 'loanControlService']);

loanControlApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/livros', {
                templateUrl: 'partials/books/listAll.html',
                controller: 'BookController'
            }).
            when('/livros/novo', {
                templateUrl: 'partials/books/details.html',
                controller: 'BookController'
            }).
            when('/livros/:bookId', {
                templateUrl: 'partials/books/details.html',
                controller: 'BookController'
            }).
            when('/pessoas', {
                templateUrl: 'partials/person/listAll.html',
                controller: 'PersonController'
            }).
            when('/pessoas/nova', {
                templateUrl: 'partials/person/details.html',
                controller: 'PersonController'
            }).
            when('/pessoas/:personId', {
                templateUrl: 'partials/person/details.html',
                controller: 'PersonController'
            }).
            when('/autors', {
                templateUrl: 'partials/autors/listAll.html',
                controller: 'AutorsController'
            }).
            when('/autor/novo', {
                templateUrl: 'partials/autors/details.html',
                controller: 'AutorsController'
            }).
            when('/autor/:autorId', {
                templateUrl: 'partials/autors/details.html',
                controller: 'AutorsController'
            }).
            when('/editoras',{
                templateUrl: 'partials/publishing/listAll.html',
                controller: 'PublishingController'
            }).
            when('/editora/nova',{
                templateUrl: 'partials/publishing/details.html',
                controller: 'PublishingController'
            }).
            when('/editora/:editoraId',{
                templateUrl: 'partials/publishing/details.html',
                controller: 'PublishingController'
            }).
            when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'HomeController'
            }).
            otherwise({
                redirectTo: '/home'
            })
    }
]);