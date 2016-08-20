app.service("User", function($http, localStorageService){

  this.register = function(params){
    return $http.post("http://localhost:3000/users/sign_up", params);
    /*
    $http({
      method: "PUT",
      url: "http://localhost:3000/users/sign_up",
      data: params
    });
    */
  }

  this.login = function(params){
    return $http.post("http://localhost:3000/users/sign_in", params);
  }

  this.getAll = function(){
    return $http.get("http://localhost:3000/users/");
  }

  this.get = function(id){
    return $http.get("http://localhost:3000/users/"+id);
  }

  this.is_logged = function(){
    var token = localStorageService.get("token");
    return $http.post("http://localhost:3000/users/valid_token", {token: token});
  }
});