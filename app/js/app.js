var app = angular.module('repo', [
    'ui.router',
    'angular.filter',
    'repo.controllers.MainController',
    'repo.controllers.HomeController',
    'repo.controllers.ListController',
    'repo.services.DBService',
    'repo.extras'
]);

app.run(
    function () {
        console.log("RUN!");
    }
).config(
    function ($compileProvider, $sceProvider, $stateProvider, $urlRouterProvider) {
        $compileProvider.debugInfoEnabled(false);
        $sceProvider.enabled(false);

        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: 'templates/home.html',
                controller: "HomeController"
            })
            .state('list', {
                url: "/list/:cats",
                templateUrl: 'templates/list.html',
                controller: "ListController"
            })
        ;

        $urlRouterProvider.otherwise("/home");
    }
);
