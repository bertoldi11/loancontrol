'use strict';

/* APP */

var loanControlApp = angular.module('loanControlApp', ['ngRoute', 'loanControlControllers', 'loanControlService']);

loanControlApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/autors', {
                templateUrl: 'partials/autors/listAll.html',
                controller: 'AutorsAllController'
            }).
            when('/autor/novo', {
                templateUrl: 'partials/autors/details.html',
                controller: 'AutorNewController'
            }).
            when('/autor/:autorId', {
                templateUrl: 'partials/autors/details.html',
                controller: 'AutorListOneController'
            }).
            when('/home', {
                templateUrl: 'partials/autors/listAll.html',
                controller: 'AutorsAllController'
            }).
            otherwise({
                redirectTo: '/home'
            })
    }
]);