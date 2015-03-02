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
            when('/autors/:autorId', {
                templateUrl: 'partials/autors/save.html',
                controller: 'AutorListOneController'
            }).
            otherwise({
                redirectTo: '/'
            })
    }
]);