angular.module('repo.controllers.HomeController', [])
    .controller('HomeController',
        function ($scope, $state, DBService, UtilService) {

            DBService.getProducts().then(function (products) {
                $scope.products = products;
            });

            $scope.sections = [
                {
                    title:'Busca por marca de tu vehículo',
                    categories:[
                        {kind:'brand', value:'Nissan', img:'logo_nissan.png'},
                        {kind:'brand', value:'Hyundai', img:'logo_hyundai.png'},
                        {kind:'brand', value:'Toyota', img:'logo_toyota.png'}
                    ]
                },
                {
                    title:'Busca por tipo de repuesto',
                    categories:[
                        {kind:'type', value:'frenos', img:'type_frenos.jpg'},
                        {kind:'type', value:'filtros', img:'type_filtros.jpg'},
                        {kind:'type', value:'aceites', img:'type_aceites.jpg'}
                    ]
                }
            ];

            $scope.featured = UtilService.getFakeProducts(4);

            //---------

            var subCategories = [
                {
                    name: 'frenos',
                    img: 'frenos.jpg'
                },
                {
                    name: 'filtros',
                    img: 'frenos.jpg'
                },
                {
                    name: 'aceites',
                    img: 'aceites.jpg'
                }
            ];

            var homeCategories = [
                {
                    name: 'v16',
                    img: 'nissanv16.jpg',
                    sub: subCategories
                },
                {
                    name: 'tiida',
                    img: 'nissantiida.jpg',
                    sub: subCategories
                },
                {
                    name: 'accent',
                    img: 'accent.jpg',
                    sub: subCategories
                }
            ];

            $scope.chooser = {
                categories: homeCategories,
                text: 'Selecciona el modelo de tu auto'
            };

            $scope.catsDepth = [];

            $scope.selectCat = function (cat) {
                if (cat.sub) {
                    $scope.catsDepth.push(cat);
                    $scope.chooser = {
                        categories: cat.sub,
                        text: 'Selecciona el tipo de repuesto'
                    };
                } else {
                    $state.go("list", {
                        cats: "avas/dfsd"
                    });
                }
            };

        }
    )
;
