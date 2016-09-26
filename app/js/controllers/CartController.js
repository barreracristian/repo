angular.module('repo.controllers.CartController', [])
    .controller('CartController',
        function ($scope, $state, DBService, CartService, UtilService) {

            $scope.cart = CartService.getCart();

            _.each(UtilService.getFeaturedProducts(4), function (prod) {
                $scope.cart.addProduct(prod, 1 + parseInt(Math.random() * 10));
            });

            $scope.talleres = UtilService.getTalleres();

            $scope.getTaller = function (id) {
                return _.find($scope.talleres, {id: parseInt(id)});
            };

            $scope.removeFromCart = function (prod) {
                if ($scope.checkoutStep == 'delivery' || $scope.checkoutStep == 'payment') {
                    CartService.getCart().removeProduct(prod);
                }
            };

            //Chekout Steps

            $scope.checkoutStep = 'payment'; //authentication, delivery, payment, resumen, finished
            $scope.data = {delivery: {}, payment: {}, authentication: {}};

            $scope.changeCheckoutStep = function (to) {
                if ($scope.goodToGoTo(to)) {
                    $scope.checkoutStep = to;
                    if (to == 'finished') {
                        CartService.reset();
                    }
                }
            };

            $scope.backTo = function (to) {
                if (to == 'delivery') {
                    $scope.data.payment = {};
                } else if (to == 'authentication') {
                    $scope.data.delivery = {};
                }
                $scope.checkoutStep = to;
            };

            $scope.goodToGoTo = function (what) {
                //payment
                if (what == 'delivery') {
                    if ($scope.data.authentication.mobile_number && $scope.data.authentication.email) {
                        return true;
                    }
                    return false;
                } else if (what == 'payment') {
                    if ($scope.data.delivery.street && $scope.data.delivery.apt &&
                        $scope.data.delivery.commune) {
                        return true;
                    }
                    return false;
                } else if (what == 'resumen') {
                    if (['transferencia', 'efectivo'].indexOf($scope.data.payment.type) >= 0) {
                        return true;
                    }
                    return false;
                } else if (what == 'finished') {
                    return true;
                }

                return false;
            }

        }
    )
;
