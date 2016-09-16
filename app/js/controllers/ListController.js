angular.module('repo.controllers.ListController', [])
    .controller('ListController',
        function ($scope, $stateParams, DBService, UtilService, FilterService) {

            console.log("------------------ $stateParams = " + JSON.stringify($stateParams, null, 2));

            var allProducts = UtilService.getAllProducts();

            $scope.filters = {
                "type": {
                    key: "type",
                    name: "Tipo",
                    options: []
                },
                "brand": {
                    key: "brand",
                    name: "Marca",
                    options: []
                },
                "year": {
                    key: "year",
                    name: "Año",
                    options: []
                },
                "model": {
                    key: "model",
                    name: "Modelo",
                    options: []
                }
            };
            $scope.appliedFilters = [];

            _.each(allProducts, function(prod){
                uniqueFilterFill('type', prod.type);
                _.each(prod.fits, function(fit){
                    uniqueFilterFill('brand', fit.brand);
                    uniqueFilterFill('model', fit.model);
                    uniqueFilterFill('year', fit.years);
                });
            });

            applyFilter($stateParams.kind, $stateParams.value);
            getAvailableFilters();

            // ------------------------------------------------

            $scope.newFilterSelected = function (filter) {
                var rawFilter = $scope.filters[filter.key];
                applyFilter(rawFilter.key, 'none');
                getAvailableFilters();
            };

            $scope.newOptionsSelected = function(filter, option){
                applyFilter(filter.key, option);
                getAvailableFilters();
            };

            $scope.removeFilter = function(filter){
                applyFilter(filter.key, undefined);
                getAvailableFilters();
            };

            function applyFilter(key, value) {

                if(!value){
                    _.remove($scope.appliedFilters, {key:key});
                }else{
                    var af = _.find($scope.appliedFilters, {key:key});
                    if(af){
                        af.value = value;
                    }else{
                        $scope.appliedFilters.push({
                            key: key,
                            value: value
                        });
                    }
                }

                $scope.products = FilterService.getFilteredProducts(allProducts, $scope.appliedFilters);
            }

            function getAvailableFilters() {
                $scope.availableFilters = [];
                _.forOwn($scope.filters, function (value, key) {
                    if (!_.find($scope.appliedFilters, {key: key})) {
                        $scope.availableFilters.push(value);
                    }
                });
            }

            function uniqueFilterFill(key, item){
                var adds = Array.isArray(item) ? item : [item];
                _.each(adds, function(add){
                    if($scope.filters[key].options.indexOf(add)<0){
                        $scope.filters[key].options.push(add);
                    }
                });
            }

        }
    )
;
