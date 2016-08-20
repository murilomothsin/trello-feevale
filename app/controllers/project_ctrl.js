app.controller("ProjectController", function($scope, $state, $stateParams, isLogged, ProjectList, Project, User){
  $scope.project = {}
  $scope.boards = []

  if(ProjectList !== null)
    $scope.projects = ProjectList.data.projects;

  if($stateParams.id !== undefined){
    Project.get($stateParams.id).then(function(dataProj){
      $scope.project = dataProj.data.project;
      $scope.boards = dataProj.data.project.boards;
    }, function(err){
      // Caso ocorra algum erro, exibe o erro e redireciona para a página de projetos
      //var id = Flash.create('danger', "Erro: "+err.data.data+"!", 0, {class: 'flash-position'});
      $state.go('projects');
    })
  }

  $scope.addTeam = function(){
    User.getAll().then(function(data){
      console.log(data);
      $scope.users = data.data;
      $("#modal-team").modal('show');
    })
  }

  $scope.addRemoveTeamMember = function(UserId){
    if(UserId == $scope.project.creator)
      return ;
    if($scope.project.team.indexOf(UserId) !== -1){
      $scope.project.team.splice($scope.project.team.indexOf(UserId), 1);
    }else
      $scope.project.team.push(UserId);
  }

  $scope.checkTeam = function(UserId){
    if(UserId == $scope.project.creator)
      return true;
    return $scope.project.team.indexOf(UserId) !== -1;
  }

  $scope.addTask = function(board, name){
    board.tasks.push({name: name});
  }

  $scope.removeTask = function(board, index){
    if(board.tasks[index]._id !== undefined){
      board.tasks[index].deleted = true;
    }else{
      board.tasks.splice(index, 1);
    }
  };

  $scope.newBoard = function(){
    var name = prompt("Nome do novo quadro?");
    if(name !== '' && name !== null)
      $scope.boards.push({name: name, tasks: []});
  }

  $scope.save = function(){
    $scope.project.boards = $scope.boards;
    Project.save($scope.project).then(function(dataProj){
      console.log(dataProj);
      //var id = Flash.create('success', "Projeto salvo!", 3000, {class: 'flash-position'});
      $state.go('projects');
    },function(err){
      //var id = Flash.create('danger', "Erro: "+error.data.data+"!", 0, {class: 'flash-position'});
    })
  }

  $scope.addBoard = function(){
    $scope.boards.push({name: $scope.boardName});
    $scope.boardName = '';
  }

  $scope.removeBoard = function(index){
    if($scope.boards[index]._id !== undefined){
      $scope.boards[index].deleted = true;
    }else{
      $scope.boards.splice(index, 1);
    }
  }

  // Quando um quadro é solto, o Array é reordenado
  $scope.onDropComplete = function (index, obj, evt) {
    if(obj.tasks !== undefined){
      var otherObj = $scope.boards[index];
      var otherIndex = $scope.boards.indexOf(obj);
      $scope.boards[index] = obj;
      $scope.boards[otherIndex] = otherObj;
    }
  }

  $scope.onDropTaskComplete = function (index, obj, evt, indexBoard) {
    console.log(indexBoard);
    console.log(obj);
    if(obj.tasks === undefined){
      var otherObj = $scope.boards[indexBoard].tasks[index];
      var otherIndex = $scope.boards[indexBoard].tasks.indexOf(obj);
      $scope.boards[indexBoard].tasks[index] = obj;
      $scope.boards[indexBoard].tasks[otherIndex] = otherObj;
    }
  }
});