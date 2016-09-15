angular.module('repo.controllers.MainController', [])
    .controller('MainController',
        function ($scope, $state, $location, CartService) {

            $scope.isActive = function(str){
                return str == $location.path();
            };

            $scope.selectProd = function(prod){
                $state.go("product", {
                    sku: prod.id
                });
            };

            $scope.cart = CartService.getCart();

            $scope.showCart = function(){
                console.log("------------------ showCart");
                $state.go("cart");
            }
        }
    )
;
