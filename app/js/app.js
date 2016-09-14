var app = angular.module('repo', [
    'ui.router',
    'angular.filter',
    'repo.controllers.CartController',
    'repo.controllers.CompanyController',
    'repo.controllers.ContactController',
    'repo.controllers.HomeController',
    'repo.controllers.MainController',
    'repo.controllers.ListController',
    'repo.controllers.ProductController',
    'repo.services.CartService',
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
            .state('product', {
                url: "/product/:sku",
                templateUrl: 'templates/product.html',
                controller: "ProductController"
            })
            .state('cart', {
                url: "/cart",
                templateUrl: 'templates/cart.html',
                controller: "CartController"
            })
        ;

        $urlRouterProvider.otherwise("/home");
    }
);
