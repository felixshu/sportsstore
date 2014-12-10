/**
 * Created by FelixGrayson on 2014/12/10.
 */
var admin = angular.module('sportsStoreAdmin', ["ngRoute", "cart"])
    .config(function ($routeProvider) {

        $routeProvider.when("/login", {
            templateUrl: "/public/adminLogin.html"
        });

        $routeProvider.when("/main", {
            templateUrl: "/public/adminMain.html"
        });
        $routeProvider.when("/products", {
            templateUrl: "/public/productList.html"
        });

        $routeProvider.otherwise({
            redirectTo: "/login"
        });
    });

admin.constant("authUrl", "https://api.parse.com/1/login")
    .constant("orderUrl","https://api.parse.com/1/classes/Order")
    .run(function ($http) {
        $http.defaults.headers.common["X-Parse-Application-Id"]
            = "PKqa9sIFXEdYJi08OzVAssQhLxsQjfrm1a7sDGC3";
        $http.defaults.headers.common["X-Parse-REST-API-Key"]
            = "qWQBK4zHmeGZp3hDKCUM7WNJq5AN9Ob3aMFutYe0";
    })
    .controller('authCtrl', ['$scope', '$http', '$location', 'authUrl', function ($scope, $http, $location, authUrl) {
        $scope.authenticate = function (user, pwd) {
            $http.get(authUrl, {
                params: {
                    username: user,
                    password: pwd
                }
            }).success(function (data) {
                $scope.$broadcast("sessionToken", data.sessionToken);
                $http.defaults.headers.common["X-Parse-Session-Token"] = data.sessionToken;
                $location.path("/main");
            }).error(function (response) {
                $scope.authenticationError = response.error || response;
            });
        };

        $scope.inputType = 'password';
        $scope.showPassword = function () {
            if ($scope.inputType == 'password') {
                $scope.inputType = 'text';
            }
            else {
                $scope.inputType = 'password';
            }
        };
    }])
    .controller('mainCtrl', ['$scope', function ($scope) {
        $scope.screens =["Products", "Orders"];
        $scope.current= $scope.screens[0];

        $scope.setScreen = function(index){
            $scope.current = $scope.screens[index];
        };
        $scope.getScreen = function(){
            return $scope.current == "Products" ? "/public/adminProducts.html":"/public/adminOrders.html";
        };
}])
    .controller('orderCtrl', ['$scope', '$http','orderUrl', function ($scope,$http,orderUrl) {
        $http.get(orderUrl)
            .success(function(data){
                $scope.orders = data.results;
            })
            .error(function (response) {
                $scope.error = response.error || response;
            });

        $scope.selectOrder={};
        $scope.selectOrder = function(order){
            $scope.selectOrder = order;
        };

        $scope.calTotal = function (order) {
            var total = 0;
            for (var i = 0; i < order.products.length; i++) {
                total += order.products[i].count * order.products[i].price;
            }
            return total;
        }
    }]);