app.config(function($stateProvider, $urlRouterProvider) {
  
    $stateProvider
        .state('home', {
            url: "/",
            views: {
                "navbar": { templateUrl: "app/views/nav.html" },
                "content": { templateUrl: "app/views/home/home.html" }
            }
        })
        .state('register', {
            url: "/register",
            views: {
                "navbar": { templateUrl: "app/views/nav.html" },
                "content": { 
                    templateUrl: "app/views/register/form.html",
                    controller: "RegisterCtrl"
                }
            }
        });

    $urlRouterProvider.otherwise("/");
});