var app = angular.module('repo', [
    'ui.router',
    'angular.filter',
    'repo.controllers.CompanyController',
    'repo.controllers.ContactController',
    'repo.controllers.MainController',
    'repo.controllers.HomeController',
    'repo.controllers.ListController',
    'repo.services.DBService',
    'repo.services.UtilService',
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
            .state('company', {
                url: "/company",
                templateUrl: 'templates/company.html',
                controller: "CompanyController"
            })
            .state('contact', {
                url: "/contact",
                templateUrl: 'templates/contact.html',
                controller: "ContactController"
            })
            .state('list', {
                url: "/list/:kind/:value",
                templateUrl: 'templates/list.html',
                controller: "ListController"
            })
        ;

        $urlRouterProvider.otherwise("/home");
    }
);
