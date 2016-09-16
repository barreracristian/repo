angular.module('repo.services.CartService', [])
    .factory('CartService', function ($q, $http) {

        var theCart = {
            products: [],
            deliveryCost: 0,
            //
            addProduct: function addProduct(product, quantity) {
                quantity = quantity || 1;

                var prod = _.find(theCart.products, {id: product.id});

                if (!prod) {
                    var prod2add = _.cloneDeep(product);
                    prod2add.quantity = quantity;
                    theCart.products.push(prod2add);
                }
                else {
                    prod.quantity = quantity;
                }
            },
            removeProduct: function remove(product) {
                for (var i = 0; i < theCart.products.length; ++i) {
                    if (theCart.products[i].id == product.id) {
                        theCart.products.splice(i, 1);
                        break;
                    }
                }
            },
            hasProduct: function hasProduct(product) {
                if (!product) {
                    return false;
                } else {
                    return !!_.find(theCart.products, {id: product.id});
                }
            },
            getSubTotal: function getTotal(){
                var sum = 0;
                _.each(theCart.products, function(prod){
                    sum += prod.quantity * prod.price;
                });

                return sum;
            },
            getTotal: function getTotal(){
                var sum = 0;
                _.each(theCart.products, function(prod){
                    sum += prod.quantity * prod.price;
                });

                return sum + theCart.deliveryCost;
            },
            getProductsCount: function getProductsCount(){
                var sum = 0;
                _.each(theCart.products, function(prod){
                   sum += prod.quantity
                });
                return sum;
            }
        };

        return {
            getCart: function () {
                return theCart;
            },
            reset: function reset() {
                theCart.products = [];
                theCart.productsTotal = 0;
                theCart.deliveryCost = 0;
                return theCart;
            }
        }

    });
