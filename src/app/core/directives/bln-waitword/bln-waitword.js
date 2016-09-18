(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('blnWaitword', blnWaitword);

    /** @ngInject */
    function blnWaitword($interval)
    {
        return {
            restrict: 'EA',
            scope: {
            waiting: '@',
            active: '=?'
            },
            transclude: true,
            template: '<sapn ng-if="!active" ng-transclude></sapn>' + 
                    '<sapn ng-if="active">' + 
                        '{{waiting}}' + 
                        '<span style="display: inline-block;width: 30px;text-align: left;">{{point}}</span>' + 
                    '</sapn>',
            link: function(scope) {
            scope.point = '';
                $interval(function() {
                scope.point = scope.point == ' . . .' ? '' : scope.point + ' .';
            }, 800);
            }
        };
    }
})();