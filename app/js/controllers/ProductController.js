angular.module('repo.controllers.ProductController', [])
    .controller('ProductController',
        function ($scope, $stateParams, DBService, UtilService, CartService, FilterService) {

            var MAX_QUANTITY = 20;

            $scope.product = UtilService.getProductById($stateParams.sku);

            // Filtros

            $scope.appliedFilters = UtilService.url2filter($stateParams.filter);

            var usualFilter = FilterService.extractUsualFilter($scope.appliedFilters);
            //console.log("------------------ usualFilter = " + JSON.stringify(usualFilter, null, 2));

            if(usualFilter && usualFilter.length > 0){
                $scope.usualFilterHumanString = FilterService.getFilterHumanString(usualFilter);
                //console.log("------------------ $scope.usualFilterHumanString = " + $scope.usualFilterHumanString);

                var relevant = _.filter(FilterService.getFilteredProducts(UtilService.getAllProducts(), usualFilter),
                    function(prod){
                        return prod.id != $scope.product.id;
                    }
                );

                if(!relevant || relevant.lentgth == 0){
                    $scope.featured = UtilService.getFeaturedProducts(4);
                }else{
                    $scope.featured = relevant;
                }
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
