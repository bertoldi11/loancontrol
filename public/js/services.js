'use strict';

/* Services */

var loanControlService = angular.module('loanControlService', ['ngResource']);

loanControlService.factory('Autors', ['$resource',
    function($resource){
         return $resource('http://192.168.56.100:3000/autors', {}, {
            query: {method: 'GET', params: {}, isArray: true},
             post: {method: 'POST', params: {}}
        });
    }
]);