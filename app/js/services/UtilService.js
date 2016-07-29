angular.module('repo.services.UtilService', [])
    .factory('UtilService', function ($q, $http) {

        return {
            getFakeProducts: function (count) {
                var names = ["freno", "kit de embrague", "filtro de aire", "carburador", "luces de cambio", "aceite", "filtro de aceite", "pastillas de freno", "filtro de aire"];
                var products = [];

                for (var i = 0; i < count; ++i) {
                    products.push(
                        {
                            name: names[parseInt(Math.random() * names.length)],
                            description: 'Loren Ipsum adg egkznv sg sdgwedg sdgg',
                            img: 'prod_0' + parseInt(Math.random() * 10) + '.jpg',
                            price: 1000 + Math.random() * 20000
                        }
                    );
                }

                return products;
            }
        }

    });
