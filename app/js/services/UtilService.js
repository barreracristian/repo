angular.module('repo.services.UtilService', [])
    .factory('UtilService', function ($q, $http) {

        var theProducts = createFakeProducts(30);

        function createFakeProducts(count) {
            var brands = ["Toyota", "Hyundai", "Nissan"];
            var models = ["V16", "Tiida", "Accent"];
            var types = ["frenos", "filtros", "aceites"];
            var names = ["freno", "kit de embrague", "filtro de aire", "carburador", "luces de cambio", "aceite", "filtro de aceite", "pastillas de freno", "filtro de aire"];
            var products = [];

            for (var i = 0; i < count; ++i) {
                var prod = {
                    id: 100 + i,
                    name: anyOf(names),
                    type: anyOf(types),
                    description: 'Loren Ipsum adg egkznv sg sdgwedg sdgg',
                    img: 'prod_0' + parseInt(Math.random() * 10) + '.jpg',
                    price: 1000 + Math.random() * 20000,
                    fit: []
                };

                for (var j = 0; j < Math.random() * 10; ++j) {
                    prod.fit.push({
                        brand: anyOf(brands),
                        model: anyOf(models),
                        years: years(2 + parseInt(Math.random(10)))
                    });
                }

                products.push(prod);
            }

            function anyOf(array) {
                return array[parseInt(Math.random() * array.length)];
            }

            function years(count) {
                var years = [];
                for (var i = 0; years.length < count; ++i) {
                    var year = parseInt(2000 + (Math.random() * 16));
                    if (years.indexOf(year) < 0) {
                        years.push(year);
                    }
                }
                return years;
            }

            return products;
        }

        return {
            getFakeProducts: function (count) {
                return theProducts.slice(0, count);
            }
        }

    });
