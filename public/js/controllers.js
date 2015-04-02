'use strict';

/* Controllers */

var loanControlControllers = angular.module('loanControlControllers', [])
    .controller('AutorsController', ['$scope','Autors','Autor', '$location','$routeParams',
        function($scope, Autors, Autor, $location, $routeParams){
            $scope.autor = Autor.get({_id: $routeParams.autorId}, function(autor){
                $scope.titlePage = (autor._id) ? 'Editando Autor' :  'Cadastrar Novo Autor';
            });

            $scope.autors = Autors.query();

            $scope.edit = function(idAutor){
                $location.path('/autor/' + idAutor)
            };

            $scope.create = function(){
                $location.path('autor/novo')
            };

            $scope.delete = function(idAutor){
                if(confirm('Deseja Excluir esse Autors?')){
                    Autor.delete({_id: idAutor}, function(){
                        $scope.autors = Autors.query();
                    });
                }
            }

            $scope.salvar = function(){
                Autor.save($scope.autor, function(autor){
                    console.log(autor);
                    $location.path('autors')
                });
            };
    }]);
