angular.module('repo.controllers.CartController', [])
    .controller('CartController',
        function ($scope, $state, DBService, CartService) {

            $scope.cart = CartService.getCart();

            $scope.finished = false;

            $scope.finish = function () {
                $scope.finished = true;
                CartService.reset();
            }

        }
    )
;
