angular.module('repo.services.FilterService', [])
    .factory('FilterService', function ($q, $http) {

        var allFilters = [
            {
                key: 'brand',
                name: 'Marca',
                usual: true,
                usualOrder: 1
            },
            {
                key: 'model',
                name: 'Modelo',
                usual: true,
                usualOrder: 2
            },
            {
                key: 'year',
                name: 'Año',
                usual: true,
                usualOrder: 3
            },
            {
                key: 'type',
                name: 'Tipo'
            }
        ];

        return {
            extractUsualFilter: function (appliedFilters) {
                return _.sortBy(_.filter(appliedFilters,
                    function (af) {
                        return _.find(allFilters, {key: af.key, usual: true});
                    }),
                    function (af) {
                        return _.find(allFilters, {key: af.key}).usualOrder;
                    }
                );
            },
            getFilteredProducts: function (products, filters) {
                //console.log("------------------ getFilteredProducts = " + JSON.stringify(filters, null, 2));

                return _.filter(_.cloneDeep(products), function (product) {

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
                     year: [2025,3525,2324]
                     },
                     {
                     brand: Toyota
                     model: V16
                     year: [2025,3525,2324]
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
                            break;
                        }
                    }
                    product.fits = fits;

                    function getMatchingFits(product, fits, filter) {
                        if (filter.key == 'type') {
                            if (filter.value == 'none' || isMatch(product.type, filter.value)) {
                                return fits;
                            } else {
                                return [];
                            }
                        }

                        var matchingFits = [];
                        for (var j = 0; j < fits.length; ++j) {
                            var fit = fits[j];

                            if (isMatch(fit[filter.key], filter.value) || filter.value == 'none') {
                                matchingFits.push(fit);
                            }

                        }
                        return matchingFits;
                    }

                    return matchAll;
                });
            },
            getFilterHumanString: function (filters) {
                var fhs = _.map(filters, function (f) {
                    return f.value;
                }).join(" ").trim();

                if (!fhs || fhs.length == 0) {
                    return undefined;
                } else {
                    return fhs;
                }
            },
            getAllFilters: function () {
                return allFilters;
            },
            getFiltersFromSearch: function (search, products) {
                var splits = search.toLowerCase().split(" ");
                var filters = [];

                _.each(splits, function (split) {
                    split = split.trim();
                    if (split.length > 1) {
                        var found = false;
                        //console.log("------------------ split = " + split);

                        _.each(products, function (prod) {
                            //Puede calzar con cualquiera de los allFilters
                            if (isMatch(prod.type, split)) {
                                safePush(filters, {key: 'type', value: split});
                                found = true;
                            } else {
                                _.each(prod.fits, function (fit) {
                                    _.forOwn(fit, function (value, key) {
                                        if (isMatch(value, split)) {
                                            safePush(filters, {key: key, value: split});
                                            found = true;
                                        }
                                    })
                                })
                            }


                        });

                        if(!found){
                            safePush(filters, {key: 'none', value: split});
                        }
                    }
                });

                function safePush(arr, obj) {
                    if (!_.find(arr, {key: obj.key})) {
                        arr.push(obj);
                    }
                }



                return filters;
            }
        };

        function isMatch(arg1, arg2) {
            //console.log("------------------ " + arg1 + " & " + arg2);

            if (Array.isArray(arg1)) {
                return arg1.toString().toLowerCase().indexOf(arg2.toString().toLowerCase()) >= 0;
            } else {
                return arg1.toLowerCase() == arg2.toString().toLowerCase();
            }
        }

    });
