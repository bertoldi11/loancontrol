'use strict';

/* Services */

var loanControlService = angular.module('loanControlService', ['ngResource']).
    factory('Autors', ['$resource',
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
    }]);