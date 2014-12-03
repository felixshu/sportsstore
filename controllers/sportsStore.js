/**
 * Created by FelixGrayson on 2014/12/1.
 */
var sportApp = angular.module('sportApp', ['ui.utils', 'CustomerFilter',"cart", "ngRoute"])
.config(function($routeProvider){
        $routeProvider.when("/checkout", {
            templateUrl:"/public/checkoutSummary.html"
        });

        $routeProvider.when("/products",{
            templateUrl:"/public/productList.html"
        });

        $routeProvider.otherwise({
            templateUrl:"/public/productList.html"
        });
    });

sportApp.constant("dataUrl", "https://api.parse.com/1/classes/Products")
    .run(function($http){
        $http.defaults.headers.common["X-Parse-Application-Id"]
        = "PKqa9sIFXEdYJi08OzVAssQhLxsQjfrm1a7sDGC3";
        $http.defaults.headers.common["X-Parse-REST-API-Key"]
        ="qWQBK4zHmeGZp3hDKCUM7WNJq5AN9Ob3aMFutYe0";
    })
    .controller('sportStoreCtrl', ['$scope', '$http','dataUrl', function ($scope, $http, dataUrl) {

        $scope.items = {};
        $http.get(dataUrl)
            .success(function (data) {
            $scope.items.products = data.results;
            console.log($scope.items.products);
        })
            .error(function(response) {
                $scope.items.error = response.error || response;
            });
    }]);