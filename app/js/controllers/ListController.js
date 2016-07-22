angular.module('repo.controllers.ListController', [])
    .controller('ListController',
        function ($scope, $state, $stateParams, DBService) {

            console.log("------------------ $stateParams = " + JSON.stringify($stateParams, null, 2));
            console.log("------------------ $stateParams.cats = " + $stateParams.cats);



        }
    )
;
