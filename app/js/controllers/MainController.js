angular.module('repo.controllers.MainController', [])
    .controller('MainController',
        function ($scope, $state, $location) {

            $scope.isActive = function(str){
                return str == $location.path();
            };

            $scope.cart = {
                products: [
                    {}, {}, {}
                ],
                total: 36524
            };

            $scope.selectProd = function(prod){
                $state.go("product", {
                    sku: prod.id
                });
            };
        }
    )
;
