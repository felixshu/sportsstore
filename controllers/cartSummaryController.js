/**
 * Created by FelixGrayson on 2014/12/4.
 */
angular.module("sportApp")
.controller('cartSummaryCtrl', ['$scope', 'cart', function ($scope,cart) {
        $scope.cartData = cart.getProduct();

        $scope.total = function () {
            var total = 0;
            for (var i = 0; i < cartData.length; i++) {
                total += (cartData[i].price * cartData[i].count)
            }
            return total;
        };

        $scope.remove = function (id) {
            cart.removeProduct(id);
        }
}]);