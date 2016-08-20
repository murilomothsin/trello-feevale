app.service("ProjectService", function($http, localStorageService){

  this.getAll = function(){
    return $http.get("http://localhost:3000/projects", { headers: { 'Authorization': localStorageService.get('token') } });
  }

  this.get = function(id){
    return $http.get("http://localhost:3000/projects/"+id, { headers: { 'Authorization': localStorageService.get('token') } });
  }

  this.save = function(data = {}){
    var url = "http://localhost:3000/projects";
    var method = "POST";
    if(data._id !== undefined){
      url = url + "/" + data._id;
      method = "PUT";
    }
    return $http({
      url: url,
      method: method,
      headers: {
        'Authorization': localStorageService.get('token')
      },
      data: data
    });
  }

});