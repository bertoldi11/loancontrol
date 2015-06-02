
angular.module('loanControl', [
    'ionic',
    'ionic-material',
    'ionMdInput',
    'loanControl.autor'
]).run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider, $urlRouterProvider) {
    // if none of the above states are matched, use this as the fallback
    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'js/app/menu.html',
        controller: 'AppCtrl'
    }).state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'js/app/home.html',
                controller: 'AppCtrl'
            }
        }
    });
    $urlRouterProvider.otherwise('/app/home');
}).controller('AppCtrl', function($scope, ionicMaterialMotion, ionicMaterialInk){

});
