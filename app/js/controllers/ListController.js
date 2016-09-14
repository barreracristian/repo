angular.module('repo.controllers.ListController', [])
    .controller('ListController',
        function ($scope, $stateParams, DBService, UtilService) {

            console.log("------------------ $stateParams = " + JSON.stringify($stateParams, null, 2));

            var allProducts = _.map(UtilService.getFakeProducts(100000), function(prod){
                var filterString = "type:" + prod.type + " ";
                _.each(prod.fit, function(fit){
                    filterString += "brand:" + fit.brand + " model:" + fit.model + " ";
                    _.each(fit.years, function(year){
                        filterString += "year:" + year + " ";
                    });
                });
                prod.filterstring = filterString;
                return prod;
            });


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
                _.each(prod.fit, function(fit){
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

                $scope.products = _.filter(allProducts, function(product){
                    for(var i=0; i<$scope.appliedFilters.length; ++i){
                        var filter = $scope.appliedFilters[i];
                        var search = filter.key + ":" + filter.value;
                        var match = product.filterstring.indexOf(search) >= 0 || filter.value == 'none';
                        if(!match){
                            return false;
                        }
                    }
                    return true;
                });

                console.log("------------------ $scope.products = " + $scope.products.length);
                //_.each($scope.products, function(p){
                    //console.log("-- " + p.filterstring);
                //})

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
