(function () {
    'use strict';

    angular
        .module('app.spaces', [
            //'flow'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider, msApiProvider, $stateProvider, $translatePartialLoaderProvider) {

        // State
        $stateProvider
            .state('app.spaces', {
                url: '/spaces',
                authenticate: true,
                resolve: {
                    mySpaces: function (apiResolver, $rootScope, Util) {
                        return apiResolver.resolve('space@getMySpaces')
                            .then(function (mySpaces) {
                                $rootScope.current = $rootScope.current || {};
                                $rootScope.current.mySpaces = mySpaces;

                                mySpaces.forEach(function (space, index) {
                                    var itemName, title;
                                    if(space.name.indexOf('mySpace_')!== -1){
                                        itemName = 'spaces.'+'mySpace';
                                        title = 'mySpace';
                                    } else {
                                        itemName = 'spaces.'+Util.dotToDashInString(space.name);
                                        title = space.name;
                                    }
                                                                    
                                    //space folder
                                    msNavigationServiceProvider.saveItem(itemName, {
                                        title: title,
                                        icon     : 'icon-code-string',
                                        //state: state,
                                        weight: 2
                                    });
                                    //space home
                                    var spaceHomeItem = itemName + '.home';
                                    var state = 'app.spaces.home({spaceId:'+space._id+'})'
                                    msNavigationServiceProvider.saveItem(spaceHomeItem, {
                                        title: 'home',
                                        state: state,
                                        weight: 1
                                    });
                                    //space circles
                                    var spaceHomeItem = itemName + '.circles';
                                    //var appEngine = space.getAppByName('appEngine');
                                    var state = 'app.spaces.app.circle({spaceId:'+space._id+',appId:2'+'})'
                                    msNavigationServiceProvider.saveItem(spaceHomeItem, {
                                        title: 'circles',
                                        state: state,
                                        weight: 1
                                    });
                                })
                            });
                    }
                }
            })
            .state('app.spaces.dashboard', {
                url: '/dashboard',
                authenticate: true,
                views: {
                    'content@app': {
                        templateUrl: 'app/main/spaces/views/dashboard/dashboard.html',
                        controller: 'SpaceDashboardController as vm'
                    }
                },
                bodyClass: 'ecommerce'
            })
            .state('app.spaces.home', {
                url: '/:spaceId',
                authenticate: true,
                views: {
                    'content@app': {
                        templateUrl: 'app/main/spaces/views/space/home.html',
                        controller: 'SpaceHomeController as vm'
                    }
                },
                bodyClass: 'ecommerce'
            });;

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/spaces');

        // Api
        //msApiProvider.register('apiSpace', [api.space]);

        // Navigation
        msNavigationServiceProvider.saveItem('spaces', {
            title: 'Spaces',
            group: true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('spaces.dashboard', {
            title: 'Dashboard',
            state: 'app.spaces.dashboard',
            icon     : 'icon-apps',
            weight: 1
        });

    }

})();