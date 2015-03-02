'use strict';

/* Controllers */

var loanControlControllers = angular.module('loanControlControllers', []);

loanControlControllers.controller('AutorsAllController', ['$scope',
    function($scope){
        $scope.autors = [
            {'idAutor':1, 'nome': 'Fernando Sabino', 'email': 'fernando@sabino.com.br'},
            {'idAutor':2, 'nome': 'Sun Tzu', 'email': 'sun@tzu.com.br'},
            {'idAutor':3, 'nome': 'Agatha Christie', 'email': 'agata@cristie.com.br'},
        ];
}]);

loanControlControllers.controller('AutorListOneController', ['$scope',
    function($scope){
        $scope.salvar = function(){
            alert('Vai Salvar');
        };
}]);