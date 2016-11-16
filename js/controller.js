/**
 * Created by Administrator on 2016/11/10 0010.
 */
angular.module("controller",[])

    .controller("mainCtrl",["$scope","Main","$rootScope",function ($scope,Main,$rootScope){
        Main.main();
        var i = 0;
        $rootScope.allNum = 0;
        $rootScope.allPrice = 0;
        $rootScope.data = [];
        $rootScope.history={};

        $scope.$on("mainData",function (e,data) {
            $scope.mainList = data;
            $scope.change(0);
        })

        if (localStorage.getItem("dinner")){
            var res = JSON.parse(localStorage.getItem("dinner"));
            $rootScope.data = res.data;
            console.log($rootScope.data);
            $rootScope.allNum = res.allNum;
            $rootScope.allPrice = res.allPrice;
        };

        $scope.init = function (mVal) {
            angular.forEach($rootScope.data,function (lVal,lIdx) {
                angular.forEach(mVal,function (iVal,iIdx) {
                    if (iVal.id == lVal.id){
                        iVal.count = lVal.count;
                    }
                })
            })
        }

        $scope.change = function (index) {
            $scope.mainList[i].ifChose = false;
            $scope.mainList[index].ifChose = true;
            i = index;

            $scope.init($scope.mainList[index].items);

            $scope.mainTitle = $scope.mainList[index].name;
            $scope.mainRight = $scope.mainList[index].items;

        }

        $scope.decrease = function (idx) {
            var that = $scope.mainList[i].items[idx];
            that.count--;
            $rootScope.allNum--;
            $rootScope.allPrice -= that.price;
            $rootScope.addLocalStorage(that);
        }

        $scope.increase = function (idx) {
            var that = $scope.mainList[i].items[idx];
            that.count++;
            // console.log(that.count);
            $rootScope.allNum++;
            $rootScope.allPrice += that.price;
            $rootScope.addLocalStorage(that);

        }

        $rootScope.addLocalStorage = function (that) {
            $rootScope.data.push(that);
            for (var n=0;n<$rootScope.data.length-1;n++){
                if ($rootScope.data[n].id == that.id){
                    $rootScope.data.splice(n,1);
                    // console.log(111);
                }
            }
            console.log($rootScope.data);
            $rootScope.history.data = $rootScope.data;
            $rootScope.history.allNum = $rootScope.allNum;
            $rootScope.history.allPrice = $rootScope.allPrice;
            // console.log($rootScope.history);
            localStorage.setItem("dinner",angular.toJson($rootScope.history));
        }
    }])
    
    .controller("menuCtrl",["$scope","$rootScope",function ($scope,$rootScope) {
        $scope.decrease = function (idx) {
            var that = $rootScope.data[idx];
            that.count--;
            $rootScope.allNum--;
            $rootScope.allPrice -= that.price;
            $rootScope.addLocalStorage(that);
        }
        $scope.increase = function (idx) {
            var that = $rootScope.data[idx];
            that.count++;
            $rootScope.allNum++;
            $rootScope.allPrice += that.price;
            $rootScope.addLocalStorage(that);
        }

        $scope.isShow = false;
        $scope.sendAll = function () {
            $scope.isShow = true;
        }
        $scope.yes = function () {
            $scope.isShow = false;
            location.href = "#/reStart";
        }
        $scope.no = function () {
            $scope.isShow = false;
        }
    }])

    .controller("restartCtrl",["$scope",function ($scope) {
        $scope.backToMain = function () {
            localStorage.clear();
            location.href = "#/main";
        }
    }])
