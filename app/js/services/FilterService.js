angular.module('repo.services.FilterService', [])
    .factory('FilterService', function ($q, $http) {

        var usuarlFilters = [
            {
                key: 'brand',
                order: 1
            },
            {
                key: 'model',
                order: 2
            },
            {
                key: 'year',
                order: 3
            }
        ];

        return {
            extractUsualFilter: function (appliedFilters) {
                return _.sortBy(_.filter(appliedFilters,
                    function (af) {
                        return _.find(usuarlFilters, {key: af.key});
                    }),
                    function (af) {
                        return _.find(usuarlFilters, {key: af.key}).order;
                    }
                );
            },
            getFilteredProducts: function (products, filters) {
                console.log("------------------ getFilteredProducts");
                console.log("------------------ filters = " + JSON.stringify(filters, null, 2));

                return _.filter(products, function (product) {

                    /*
                     filter
                     {
                     "key": "model",
                     "value": "v16"
                     },
                     {
                     "key": "brand",
                     "value": "toyota"
                     }

                     fit
                     {
                     brand: Toyota
                     model: Yaris
                     years: [2025,3525,2324]
                     },
                     {
                     brand: Toyota
                     model: V16
                     years: [2025,3525,2324]
                     }
                     */

                    var matchAll = true;
                    var fits = product.fits;

                    //Todos los filters tienen que matchear dentro del MISMO fit
                    for (var i = 0; i < filters.length; ++i) {
                        var filter = filters[i];

                        fits = getMatchingFits(product, fits, filter);
                        if (fits.length == 0) {
                            matchAll = false;
                        }
                    }

                    function getMatchingFits(product, fits, filter) {
                        if (filter.key == 'type') {
                            if (product.type == filter.value) {
                                return fits;
                            } else {
                                return [];
                            }
                        }

                        var matchingFits = [];
                        for (var j = 0; j < fits.length; ++j) {
                            var fit = fits[j];

                            if (fit[filter.key] == filter.value) {
                                matchingFits.push(fit);
                            }
                        }
                        return matchingFits;
                    }

                    return matchAll;
                });
            },
            getFilterHumanString: function (filters) {
                var fhs =_.map(filters, function (f) {
                    return f.value;
                }).join(" ").trim();

                if(!fhs || fhs.length == 0){
                    return undefined;
                }else{
                    return fhs;
                }
            }
        }


    });
