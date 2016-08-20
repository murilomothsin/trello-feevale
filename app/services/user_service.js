app.service("UserService", function($http){

  this.register = function(params){
    return $http.post("http://localhost:3000/users/register", params);
  }

  this.login = function(params){
    return $http.post("http://localhost:3000/users/login", params);
  }
});