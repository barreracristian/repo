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
            $scope.data = {delivery:{}, payment:{}};

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
                    if ($scope.data.delivery.type == 'taller' && $scope.data.delivery.tallerId) {
                        return true;
                    }
                    if ($scope.data.delivery.type == 'domicilio' &&
                        $scope.data.delivery.address &&
                        $scope.data.delivery.commune) {
                        return true;
                    }
                    return false;
                } else if(what == 'resumen'){
                    if ($scope.data.payment.type == 'transferencia') {
                        return true;
                    }
                    if ($scope.data.payment.type == 'taller') {
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
