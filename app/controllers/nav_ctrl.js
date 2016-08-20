app.controller("NavCtrl", function($scope, localStorageService){

    $scope.logged = false;
    console.log("lalala");
    console.log(localStorageService.get("token"));
    if(localStorageService.get("token") !== undefined){
        $scope.logged  = true;
        $scope.name = localStorageService.get("name");
    }

})