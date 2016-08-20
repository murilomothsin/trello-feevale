app.controller("UserCtrl", function($scope, User){
    $scope.user = {};

    $scope.Register = function(event){
        console.log($scope.user);
        UserService.register($scope.user).then(function(dataUser){
            console.log(dataUser);
            $state.go("login");
        }, function(error){
            $scope.errors = error.data.data;
        })
    }
});