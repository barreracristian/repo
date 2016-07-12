var app = angular.module('repo', [
    'ui.router',
    'angular.filter',
    'repo.controllers.MainController',
    'repo.controllers.HomeController',
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
        ;

        $urlRouterProvider.otherwise("/home");
    }
);
