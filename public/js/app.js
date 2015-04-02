'use strict';

/* APP */

var loanControlApp = angular.module('loanControlApp', ['ngRoute', 'loanControlControllers', 'loanControlService']);

loanControlApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
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
            when('/home', {
                templateUrl: 'partials/autors/listAll.html',
                controller: 'AutorsController'
            }).
            otherwise({
                redirectTo: '/home'
            })
    }
]);