angular.module('repo.controllers.HomeController', [])
    .controller('HomeController',
        function ($scope, $state, DBService) {

            DBService.getProducts().then(function (products) {
                $scope.products = products;
            });

            var subCategories = [
                {
                    name: 'frenos',
                    img: 'frenos.jpg'
                },
                {
                    name: 'filtros',
                    img: 'filtros.jpg'
                },
                {
                    name: 'aceites',
                    img: 'aceites.jpg'
                }
            ];
            $scope.types = subCategories;

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
