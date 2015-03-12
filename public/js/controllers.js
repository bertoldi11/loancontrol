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
            Autor.delete({_id: idAutor}, function(){
                $scope.autors = Autors.query();
            });
        }
    }]);

loanControlControllers.controller('AutorListOneController', ['$scope','$routeParams','Autor','$location',
    function($scope, $routeParams, Autor, $location){
        $scope.autor = Autor.get({_id: $routeParams.autorId});

        $scope.titlePage = 'Editando Autor';

        $scope.salvar = function(){
            Autor.save($scope.autor, function(autor){
                console.log(autor);
                $location.path('autors')
            });
        };
    }]);

loanControlControllers.controller('AutorNewController', ['$scope','Autor','$location',
    function($scope, Autor, $location){
        $scope.titlePage = 'Cadastrando Autor';

        $scope.salvar = function(){
            Autor.save($scope.autor, function(autor){
                console.log(autor);
                $location.path('autors')
            });
        };
    }]);

