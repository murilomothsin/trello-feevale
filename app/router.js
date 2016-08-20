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
                    templateUrl: "app/views/users/register.html",
                    controller: "UserCtrl"
                }
            }
        })
        .state('login', {
            url: "/login",
            views: {
                "navbar": { templateUrl: "app/views/nav.html" },
                "content": {
                    templateUrl: "app/views/users/login.html",
                    controller: "UserCtrl"
                }
            }
        });

    $urlRouterProvider.otherwise("/");
});