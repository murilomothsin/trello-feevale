app.controller("NavCtrl", function($scope, localStorageService){

    $scope.logged = false;
    if(localStorageService.get("token") !== null){
        $scope.logged  = true;
        $scope.name = localStorageService.get("name");
    }

})