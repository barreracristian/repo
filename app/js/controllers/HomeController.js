angular.module('repo.controllers.HomeController', [])
    .controller('HomeController',
        function ($scope, $state, DBService, UtilService, FilterService) {

            $scope.sections = [
                {
                    key:'brand',
                    title:'Busca por marca de tu vehículo',
                    another: 'Elegir otra marca',
                    categories: _.map(UtilService.getHomeBrands(), function(brand){
                        return {
                            key:'brand', name:brand.name, value:brand.name, img:brand.img
                        };
                    })
                },
                {
                    key:'type',
                    title:'Busca por tipo de repuesto',
                    another:'Elegir otro tipo',
                    categories: _.map(UtilService.getHomeTypes(), function(type){
                        return {
                            key:'type', name:type.name, value:type.type, img:type.img
                        };
                    })
                }
            ];

            $scope.options = {};

            _.each($scope.sections, function(section){
                $scope.options[section.key] = FilterService.extractOptionsFrom(section.key, UtilService.getAllProducts(), [])[0].options;
            });

            console.log("------------------ options = " + JSON.stringify($scope.options, null, 2));

            $scope.featured = UtilService.getFeaturedProducts(4);

        }
    )
;
