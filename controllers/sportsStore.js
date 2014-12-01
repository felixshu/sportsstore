/**
 * Created by FelixGrayson on 2014/12/1.
 */
var sportApp = angular.module('sportApp', ['ui.utils']);

sportApp.controller('sportStoreCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('/components/test.json').success(function (data) {
        $scope.items = data;
        console.log($scope.items);
    })
        .error(function (data) {
            console.log(data);
        });

    var selectedCategory = null;
    $scope.selectCategory = function(newCategory){
        selectedCategory = newCategory;
    };

    $scope.categoryFilterFn = function(item){
        return selectedCategory == null || item.category ==  selectedCategory;
    };

    $scope.itemNum = function(item){
        return item.length;

        console.log(item.length);
    };
}]);