angular.module('repo.controllers.MainController', [])
    .controller('MainController',
        function ($scope, $state, $location, CartService, UtilService, FilterService) {

            $scope.isActive = function(str){
                return str == $location.path();
            };

            $scope.selectProd = function(prod, appliedFilters){
                $state.go("product", {
                    sku: prod.id,
                    filter: UtilService.filter2url(appliedFilters)
                });
            };

            $scope.cart = CartService.getCart();

            $scope.showCart = function(){
                console.log("------------------ showCart");
                $state.go("cart");
            };

            $scope.data = {};

            $scope.search = function(){
                var searchstring = $scope.data.search;
                //console.log("------------------ searchstring = " + searchstring);

                var filters = FilterService.getFiltersFromSearch(searchstring, UtilService.getAllProducts());
                //console.log("------------------ filters = " + JSON.stringify(filters, null, 2));

                $state.go("search", {
                    filter: UtilService.filter2url(filters)
                });
            }

        }
    )
;
