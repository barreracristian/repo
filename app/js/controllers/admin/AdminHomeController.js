angular.module('repo.controllers.admin.AdminHomeController', [])
    .controller('AdminHomeController',
        function ($scope, $state, DBService, UtilService, FilterService) {

            console.log("------------------ AdminHomeController");

            $scope.lastOrders = [
                {id:1, date:moment(), client_id:2, ammount:1424, status:'waiting'},
                {id:2, date:moment(), client_id:3, ammount:347235, status:'processed'},
                {id:3, date:moment(), client_id:4, ammount:4634, status:'canceled'},
            ];

            $scope.lastClients = [
                {id:1, date:moment(), client_id:2, mobile_number:"56925366346", status:'new'},
                {id:2, date:moment(), client_id:3, mobile_number:"56925452323", status:'processed'},
                {id:3, date:moment(), client_id:4, mobile_number:"56979677567", status:'new'},
            ];

            $scope.clients = [
                {id:2, name:'Juan', lastname:'Perez'},
                {id:3, name:'Pedro', lastname:'Zuñiga'},
                {id:4, name:'Luis', lastname:'Corrales'},
            ]


        }
    )
;
