angular.module('repo.controllers.ProductController', [])
    .controller('ProductController',
        function ($scope, $stateParams, DBService, UtilService, CartService) {

            var MAX_QUANTITY = 20;

            console.log("------------------ $stateParams = " + JSON.stringify($stateParams, null, 2));

            $scope.product = _.find(UtilService.getFakeProducts(10), {id:parseInt($stateParams.sku)});
            console.log("------------------ $scope.product = " + JSON.stringify($scope.product, null, 2));

            $scope.featured = UtilService.getFakeProducts(4);

            //---

            $scope.data = {quantity: 1};

            $scope.addToCart = function(product){
                CartService.getCart().addProduct(product, $scope.data.quantity);
            };

            $scope.changeQuantity = function(howMuch){
                $scope.data.quantity += howMuch;
                if($scope.data.quantity < 1){
                    $scope.data.quantity = 1;
                }
                if($scope.data.quantity > MAX_QUANTITY){
                    $scope.data.quantity = MAX_QUANTITY;
                }
            }

        }
    )
;
