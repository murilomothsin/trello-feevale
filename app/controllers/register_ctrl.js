app.controller("RegisterCtrl", function($scope, User){
    $scope.user = {};

    $scope.Save = function(){
        console.log($scope.user);
        User.New($scope.user).then(function(data){
            console.log(data);
        }, function(err){
            console.log("Error");
            console.log(err);
        })
    }
});