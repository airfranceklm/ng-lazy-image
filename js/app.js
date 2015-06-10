(function (angular) {
    'use strict';
    angular.module('sample-app', ['afkl.lazyImage'])
    .controller('appCtrl', ['$scope', function mainCtrl($scope) {

        $scope.count = 0;

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
            var color = Math.floor(Math.random()*16777215).toString(16);
            $scope.runtimeImageSrc = '//placehold.it/768x599/' + color + '/ffffff';
        }

        $scope.changeImage();


    }])
    .directive('sampleCount', function () {
        'use strict';
        var count = 0;

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