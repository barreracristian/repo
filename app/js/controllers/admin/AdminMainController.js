angular.module('repo.controllers.admin.AdminMainController', [])
    .controller('AdminMainController',
        function ($scope, $rootScope, $state) {

            // Current

            $scope.current = undefined;

            $scope.isCurrent = function (page) {
                return page == $scope.current;
            };

            $scope.setCurrent = function(page){
                $scope.current = page;
            };

            $rootScope.loading = 0;

            //

        }
    )
;
