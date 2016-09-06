angular.module('repo.controllers.ProductController', [])
    .controller('ProductController',
        function ($scope, $stateParams, DBService, UtilService) {

            console.log("------------------ $stateParams = " + JSON.stringify($stateParams, null, 2));

            $scope.product = _.find(UtilService.getFakeProducts(10), {id:parseInt($stateParams.sku)});
            console.log("------------------ $scope.product = " + JSON.stringify($scope.product, null, 2));

            $scope.featured = UtilService.getFakeProducts(4);

        }
    )
;
