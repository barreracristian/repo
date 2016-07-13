angular.module('repo.services.DBService', [])

    .factory('DBService', function ($q, $http) {

        function getProducts() {
            return getAny('products');
        }

        function getAny(what){
            var q = $q.defer();
            console.time("TIME get" + what);
            $http.get('/api/' + what)
                .success(function (data) {
                    console.timeEnd("TIME get" + what);
                    q.resolve(data);
                })
                .error(function (error) {
                    console.log('Error get' + what + ': ' + error);
                    q.reject(error);
                });
            return q.promise;
        }

        return {
            getProducts: getProducts
        }
    })
;
