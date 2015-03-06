'use strict';

/* Controllers */

var loanControlControllers = angular.module('loanControlControllers', []);

loanControlControllers.controller('AutorsAllController', ['$scope','Autors',
    function($scope, Autors){
        $scope.autors = Autors.query();
}]);

loanControlControllers.controller('AutorListOneController', ['$scope','Autors',
    function($scope, Autors){
        $scope.salvar = function(){
            Autors.save($scope.autor, function(autor){
                console.log(autor);
            });
        };
}]);