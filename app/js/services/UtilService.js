angular.module('repo.services.UtilService', [])
    .factory('UtilService', function ($q, $http) {

        var brands = [
            {name:'Toyota', models:['Yaris', 'Corolla', 'Corona']},
            {name:'Hyundai', models:['Accent', 'Elantra']},
            {name:'Nissan', models:['Tiida', 'v16']},
        ];

        var productFamilies = [
            {type:"frenos", name:'Pastillas de Frenos', items:["frenos_01","frenos_02","frenos_03","frenos_04","frenos_05"]},
            {type:"filtro", name:'Filtro de Aire', items:["filtroaire_01","filtroaire_02","filtroaire_03","filtroaire_04","filtroaire_05"]},
            {type:"embrague", name:'Kit de Embrague', items:["embrague_01","embrague_02","embrague_03","embrague_04","embrague_05"]},
        ];

        var theProducts = createFakeProducts();

        function createFakeProducts() {
            var ret = [];
            for (var i = 0; i < productFamilies.length; ++i) {
                var productFamily = productFamilies[i];

                for(var j=0; j<productFamily.items.length; ++j){
                    var item = productFamily.items[j];

                    var prod = {
                        id: 100 + i,
                        name: productFamily.name + " " + i,
                        type: productFamily.type,
                        description: 'Loren Ipsum adg egkznv sg sdgwedg sdgg',
                        img: "products/" + item + '.jpg',
                        price: 1000 + Math.random() * 20000,
                        fit: []
                    };

                    for (var k = 0; k < Math.random() * 10; ++k) {
                        var brand = anyOf(brands);
                        prod.fit.push({
                            brand: brand.name,
                            model: anyOf(brand.models),
                            years: years(2 + parseInt(Math.random(10)))
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
            getFakeProducts: function (count) {
                return theProducts.slice(0, count);
            }
        }

    });
