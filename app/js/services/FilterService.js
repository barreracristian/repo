angular.module('repo.services.FilterService', [])
    .factory('FilterService', function ($q, $http) {

        var allFilters = [
            {
                key:'brand',
                name:'Marca',
                usual:true,
                usualOrder:1
            },
            {
                key:'model',
                name:'Modelo',
                usual:true,
                usualOrder:2
            },
            {
                key:'year',
                name:'Año',
                usual:true,
                usualOrder:3
            },
            {
                key:'type',
                name:'Tipo'
            }
        ];

        return {
            extractUsualFilter: function (appliedFilters) {
                return _.sortBy(_.filter(appliedFilters,
                    function (af) {
                        return _.find(allFilters, {key: af.key, usual:true});
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
                            if (filter.value == 'none' || product.type == filter.value) {
                                return fits;
                            } else {
                                return [];
                            }
                        }

                        var matchingFits = [];
                        for (var j = 0; j < fits.length; ++j) {
                            var fit = fits[j];

                            if(filter.key == 'year'){ //es especial porque es un arreglo
                                if (filter.value == 'none' || fit['year'].indexOf(filter.value) >= 0) {
                                    fit.year = [filter.value];
                                    matchingFits.push(fit);
                                }
                            }else{
                                if (fit[filter.key] == filter.value || filter.value == 'none') {
                                    matchingFits.push(fit);
                                }
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
            },
            getAllFilters: function(){
                return allFilters;
            }
        }


    });
