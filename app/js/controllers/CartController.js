angular.module('repo.controllers.CartController', [])
    .controller('CartController',
        function ($scope, $state, DBService, CartService, UtilService) {

            $scope.cart = CartService.getCart();

            _.each(UtilService.getFeaturedProducts(4), function(prod){
                $scope.cart.addProduct(prod, 1 + parseInt(Math.random() * 10));
            });

            $scope.checkoutStep = 'resumen';
            $scope.data = {};

            $scope.removeFromCart = function(prod){
                CartService.getCart().removeProduct(prod);
            };

            //Chekout Steps

            $scope.selectDelivery = function(what){
                $scope.data.delivery = what;
            };

            $scope.selectPayment = function(what){
                $scope.data.payment = what;
            };

            $scope.finish = function () {
                $scope.checkoutStep = 'finished';
                CartService.reset();
            };

        }
    )
;
