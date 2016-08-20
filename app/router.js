app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: "/",
            views: {
                "navbar": { templateUrl: "app/views/nav.html", controller: "NavCtrl" },
                "content": { templateUrl: "app/views/home/home.html" }
            }
        })
        .state('register', {
            url: "/register",
            views: {
                "navbar": { 
                    templateUrl: "app/views/nav.html",
                    controller: "NavCtrl" 
                },
                "content": {
                    templateUrl: "app/views/users/register.html",
                    controller: "UserCtrl"
                }
            }
        })
        .state('login', {
            url: "/login",
            views: {
                "navbar": { 
                    templateUrl: "app/views/nav.html",
                    controller: "NavCtrl" 
                },
                "content": {
                    templateUrl: "app/views/users/login.html",
                    controller: "UserCtrl"
                }
            }
        })
        .state('projects', {
            url: "/projects",
            views: {
                "navbar": { 
                    templateUrl: "app/views/nav.html",
                    controller: "NavCtrl" 
                },
                "content": {
                    templateUrl: "app/views/projects/index.html",
                    controller: "ProjectController"
                }
            },
            resolve: {
                isLogged: function(User){
                    return User.is_logged();
                },
                ProjectList: function(Project){
                    return Project.getAll();
                }
            }
        })
        .state('projects-new', {
            url: "/projects/new",
            views: {
                "navbar": { 
                    templateUrl: "app/views/nav.html",
                    controller: "NavCtrl" 
                },
                "content": {
                    templateUrl: "app/views/projects/new.html",
                    controller: "ProjectController"
                }
            },
            resolve: {
                isLogged: function(User){
                    return User.is_logged();
                },
                ProjectList: function(Project){
                    return null;
                }
            }
        })
        .state('projects-edit', { //projects-edit({id: 'adiaosjdias'})
            url: "/projects/{id:string}/edit/",
            views: {
                "navbar": { 
                    templateUrl: "app/views/nav.html",
                    controller: "NavCtrl" 
                },
                "content": {
                    templateUrl: "app/views/projects/edit.html",
                    controller: "ProjectController"
                }
            },
            resolve: {
                isLogged: function(User){
                    return User.is_logged();
                },
                ProjectList: function(Project){
                    return null;
                }
            }
        });

    $urlRouterProvider.otherwise("/");
});

app.run(function($rootScope, $state, localStorageService) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // Caso ocorra um erro na rota, esse teste garante que se for um 404 (Sem autorização) o usuário
    // é redirecionado para o home com uma mensagem de erro.
    if (error.status === 401) {
      //var id = Flash.create('danger', error.data.data, 0, {class: 'flash-position'});
      localStorageService.remove("token");
      $state.go("home");
    }
  });
});