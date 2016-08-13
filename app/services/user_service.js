app.service("User", function($http){

    this.New = function(user){
        return $http({
                    method: 'POST',
                    url: 'http://localhost:3000/users',
                    data: user
                });
    } 

})