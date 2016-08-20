app.controller("ProjectController", function($scope, $state, $stateParams){
  $scope.project = {}
  $scope.boards = []

  if(projectList !== undefined)
    $scope.projects = projectList.data.projects;

  if($stateParams.id !== undefined){
    ProjectService.get($stateParams.id).then(function(dataProj){
      $scope.project = dataProj.data.project;
      $scope.boards = dataProj.data.project.boards;
    }, function(err){
      // Caso ocorra algum erro, exibe o erro e redireciona para a página de projetos
      //var id = Flash.create('danger', "Erro: "+err.data.data+"!", 0, {class: 'flash-position'});
      $state.go('projects');
    })
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
    if(name !== '')
      $scope.boards.push({name: name, tasks: []});
  }

  $scope.save = function(){
    $scope.project.boards = $scope.boards;
    ProjectService.save($scope.project).then(function(dataProj){
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
    var otherObj = $scope.boards[index];
    var otherIndex = $scope.boards.indexOf(obj);
    $scope.boards[index] = obj;
    $scope.boards[otherIndex] = otherObj;
  }
});