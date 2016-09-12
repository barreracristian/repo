angular.module('repo.controllers.CartController', [])
    .controller('CartController',
        function ($scope, $state, DBService, UtilService) {

            $scope.cart = {
                products: UtilService.getFakeProducts(4)
            };

            $scope.finished = false;

            $scope.finish = function () {
                $scope.finished = true;
            }

        }
    )
;
