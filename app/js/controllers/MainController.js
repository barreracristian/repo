angular.module('repo.controllers.MainController', [])
    .controller('MainController',
        function ($scope) {
            console.log("------------------ MainController");
            $scope.title = "Main";
        }
    )
;
