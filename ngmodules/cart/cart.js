/**
 * Created by FelixGrayson on 2014/12/3.
 */
angular.module("cart", [])
    .factory("cart", function () {
        var cartData = [];
        return {

            addProduc: function (id, name, price) {
                var addedToExistingItem = false;
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].objectId == id) {
                        cartData[i].count++;
                        addedToExistingItem = true;
                        break;
                    }
                }
                if (!addedToExistingItem) {
                    cartData.push({
                        count: 1, objectId: id, price: price, name: name
                    });
                }
            },

            removeProduct: function (id) {
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].objectId == id) {
                        cartData.splice(i, 1);
                        break;
                    }
                }
            },

            getProduct: function () {
                return cartData;
            }
        }
    })
    .directive("cartSummary", function (cart) {
        return {
            restrict: "E",
            templateUrl: "ngmodules/cart/cartSummary.html",
            controller: function ($scope) {
                var cartData = cart.getProduct();

                $scope.total = function () {
                    var total = 0;
                    for (var i = 0; i < cartData.length; i++) {
                        total += (cartData[i].price * cartData[i].count)
                    }
                    return total;
                };

                $scope.itemCount = function () {
                    var total = 0;
                    for (var i = 0; i < cartData.length; i++) {
                        total += cartData[i].count;
                    }
                    return total;
                };
            }
        }
    });
