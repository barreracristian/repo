angular.module('repo.controllers.ListController', [])
    .controller('ListController',
        function ($scope, $stateParams, DBService, UtilService, FilterService) {

            console.log("------------------ $stateParams = " + JSON.stringify($stateParams, null, 2));

            var allProducts = UtilService.getAllProducts();

            if($stateParams.key && $stateParams.value){
                $scope.appliedFilters = addFilter($stateParams.kind, $stateParams.value, []);
            }else if($stateParams.filter){
                $scope.appliedFilters = UtilService.url2filter($stateParams.filter);
            }

            $scope.products = filterProducts(allProducts, $scope.appliedFilters);

            // ------------------------------------------------

            $scope.newFilterSelected = function (filter) {
                $scope.appliedFilters = addFilter(filter.key, 'none', $scope.appliedFilters);
                $scope.products = filterProducts(allProducts, $scope.appliedFilters);
            };

            $scope.newOptionsSelected = function (filter, option) {
                $scope.appliedFilters = addFilter(filter.key, option, $scope.appliedFilters);
                $scope.products = filterProducts(allProducts, $scope.appliedFilters);
            };

            $scope.removeFilter = function (filter) {
                $scope.appliedFilters = addFilter(filter.key, undefined, $scope.appliedFilters);
                $scope.products = filterProducts(allProducts, $scope.appliedFilters);
            };

            // ------------------------------------------------

            function addFilter(key, value, filters) {
                if (!value) {
                    _.remove(filters, {key: key});
                } else {
                    var af = _.find(filters, {key: key});
                    if (af) {
                        af.value = value;
                    } else {
                        filters.push({
                            key: key,
                            value: value
                        });
                    }
                }
                return filters;
            }

            function filterProducts(products, filters) {
                var tempProds = products;
                $scope.filterOptions = [];
                _.each(filters, function (filter) {
                    extractOptionsFrom(filter.key, tempProds);
                    tempProds = FilterService.getFilteredProducts(tempProds, [filter]);
                    console.log("------------------ prods after " + filter.key + ":" + filter.value + " > " + tempProds.length);
                });

                var restFilters = _.filter(FilterService.getAllFilters(), function(filter){
                    return !_.find(filters, {key:filter.key});
                });

                _.each(restFilters, function(filter){
                    extractOptionsFrom(filter.key, tempProds);
                });

                //console.log("------------------ products = " + JSON.stringify(tempProds, null, 2));
                //console.log("------------------ $scope.filterOptions = " + JSON.stringify($scope.filterOptions, null, 2));
                //console.log("------------------ $scope.appliedFilters = " + JSON.stringify($scope.appliedFilters, null, 2));
                //console.log("------------------ products = " + tempProds.length);

                return tempProds;
            }

            function extractOptionsFrom(key, products) {
                _.each(products, function (prod) {
                    if (key == 'type') {
                        uniqueFilterFill('type', prod.type);
                    } else {
                        _.each(prod.fits, function (fit) {
                            uniqueFilterFill(key, fit[key]);
                        });
                    }
                });
            }

            function uniqueFilterFill(key, item) {
                var adds = Array.isArray(item) ? item : [item];
                _.each(adds, function (add) {

                    var found = _.find($scope.filterOptions, {key: key});
                    if(!found){
                        found = {key:key, options:[]};
                        $scope.filterOptions.push(found);
                    }

                    if (found.options.indexOf(add) < 0) {
                        found.options.push(add);
                    }
                });
            }

            // --- Functiones en el html

            $scope.notApplied = function (filterOption){
                return !_.find($scope.appliedFilters, {key:filterOption.key});
            };

            $scope.remainNotApplied = function(filterOptions){
                for(var i=0; i<filterOptions.length; ++i){
                    if($scope.notApplied(filterOptions[i])){
                        return true;
                    }
                }
                return false;
            };

            $scope.getFilterName = function(key){
                return (_.find(FilterService.getAllFilters(), {key:key}) || {}).name;
            };

            $scope.getFilterOptions = function(key){
                return (_.find($scope.filterOptions, {key:key}) || {}).options;
            }

        }
    )
;
