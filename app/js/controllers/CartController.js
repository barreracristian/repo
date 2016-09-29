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

            $scope.checkoutStep = 'authentication'; //authentication, authentication-new, delivery, payment, resumen, finished
            $scope.data = {delivery: {}, payment: {}, authentication: {}};

            $scope.changeCheckoutStep = function (to) {
                if ($scope.goodToGoTo(to)) {

                    if ($scope.checkoutStep == 'authentication') { //autenticar
                        DBService.getClient($scope.data.authentication.mobile_number, $scope.data.authentication.email).then(
                            function (client) {
                                console.log("------------------ client = " + JSON.stringify(client, null, 2));
                                if (client) {
                                    DBService.getClientAddresses(client).then(function (addresses) {
                                        console.log("------------------ addresses = " + JSON.stringify(addresses, null, 2));
                                        $scope.addresses = addresses;
                                        $scope.checkoutStep = to;
                                        $scope.client = client;
                                    }, function (notFound) {
                                        console.log("------------------ sin direcciones");
                                        $scope.checkoutStep = to;
                                        $scope.client = client;
                                    })
                                }
                            },
                            function (notFound) {
                                $scope.checkoutStep = 'authentication-new';
                            }
                        );
                    }

                    if ($scope.checkoutStep == 'delivery') { //agregar direccion de despacho
                        if(!$scope.data.selectedAddressId || $scope.data.selectedAddressId < 0){
                            DBService.createAddress(
                                $scope.client.id,
                                $scope.data.delivery.street,
                                $scope.data.delivery.apt,
                                $scope.data.delivery.commune).then(
                                function (ret) {
                                    console.log("------------------ ret = " + JSON.stringify(ret, null, 2));
                                    $scope.selectedAddress = {
                                        id:ret.id,
                                        street:$scope.data.delivery.street,
                                        commune: $scope.data.delivery.commune
                                    };
                                    console.log("------------------ $scope.selectedAddress 2 = " + JSON.stringify($scope.selectedAddress, null, 2));

                                    $scope.checkoutStep = to;
                                });
                        }else{
                            $scope.selectedAddress = _.find($scope.addresses, {id: parseInt($scope.data.selectedAddressId)});
                            $scope.checkoutStep = to;
                        }
                    }

                    if (to == 'finished') {
                        DBService.createOrder(1, $scope.cart.getTotal(), false, undefined, undefined, undefined).then(function () {
                            CartService.reset();
                            $scope.checkoutStep = to;
                        });
                    }

                    if (to == 'resumen') {
                        $scope.checkoutStep = to;
                    }

                }
            };

            $scope.saveClient = function () {
                DBService.createClient(
                    $scope.data.authentication.email,
                    $scope.data.authentication.mobile_number,
                    $scope.data.authentication.name,
                    $scope.data.authentication.rut
                ).then(function () {
                    $scope.checkoutStep = 'authentication';
                    console.log("------------------ autentiquese denuevo");
                });
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

                    if($scope.data.selectedAddressId > 0){
                        return true;
                    }

                    var pusoDatos = $scope.data.delivery.street && $scope.data.delivery.apt &&
                        $scope.data.delivery.commune;

                    if($scope.data.selectedAddressId < 0 && pusoDatos){
                        return true;
                    }

                    if(!$scope.data.selectedAddressId && pusoDatos){
                        return true;
                    }
                    return false;
                } else if (what == 'resumen') {
                    if (['transferencia', 'efectivo'].indexOf($scope.data.payment.type) >= 0) {
                        return true;
                    }
                    return false;
                } else if (what == 'authentication-new') {
                    if ($scope.data.authentication.name && $scope.data.authentication.rut) {
                        return true;
                    }
                    return false;
                }
                else if (what == 'finished') {
                    return true;
                }

                return false;
            }

        }
    )
;
