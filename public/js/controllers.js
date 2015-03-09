'use strict';

/* Controllers */

var loanControlControllers = angular.module('loanControlControllers', []);

loanControlControllers.controller('AutorsAllController', ['$scope','Autors','Autor', '$location',
    function($scope, Autors, Autor, $location){
        $scope.autors = Autors.query();

        $scope.edit = function(idAutor){
            $location.path('/autor/' + idAutor)
        };

        $scope.create = function(){
            $location.path('autor/novo')
        };

        $scope.delete = function(idAutor){
            Autor.delete({idAutor: idAutor});
            $scope.autors = Autors.query();
        }
    }]);

loanControlControllers.controller('AutorListOneController', ['$scope','$routeParams','Autor',
    function($scope, $routeParams, Autor){
        $scope.autor = Autor.get({idAutor: $routeParams.autorId});

        $scope.titlePage = 'Editando Autor';

        $scope.salvar = function(){
            Autor.save($scope.autor, function(autor){
                console.log(autor);
            });
        };
    }]);

loanControlControllers.controller('AutorNewController', ['$scope','Autor',
    function($scope, Autor){
        $scope.titlePage = 'Cadastrando Autor';

        $scope.salvar = function(){
            Autor.save($scope.autor, function(autor){
                console.log(autor);
            });
        };
    }]);

