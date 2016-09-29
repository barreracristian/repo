angular.module('repo.services.DBService', [])
    .factory('DBService', function ($q, $http, $rootScope) {

        function getAny(what, values) {
            var q = $q.defer();
            console.time('TIME getany-' + what);
            var params = {table: what};
            if (values) {
                params.values = values;
            }

            $http.get('/api/any', {params: params})
                .success(function (data) {
                    console.timeEnd('TIME getany-' + what);
                    q.resolve(data);
                })
                .error(function (error) {
                    console.log('ERROR getany-' + what + ': ' + error);
                    q.reject(error);
                });
            return q.promise;
        }

        function insertAny(where, values) {
            var q = $q.defer();
            console.time('TIME insert-in-' + where);
            $http.put('/api/any', {table: where, values: values})
                .success(function (data) {
                    console.timeEnd('TIME insert-in-' + where);
                    q.resolve(data);
                })
                .error(function (error) {
                    console.log('ERROR insert-in-' + where + ': ' + error);
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
            },
            createOrder: function (client_id, price, paid, comments, meta, delivery_for) {
                return insertAny('orders', {
                    client_id: client_id,
                    price: price,
                    paid: paid,
                    comments: comments,
                    meta: meta,
                    delivery_for: delivery_for
                })
            },
            createClient: function (email, mobile_number, name, rut) {
                return insertAny('clients', {
                    email: email,
                    mobile_number: mobile_number,
                    first_name: name,
                    rut: rut
                })
            },
            createAddress: function (client_id, street, detail, commune) {
                return insertAny('addresses', {
                    street: street,
                    detail: detail,
                    commune: commune
                }).then(function (ret) {
                    return insertAny('client_address', {
                        client_id: client_id,
                        address_id: ret.id,
                        last: true,
                        garage: false
                    }).then(function(){
                        return ret;
                    })
                });
            },
            getClient: function (email, mobile_number) {
                var q = $q.defer();
                getAny('clients', {email: email, mobile_number: mobile_number}).then(function (anys) {
                    if (anys && anys.length == 1) {
                        q.resolve(anys[0]);
                    } else {
                        q.reject();
                    }
                });

                return q.promise;
            },
            getClientAddresses: function (client) {
                var q = $q.defer();
                getAny('client_address', {client_id: client.id}).then(function (ca) {
                    if (ca && ca.length > 0) {
                        getAny('addresses', {id: ca.address_id}).then(function (a) {
                            if (a && a.length > 0) {
                                q.resolve(a);
                            } else {
                                q.reject();
                            }
                        });
                    } else {
                        q.reject();
                    }
                });
                return q.promise;
            }
        }

    });
