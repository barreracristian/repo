angular.module('repo.controllers.ListController', [])
    .controller('ListController',
        function ($scope, $stateParams, DBService, UtilService) {

            console.log("------------------ $stateParams = " + JSON.stringify($stateParams, null, 2));

            $scope.products = UtilService.getFakeProducts(10);

            $scope.filters = {
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

            _.each($scope.products, function(prod){
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
                //console.log("------------------ newFilterSelected = " + JSON.stringify(filter, null, 2));

                var rawFilter = $scope.filters[filter.key];
                applyFilter(rawFilter.key);
                getAvailableFilters();
            };

            $scope.newOptionsSelected = function(filter, option){
                //console.log("------------------ filter = " + JSON.stringify(filter, null, 2));
                //console.log("------------------ option = " + JSON.stringify(option, null, 2));

                if(!option){
                    _.remove($scope.appliedFilters, {key:filter.key});
                }else{
                    var af = _.find($scope.appliedFilters, {key:filter.key});
                    if(af){
                        af.value = option;
                    }
                }

                getAvailableFilters();
            };

            function getAvailableFilters() {
                $scope.availableFilters = [];
                _.forOwn($scope.filters, function (value, key) {
                    if (!_.find($scope.appliedFilters, {key: key})) {
                        $scope.availableFilters.push(value);
                    }
                });
            }

            function applyFilter(key, value) {
                $scope.appliedFilters = $scope.appliedFilters || [];
                $scope.appliedFilters.push({
                    key: key,
                    value: value == 'none' ? undefined : value
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
