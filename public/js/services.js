'use strict';

/* Services */

var loanControlService = angular.module('loanControlService', ['ngResource']).
    factory('Authors', ['$resource',
        function($resource){
            return $resource('http://192.168.56.100:3000/autor/:idAutor', {}, {
                update: {method: 'PUT'},
                query: {method: 'GET', params: {'idAutor': 'all'}, isArray: true}
            });
    }]).
    factory('Publishings', ['$resource',
        function($resource){
            return $resource('http://192.168.56.100:3000/publishing/:idPublishing', {}, {
                update: {method: 'PUT'},
                query: {method: 'GET', params: {'idPublishing': 'all'}, isArray: true}
            });
    }]).
    factory('Person', ['$resource',
        function($resource){
            return $resource('http://192.168.56.100:3000/person/:idPerson', {}, {
                update: {method: 'PUT'},
                query: {method: 'GET', params: {'idPerson': 'all'}, isArray: true}
            });
    }]).
    factory('Book', ['$resource',
        function($resource){
            return $resource('http://192.168.56.100:3000/book/:idBook', {}, {
                update: {method: 'PUT'},
                query: {method: 'GET', params: {'idBook': 'all'}, isArray: true},
                loan:{method: 'PATCH', params: {'idBook': '@idBook'}},
                return:{method: 'PATCH', params: {'idBook': '@idBook'}}
            });
    }]);