(function ()
{
    'use strict';

    angular
        .module('app.auth.register-v2', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.auth_register-v2', {
            url      : '/register-v2',
            views    : {
                'main@'                          : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.auth_register-v2': {
                    templateUrl: 'app/auth/register-v2/register-v2.html',
                    controller : 'RegisterV2Controller as vm'
                }
            },
            bodyClass: 'register-v2'
        });

        // Translate
        $translatePartialLoaderProvider.addPart('app/auth/register-v2');

        /*

        // Navigation
        msNavigationServiceProvider.saveItem('auth.register-v2', {
            title : 'Register v2',
            state : 'app.auth_register-v2',
            weight: 4
        });
        */
    }

})();