/**
 * Created by Administrator on 2016/11/10 0010.
 */
angular.module("service",[])
    .service("Main",["$http","$rootScope",function ($http,$rootScope) {
        return {
            "main":function () {
                $http.get("js/groups.json",{})
                    .then(function (res) {
                        // console.log(res);
                        $rootScope.$broadcast("mainData",res.data)
                    },function (error) {
                        console.log(error)
                    })
            }
        }
    }])