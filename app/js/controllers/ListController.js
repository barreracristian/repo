angular.module('repo.controllers.ListController', [])
    .controller('ListController',
        function ($scope, $stateParams, DBService, UtilService, FilterService) {

            console.log("------------------ $stateParams = " + JSON.stringify($stateParams, null, 2));

            var allProducts = UtilService.getAllProducts();
            fillFilterOptions(allProducts);

            $scope.availableFilterOptions = [];
            $scope.appliedFilters = [];
            applyFilter($stateParams.kind, $stateParams.value);
            getAvailableFilters();

            // ------------------------------------------------

            $scope.newFilterSelected = function (filter) {
                applyFilter(filter.key, 'none');
                getAvailableFilters();
            };

            $scope.newOptionsSelected = function (filter, option) {
                applyFilter(filter.key, option);
                getAvailableFilters();
            };

            $scope.removeFilter = function (filter) {
                applyFilter(filter.key, undefined);
                getAvailableFilters();
            };

            function applyFilter(key, value) {

                if (!value) {
                    _.remove($scope.appliedFilters, {key: key});
                } else {
                    var af = _.find($scope.appliedFilters, {key: key});
                    if (af) {
                        af.value = value;
                    } else {
                        $scope.appliedFilters.push({
                            key: key,
                            value: value
                        });
                    }
                }

                $scope.products = FilterService.getFilteredProducts(allProducts, $scope.appliedFilters);
            }

            function getAvailableFilters() {
                fillFilterOptions($scope.products);



                $scope.availableFilterOptions = [];
                _.forOwn($scope.filterOptions, function (value, key) {
                    if (!_.find($scope.appliedFilters, {key: key})) {
                        $scope.availableFilterOptions.push(value);
                    }
                });
            }

            //

            function fillFilterOptions(products){
                console.log("------------------ products = " + JSON.stringify(products, null, 2));

                $scope.filterOptions = {};

                console.log("------------------ $scope.filterOptions 1 = " + JSON.stringify($scope.filterOptions, null, 2));

                _.each(FilterService.getAllFilters(), function (filter) {
                    $scope.filterOptions[filter.key] = {
                        key: filter.key,
                        name: filter.name,
                        options: []
                    };
                });

                console.log("------------------ $scope.filterOptions 2 = " + JSON.stringify($scope.filterOptions, null, 2));

                _.each(products, function (prod) {
                    uniqueFilterFill('type', prod.type);
                    _.each(prod.fits, function (fit) {
                        uniqueFilterFill('brand', fit.brand);
                        uniqueFilterFill('model', fit.model);
                        uniqueFilterFill('year', fit.years);
                    });
                });

                console.log("------------------ $scope.filterOptions 3 = " + JSON.stringify($scope.filterOptions, null, 2));
            }

            function uniqueFilterFill(key, item) {
                var adds = Array.isArray(item) ? item : [item];
                _.each(adds, function (add) {
                    if ($scope.filterOptions[key].options.indexOf(add) < 0) {
                        $scope.filterOptions[key].options.push(add);
                    }
                });
            }

        }
    )
;
