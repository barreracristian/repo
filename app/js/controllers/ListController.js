angular.module('repo.controllers.ListController', [])
    .controller('ListController',
        function ($scope, $state, $stateParams, DBService, UtilService) {

            console.log("------------------ $stateParams = " + JSON.stringify($stateParams, null, 2));

            $scope.products = UtilService.getFakeProducts(10);

            $scope.filters = {
                "brand": {
                    key: "brand",
                    name: "Marca",
                    options: [
                        "Nissan",
                        "Toyota",
                        "Hyundai"
                    ]
                },
                "year": {
                    key: "year",
                    name: "Año",
                    options: [
                        "2016",
                        "2015",
                        "2014",
                        "2013",
                        "2012",
                        "2011",
                    ]
                },
                "model": {
                    key: "model",
                    name: "Modelo",
                    options: [
                        "V16",
                        "Tiida"
                    ]
                }
            };

            applyFilter($stateParams.kind, $stateParams.value);
            getAvailableFilters();

            // ------------------------------------------------


            $scope.newFilterSelected = function (filter) {
                //console.log("------------------ newFilterSelected = " + JSON.stringify(filter, null, 2));

                var rawFilter = $scope.filters[filter.key];
                applyFilter(rawFilter.key, rawFilter.options[0]);
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
                    value: value
                });
            }

        }
    )
;
