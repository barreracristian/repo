angular.module('repo.services.DBService', [])
    .factory('DBService', function ($q, $http, $rootScope) {

        function getAny(what) {
            var q = $q.defer();
            console.time('TIME get-' + what);
            $http.get('/api/any', {params: {table: what}})
                .success(function (data) {
                    console.timeEnd('TIME get-' + what);
                    q.resolve(data);
                })
                .error(function (error) {
                    console.log('ERROR get-' + what + ': ' + error);
                    q.reject(error);
                });
            return q.promise;
        }

        function loading(f) {
            $rootScope.loading = $rootScope.loading || 0;
            $rootScope.loading++;
            return f["finally"](
                function () {
                    $rootScope.loading--;
                }
            );
        }

        return {
            getProducts: function () {
                return loading(getAny('products'));
            },
            getFits: function () {
                return loading(getAny('fits'));
            },
            getOrders: function () {
                return loading(getAny('orders'));
            },
            getClients: function () {
                return loading(getAny('clients'));
            }
        }

    });
