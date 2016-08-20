app.controller("UserCtrl", function($scope, $state, localStorageService, User){
    $scope.user = {};

    $scope.Register = function(event){
        console.log($scope.user);
        User.register($scope.user).then(function(dataUser){
            console.log(dataUser);
            $state.go("login");
        }, function(error){
            $scope.errors = error.data.data;
        })
    }

    $scope.Login = function(){
        console.log($scope.user);
        User.login($scope.user).then(function(dataUser){
            console.log(dataUser);
            localStorageService.set("token", dataUser.data.token);
            localStorageService.set("name", dataUser.data.user.name);
            $state.go("projects");
        }, function(err){
            console.log(err);
            //$scope.errors = error.data.data;
        })
    }


});