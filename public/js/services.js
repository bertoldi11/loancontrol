'use strict';

/* Services */

var loanControlService = angular.module('loanControlService', ['ngResource']);

loanControlService.factory('Autors', ['$resource',
    function($resource){
         return $resource('http://192.168.56.101:3000/autors');
    }
]);

loanControlService.factory('Autor', ['$resource',
    function($resource){
        return $resource('http://192.168.56.101:3000/autor');
    }
]);