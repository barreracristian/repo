angular.module('repo.controllers.HomeController', [])
    .controller('HomeController',
        function ($scope, DBService) {
            console.log("------------------ HomeController");

            DBService.getProducts().then(function(products){
                console.log("------------------ products = " + JSON.stringify(products, null, 2));
            });

            $scope.title = "Home";
        }
    )
;
