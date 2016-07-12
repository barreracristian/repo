angular.module('repo.controllers.HomeController', [])
    .controller('HomeController',
        function ($scope) {
            console.log("------------------ HomeController");

            $scope.title = "Home";
        }
    )
;
