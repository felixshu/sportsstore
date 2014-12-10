/**
 * Created by FelixGrayson on 2014/12/4.
 */
angular.module("sportApp")
    .controller('cartSummaryCtrl', ['$scope', 'cart', function ($scope, cart) {
        $scope.cartData = cart.getProduct();

        $scope.priceSum = function () {
            var total = 0;
            for (var i = 0; i < $scope.cartData.length; i++) {
                total += ($scope.cartData[i].price * $scope.cartData[i].count)
            }
            return total;
        };

        $scope.remove = function (id) {
            cart.removeProduct(id);
        };


    }]);