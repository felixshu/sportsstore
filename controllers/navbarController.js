/**
 * Created by FelixGrayson on 2014/12/5.
 */
angular.module("sportApp")
    .controller('navbarController', ['$scope', function ($scope) {
        var brand = null;
        $scope.selectBrand = function(newBrand){
            brand = newBrand;
        }
    }]);