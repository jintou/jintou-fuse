(function ()
{
    'use strict';

    angular
        .module('app.spaces')
        .controller('SpaceHomeController', SpaceHomeController);

    /** @ngInject */
    function SpaceHomeController($rootScope,$stateParams)
    {
        var vm = this;

        var spaceId = parseInt($stateParams.spaceId);

        vm.mySpaces = $rootScope.current.mySpaces;

        vm.active = {};

        vm.mySpaces.forEach(function(space,index){
            if(space._id === spaceId){
                vm.active.mySpace = space;
            }
        })

    }
})();
