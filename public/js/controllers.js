'use strict';

/* Controllers */

var loanControlControllers = angular.module('loanControlControllers', []).
    controller('HomeController', ['$scope', '$rootScope', function($scope, $rootScope){
        $rootScope.breadCrumbs = [
            {text: 'Home', link: '/home', active: true}
        ];
    }]).
    controller('AutorsController', ['$scope','Authors', '$location','$routeParams','$rootScope',
        function($scope, Authors, $location, $routeParams, $rootScope){
            $scope.autor = {};
            $scope.titlePage = 'Cadastrar Novo Autor';

            $rootScope.breadCrumbs = [
                {text: 'Home', link: '#/home', active: false},
                {text: 'Autores', link: '', active: true}
            ];

            if($routeParams.autorId){
                $scope.titlePage = 'Editando Autor';
                $scope.autor = Authors.get({idAutor: $routeParams.autorId}, function(){
                    $rootScope.breadCrumbs = [
                        {text: 'Home', link: '#/home', active: false},
                        {text: 'Autores', link: '#/autors', active: false},
                        {text: $scope.autor.nome , link: '', active: true}
                    ];
                });
            }

            $scope.autors = Authors.query();

            $scope.edit = function(idAutor){
                $location.path('/autor/' + idAutor)
            };

            $scope.delete = function(idAutor){
                if(confirm('Deseja Excluir esse Autors?')){
                    Autors.delete({_id: idAutor}, function(){
                        $scope.autors = Authors.query();
                    });
                }
            }

            $scope.salvar = function(){
                if($scope.autor._id){
                    Authors.update($scope.autor, function(){
                        $location.path('autors')
                    });
                } else {
                    Authors.save($scope.autor, function(){
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

            $scope.delete = function(idEditora){
                if(confirm('Deseja Excluir essa Editora?')){
                    Publishings.delete({_id: idEditora}, function(){
                        $scope.publishings = Publishings.query();
                    });
                }
            };

            $scope.salvar = function(){
                if($scope.publishing._id){
                    Publishings.update($scope.publishing, function(){
                        $location.path('editoras');
                    });
                } else {
                    Publishings.save($scope.publishing, function(){
                        $location.path('editoras');
                    });
                }
            };
    }]).
    controller('PersonController', ['$scope','Person','$rootScope','$routeParams','$location',
        function($scope, Person, $rootScope, $routeParams, $location){
            $scope.person = {};
            $scope.titlePage = 'Cadastrar Nova Pessoa';

            $rootScope.breadCrumbs = [
                {text: 'Home', link: '#/home', active: false},
                {text: 'Pessoas', link: '', active: true}
            ];

            if ($routeParams.personId) {
                $scope.titlePage = 'Editando Pessoa';
                $scope.person = Person.get({idPerson: $routeParams.personId}, function () {
                    $rootScope.breadCrumbs = [
                        {text: 'Home', link: '#/home', active: false},
                        {text: 'Pessoas', link: '#/pessoas', active: false},
                        {text: $scope.person.nome, link: '', active: true}
                    ];
                });
            }

            $scope.people = Person.query();

            $scope.edit = function(idPessoa){
                $location.path('/pessoas/' + idPessoa);
            };

            $scope.delete = function(idPessoa){
                if(confirm('Deseja Excluir essa Pessoa?')){
                    Person.delete({_id: idPessoa}, function(){
                        $scope.people = Person.query();
                    });
                }
            };

            $scope.salvar = function(){
                if($scope.person._id){
                    Person.update($scope.person, function(){
                        $location.path('pessoas');
                    });
                } else {
                    Person.save($scope.person, function(){
                        $location.path('pessoas');
                    });
                }
            };
    }]).
    controller('BookController',['$scope','Book','$rootScope','$routeParams','$location','Authors','Publishings',
        function($scope, Book, $rootScope, $routeParams, $location, Authors, Publishings){
            $scope.book = {};
            $scope.titlePage = 'Cadastrar novo Livro';

            $rootScope.breadCrumbs = [
                {text: 'Home', link: '#/home', active: false},
                {text: 'Livros', link: '', active: true}
            ];

            if ($routeParams.bookId) {
                $scope.titlePage = 'Editando um Livro';
                $scope.book = Book.get({idBook: $routeParams.bookId}, function () {
                    $rootScope.breadCrumbs = [
                        {text: 'Home', link: '#/home', active: false},
                        {text: 'Livros', link: '#/livros', active: false},
                        {text: $scope.book.nome, link: '', active: true}
                    ];
                });
            }

            $scope.books = Book.query();

            $scope.edit = function(idBook){
                $location.path('/livros/' + idBook);
            };

            $scope.delete = function(idBook){
                if(confirm('Deseja Excluir esse Livro?')){
                    Book.delete({_id: idBook}, function(){
                        $scope.books = Book.query();
                    });
                }
            };

            $scope.salvar = function(){
                if($scope.book._id){
                    Book.update($scope.book, function(){
                        $location.path('livros');
                    });
                } else {
                    Book.save($scope.book, function(){
                        $location.path('livros');
                    });
                }
            };

            $scope.loan = function(idBook){
                Book.loan({emprestado: true},{idBook: idBook},function(){
                    $scope.books = Book.query();
                });
            };

            $scope.return = function(idBook){
                Book.return({emprestado: false}, {idBook: idBook}, function(){
                    $scope.books = Book.query();
                });
            }

            $scope.autors = Authors.query();
            $scope.publishings = Publishings.query();
    }]);