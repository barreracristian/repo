angular.module('repo.controllers.MainController', [])
    .controller('MainController',
        function ($scope, $location) {

            $scope.isActive = function(str){
                return str == $location.path();
            };

            $scope.cart = {
                products: [
                    {}, {}, {}
                ],
                total: 36524
            };
        }
    )
;
