angular.module('repo.controllers.HomeController', [])
    .controller('HomeController',
        function ($scope, $state, DBService, UtilService) {

            $scope.sections = [
                {
                    title:'Busca por marca de tu vehículo',
                    another: 'Elegir otra marca',
                    categories: _.map(UtilService.getHomeBrands(), function(brand){
                        return {
                            kind:'brand', name:brand.name, value:brand.name, img:brand.img
                        };
                    })
                },
                {
                    title:'Busca por tipo de repuesto',
                    another:'Elegir otro tipo',
                    categories: _.map(UtilService.getHomeTypes(), function(type){
                        return {
                            kind:'type', name:type.name, value:type.type, img:type.img
                        };
                    })
                }
            ];

            $scope.featured = UtilService.getFeaturedProducts(4);

        }
    )
;
