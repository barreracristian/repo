angular.module('repo.controllers.ProductController', [])
    .controller('ProductController',
        function ($scope, $stateParams, DBService, UtilService, CartService, FilterService) {

            var MAX_QUANTITY = 20;

            $scope.product = UtilService.getProductById($stateParams.sku);

            // Filtros

            $scope.appliedFilters = UtilService.url2filter($stateParams.filter);
            console.log("------------------ $scope.appliedFilters = " + JSON.stringify($scope.appliedFilters, null, 2));

            var usualFilter = FilterService.extractUsualFilter($scope.appliedFilters);
            if(usualFilter){
                $scope.usualFilterString = _.map(usualFilter, function (f) {
                    return f.value;
                }).join(" ");

                $scope.featured = _.filter(FilterService.getFilteredProducts(UtilService.getAllProducts(), $scope.appliedFilters),
                    function(prod){
                        console.log("------------------ prod = " + JSON.stringify(prod, null, 2));
                        console.log("------------------ $scope.product = " + JSON.stringify($scope.product, null, 2));

                        return prod.id != $scope.product.id;
                    }
                );
            }else{
                $scope.featured = UtilService.getFeaturedProducts(4);
            }

            //---

            $scope.data = {quantity: 1};

            $scope.addToCart = function (product) {
                CartService.getCart().addProduct(product, $scope.data.quantity);
            };

            $scope.changeQuantity = function (howMuch) {
                $scope.data.quantity += howMuch;
                if ($scope.data.quantity < 1) {
                    $scope.data.quantity = 1;
                }
                if ($scope.data.quantity > MAX_QUANTITY) {
                    $scope.data.quantity = MAX_QUANTITY;
                }
            }

        }
    )
;
