angular.module('repo.controllers.ListController', [])
    .controller('ListController',
        function ($scope, $state, $stateParams, DBService, UtilService) {

            console.log("------------------ $stateParams = " + JSON.stringify($stateParams, null, 2));

            $scope.products = UtilService.getFakeProducts(10);

        }
    )
;
