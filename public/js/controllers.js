'use strict';

/* Controllers */

var loanControlControllers = angular.module('loanControlControllers', []).
    controller('HomeController', ['$scope', '$rootScope', function($scope, $rootScope){
        $rootScope.breadCrumbs = [
            {text: 'Home', link: '/home', active: true}
        ];
    }]).
    controller('AutorsController', ['$scope','Autors', '$location','$routeParams','$rootScope',
        function($scope, Autors, $location, $routeParams, $rootScope){
            $scope.autor = {};
            $scope.titlePage = 'Cadastrar Novo Autor';

            $rootScope.breadCrumbs = [
                {text: 'Home', link: '#/home', active: false},
                {text: 'Autores', link: '', active: true}
            ];

            if($routeParams.autorId){
                $scope.titlePage = 'Editando Autor';
                $scope.autor = Autors.get({idAutor: $routeParams.autorId}, function(){
                    $rootScope.breadCrumbs = [
                        {text: 'Home', link: '#/home', active: false},
                        {text: 'Autores', link: '#/autors', active: false},
                        {text: $scope.autor.nome , link: '', active: true}
                    ];
                });
            }

            $scope.autors = Autors.query();

            $scope.edit = function(idAutor){
                $location.path('/autor/' + idAutor)
            };

            $scope.create = function(){
                $location.path('autor/novo');
            };

            $scope.delete = function(idAutor){
                if(confirm('Deseja Excluir esse Autors?')){
                    Autors.delete({_id: idAutor}, function(){
                        $scope.autors = Autors.query();
                    });
                }
            }

            $scope.salvar = function(){
                if($scope.autor._id){
                    Autors.update($scope.autor, function(autor){
                        console.log(autor);
                        $location.path('autors')
                    });
                } else {
                    Autors.save($scope.autor, function(autor){
                        console.log(autor);
                        $location.path('autors')
                    });
                }
            };
    }]).
    controller('PublishingController', ['$scope','Publishings','$rootScope','$routeParams','$location',
        function($scope, Publishings, $rootScope, $routeParams, $location) {
            $scope.publishing = {};
            $scope.titlePage = 'Cadastrar Nova Editora';

            $rootScope.breadCrumbs = [
                {text: 'Home', link: '#/home', active: false},
                {text: 'Editoras', link: '', active: true}
            ];

            if ($routeParams.editoraId) {
                $scope.titlePage = 'Editando Editora';
                $scope.publishing = Publishings.get({idPublishing: $routeParams.editoraId}, function () {
                    $rootScope.breadCrumbs = [
                        {text: 'Home', link: '#/home', active: false},
                        {text: 'Editoras', link: '#/editoras', active: false},
                        {text: $scope.publishing.nome, link: '', active: true}
                    ];
                });
            }

            $scope.publishings = Publishings.query();

            $scope.edit = function(idEditora){
                $location.path('/editora/' + idEditora);
            };

            $scope.create = function(){
                $location.path('editora/nova');
            };

            $scope.delete = function(idEditora){
                if(confirm('Deseja Excluir essa Editora?')){
                    Publishings.delete({_id: idEditora}, function(){
                        $scope.publishings = Publishings.query();
                    });
                }
            };

            $scope.salvar = function(){
                if($scope.publishing._id){
                    Publishings.update($scope.publishing, function( publishing ){
                        console.log(publishing);
                        $location.path('editoras');
                    });
                } else {
                    Publishings.save($scope.publishing, function( publishing ){
                        console.log(publishing);
                        $location.path('editoras');
                    });
                }
            };
    }]);