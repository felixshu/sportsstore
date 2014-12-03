/**
 * Created by FelixGrayson on 2014/12/3.
 */

angular.module("sportApp")
    .constant("itemsPerPage", 4)
    .constant("ActiveClass", "active")
    .controller('productListCtrl', ['$scope','$filter', 'itemsPerPage', 'ActiveClass', function ($scope, $filter,itemsPerPage, ActiveClass) {
        var selectedCategory = null;
        $scope.selectCategory = function (newCategory) {
            selectedCategory = newCategory;
            $scope.selectedPage = 1;
        };

        $scope.categoryFilterFn = function (item) {
            return selectedCategory == null || item.category == selectedCategory;
        };

        $scope.itemNum = function (category) {
            var count = $scope.items.products.filter(function (x) {
                return x.category == category
            });
            return count.length;
        };

        $scope.selectedPage = 1;
        $scope.pageSize = itemsPerPage;

        $scope.selectPage = function (newPage) {
            $scope.selectedPage = newPage;
        };

        $scope.getPageClass = function (page) {
            return $scope.selectedPage == page ? ActiveClass : "";
        };

        $scope.getCategoryClass = function (category) {
            return selectedCategory == category;
        };
    }]);
