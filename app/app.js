var app = angular.module("Trello", ["ui.router"])

app.config(function($stateProvider, $urlRouterProvider) {
  
    $stateProvider
        .state('home', {
        url: "/",
        templateUrl: "views/home/home.html"
        });

    $urlRouterProvider.otherwise("/");
});