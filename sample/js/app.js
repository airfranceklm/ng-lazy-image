(function (angular) {
    'use strict';

    angular.module('sample-app', ['afkl.lazyImage'])
    .controller('appCtrl', ['$scope', function mainCtrl($scope) {

        var changeImageUrl = function() {
            var color = Math.floor(Math.random()*16777215).toString(16);
            return '//placehold.it/768x599/' + color + '/ffffff';
        };

        $scope.count = 0;
        $scope.collection = [];
        $scope.searchText = 1;

        $scope.checked = false;
        
        $scope.images = [
            {
                srcset: '//placehold.it/480x240/00a1de/ffffff 480w, //placehold.it/768x384/00a1de/ffffff 768w',
                ratio: '2-1'
            }
        ];

        $scope.destroy = function() {
            $scope.images = null;
            $scope.$destroy();
        };

        $scope.changeImage = function () {
            $scope.runtimeImageSrc = changeImageUrl();
        };

        /* build random item list */
        for (var i = 0; i < 20; i++) {
            $scope.collection.push({
                type: Math.floor(Math.random() * 2) + 1,
                number: i + 1,
                srcset: changeImageUrl()
            });
        }

        $scope.changeImage();

    }])
    .directive('sampleCount', function () {

        // var count = 0;

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                return attrs.$observe("afklLazyImageLoaded", function (value) {
                    if (window.console) {
                        window.console.log('IMAGE LOADED:', value);
                    }
                });
            }
        };

    });











})(angular);