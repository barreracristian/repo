angular.module('repo.controllers.HomeController', [])
    .controller('HomeController',
        function ($scope, $state, DBService) {

            DBService.getProducts().then(function (products) {
                $scope.products = products;
            });

            $scope.sections = [
                {
                    title:'Busca por modelo de tu vehiculo',
                    categories:[
                        {img:'logo_nissan.png'},
                        {img:'logo_hyundai.png'},
                        {img:'logo_toyota.png'}
                    ]
                },
                {
                    title:'Busca por tipo de repuesto',
                    categories:[
                        {img:'type_frenos.jpg'},
                        {img:'type_filtros.jpg'},
                        {img:'type_aceites.jpg'}
                    ]
                }
            ];


            $scope.featured = [
                {img:'type_frenos.jpg'},
                {img:'type_filtros.jpg'},
                {img:'type_aceites.jpg'},
            ];

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
