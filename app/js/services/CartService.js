angular.module('repo.services.CartService', [])
    .factory('CartService', function ($q, $http) {

        var theCart = {
            products: [],
            productsTotal: 0,
            deliveryCost: 0,
            //
            addProduct: function addProduct(product, quantity) {
                quantity = quantity || 1;

                var prod = _.find(theCart.products, {id: product.id});

                if (_.isUndefined(prod)) {
                    var prod2add = _.cloneDeep(prod);
                    prod2add.quantity = quantity;
                    theCart.product.push(prod2add);
                }
                else {
                    prod.quantity += quantity;
                }

                theCart.productsTotal += quantity * product.price;
            },
            removeProduct: function remove(product) {
                for (var i = 0; i < theCart.products.length; ++i) {
                    if (theCart.products[i].id == product.id) {
                        theCart.elems.splice(i, 1);
                        theCart.productsTotal -= product.quantity * product.price;
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
            getTotal: function getTotal(){
                return theCart.productsTotal + theCart.deliveryCost;
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
