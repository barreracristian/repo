angular.module('repo.controllers.CartController', [])
    .controller('CartController',
        function ($scope, $state, DBService, CartService, UtilService) {

            $scope.cart = CartService.getCart();

            _.each(UtilService.getFeaturedProducts(4), function (prod) {
                $scope.cart.addProduct(prod, 1 + parseInt(Math.random() * 10));
            });

            $scope.talleres = [
                {
                    id: 1,
                    street: 'Diez de Julio',
                    number: '354',
                    detail: 'esquina Sta. Rosa',
                    commune: 'Santiago'
                },
                {
                    id: 2,
                    street: 'Av Matta',
                    number: '7734',
                    detail: 'Local B1',
                    commune: 'Maipu'
                }
            ];

            $scope.getTaller = function(id){
                return _.find($scope.talleres, {id: parseInt(id)});
            };



            $scope.removeFromCart = function (prod) {
                if($scope.checkoutStep == 'delivery' || $scope.checkoutStep == 'payment'){
                    CartService.getCart().removeProduct(prod);
                }
            };

            //Chekout Steps

            $scope.checkoutStep = 'delivery'; //delivery, payment, resumen, finished
            $scope.data = {};

            $scope.changeCheckoutStep = function(to){
                if($scope.goodToGoTo(to)){
                    $scope.checkoutStep = to;
                    if(to == 'finished'){
                        CartService.reset();
                    }
                }
            };

            $scope.goodToGoTo = function (what) {
                //payment
                if (what == 'payment') {
                    if ($scope.data.deliveryType == 'taller' && $scope.data.selectedTallerId) {
                        return true;
                    }
                    if ($scope.data.deliveryType == 'domicilio' &&
                        $scope.data.address &&
                        $scope.data.commune) {
                        return true;
                    }
                    return false;
                } else if(what == 'resumen'){
                    if ($scope.data.paymentType == 'transferencia') {
                        return true;
                    }
                    if ($scope.data.paymentType == 'taller') {
                        return true;
                    }
                    return false;
                } else if(what == 'finished'){
                    return true;
                }

                return false;
            }

        }
    )
;
