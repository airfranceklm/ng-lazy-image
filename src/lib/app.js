(function (ng) {
    'use strict';
    ng.module('app', ['afkl.lazyImage'])
    .controller('appCtrl', ['$scope', function mainCtrl($scope) {

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

    }]);

})(angular);