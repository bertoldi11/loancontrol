"use strict";

angular.module('loanControl.autor', []).
config(function($stateProvider){
    $stateProvider.
        state('app.autors', {
            url: '/autors',
            views: {
                'menuContent': {
                    templateUrl: 'js/autor/autors.html',
                    controller: 'AutorsController'
                }
            }
        })
}).controller('AutorsController', function(){

});
