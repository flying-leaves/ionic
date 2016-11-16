/**
 * Created by Administrator on 2016/11/10 0010.
 */
angular.module("myApp",["ionic","controller","service"])
    .config(["$stateProvider","$urlRouterProvider",function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state("main",{
                url:"/main",
                        templateUrl:"template/main.html",
                        controller:"mainCtrl",
                        cache:"false"
            })
            .state("menu",{
                url:"/menu",
                templateUrl:"template/menu.html",
                controller:"menuCtrl",
                cache:"false"
            })
            .state("reStart",{
                url:"/reStart",
                templateUrl:"template/reStart.html",
                controller:"restartCtrl"
            })

        $urlRouterProvider.otherwise("/main");
    }])

