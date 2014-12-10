/**
 * Created by FelixGrayson on 2014/12/1.
 */
var sportApp = angular.module('sportApp', ['ui.utils', 'CustomerFilter', "cart", "ngRoute", "ui.bootstrap"])
    .config(function ($routeProvider) {
        $routeProvider.when("/complete", {
            templateUrl: "/public/thanks.html"
        });

        $routeProvider.when("/placeorder", {
            templateUrl: "/public/placeOrder.html"
        });

        $routeProvider.when("/checkout", {
            templateUrl: "/public/checkoutSummary.html"
        });

        $routeProvider.when("/products", {
            templateUrl: "/public/productList.html"
        });

        $routeProvider.otherwise({
            templateUrl: "/public/productList.html"
        });
    });

sportApp.constant("dataUrl", "https://api.parse.com/1/classes/Products")
    .constant("orderUrl", "https://api.parse.com/1/classes/Order")
    .run(function ($http) {
        $http.defaults.headers.common["X-Parse-Application-Id"]
            = "PKqa9sIFXEdYJi08OzVAssQhLxsQjfrm1a7sDGC3";
        $http.defaults.headers.common["X-Parse-REST-API-Key"]
            = "qWQBK4zHmeGZp3hDKCUM7WNJq5AN9Ob3aMFutYe0";
    })
    .controller('sportStoreCtrl', ['$scope', '$location', '$http', 'dataUrl', 'orderUrl', 'cart', function ($scope, $location, $http, dataUrl, orderUrl, cart) {

        $scope.items = {};
        $http.get(dataUrl)
            .success(function (data) {
                $scope.items.products = data.results;
                console.log($scope.items.products);
            })
            .error(function (response) {
                $scope.items.error = response.error || response;
            });
        /**
         * 1. deeply copy a array from the cart
         * 2. use ajax post request to the specified URL and data, and consider about success and error methods. After being succeed we need clear the cart.
         * 3. use then method on hte promise the returned by the $http.post method.
         **/
        $scope.sendOrder = function (shippingDetails) {
            var order = angular.copy(shippingDetails);
            order.products = cart.getProduct();
            $http.post(orderUrl, order)
                .success(function (data) {
                    $scope.items.orderId = data.objectId;
                    cart.getProduct().length = 0;
                })
                .error(function (error) {
                    $scope.items.orderError = error;
                })
                .finally(function () {
                    $location.path("/complete");
                });
        };
    }]);