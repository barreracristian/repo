angular.module('repo.services.UtilService', [])
    .factory('UtilService', function ($q, $http, FilterService) {

        var brands = [
            {name: 'Toyota', img:'logo_toyota.png', models: ['Yaris', 'Corolla', 'Corona']},
            {name: 'Hyundai', img:'logo_hyundai.png', models: ['Accent', 'Elantra']},
            {name: 'Nissan', img:'logo_nissan.png', models: ['Tiida', 'v16']}
        ];

        var productFamilies = [
            {
                type: "frenos",
                img: 'type_frenos.jpg',
                name: 'Pastillas de Frenos',
                items: ["frenos_01", "frenos_02", "frenos_03", "frenos_04", "frenos_05"]
            },
            {
                type: "filtro",
                img: 'type_filtros.jpg',
                name: 'Filtros de Aire',
                items: ["filtroaire_01", "filtroaire_02", "filtroaire_03", "filtroaire_04", "filtroaire_05"]
            },
            {
                type: "embrague",
                img: 'type_embragues.jpg',
                name: 'Kit de Embrague',
                items: ["embrague_01", "embrague_02", "embrague_03", "embrague_04", "embrague_05"]
            }
        ];

        var theProducts = createFakeProducts();

        function createFakeProducts() {
            var ret = [];
            for (var i = 0; i < productFamilies.length; ++i) {
                var productFamily = productFamilies[i];

                for (var j = 0; j < productFamily.items.length; ++j) {
                    var item = productFamily.items[j];

                    var prod = {
                        id: 100 + 10 * i + j,
                        name: productFamily.name + " " + 10 * i + j,
                        type: productFamily.type,
                        description: 'Loren Ipsum adg egkznv sg sdgwedg sdgg',
                        img: "products/" + item + '.jpg',
                        price: 1000 + Math.random() * 20000,
                        fits: []
                    };

                    for (var k = 0; k < Math.random() * 10; ++k) {
                        var brand = anyOf(brands);
                        prod.fits.push({
                            brand: brand.name,
                            model: anyOf(brand.models),
                            year: years(2 + parseInt(Math.random(10)))
                        });
                    }

                    ret.push(prod);
                }

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

            return ret;
        }


        return {
            getAllProducts: function () {
                return theProducts;
            },
            getFeaturedProducts: function (count) {
                return theProducts.slice(0, count);
            },
            getProductById: function (id) {
                return _.find(theProducts, {id: parseInt(id)});
            },
            filter2url: function (appliedFilters) {
                console.log("------------------ appliedFilters = " + JSON.stringify(appliedFilters, null, 2));
                if (!appliedFilters) return undefined;
                return _.map(appliedFilters, function (af) {
                    return af.key + ":" + af.value;
                }).join("-");
            },
            url2filter: function (str) {
                //brand:Hyundai-model:Corona
                return _.map(str.split("-"), function (f) {
                    return {
                        key: f.split(":")[0],
                        value: f.split(":")[1]
                    }
                });
            },
            getHomeBrands: function(){
                return [
                    brands[0], brands[1], brands[2]
                ]
            },
            getHomeTypes: function(){
                return [
                    productFamilies[0], productFamilies[1], productFamilies[2]
                ]
            }
        }

    });
