var app = angular.module('repo-admin', [
    'ui.router',
    'angular.filter',
    'repo.controllers.admin.AdminHomeController',
    'repo.controllers.admin.AdminMainController',
    'repo.services.CartService',
    'repo.services.DBService',
    'repo.services.FilterService',
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
                templateUrl: 'templates/admin/home.html',
                controller: "AdminHomeController"
            })
        ;

        $urlRouterProvider.otherwise("/home");
    }
);
