/**
 * @ngdoc constant
 * @name LambdaLauncher.config
 *
 * @module LambdaLauncher
 *
 * @description
 * setup application routes
 * @todo move component specific routes to component directory
 * 
 * @author Mohan Singh ( gmail::mslogicmaster@gmail.com, skype :: mohan.singh42 )
 */
(function () {
  'use strict';

  angular
    .module('LambdaLauncher')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        component: 'signin',
        data: {
          title: 'Login'
        }
      })
      .state('dashboard', {
        absolute: true,
        url: '/dash',
        data: {
          requiresLogin: true
        },
        template: '<ui-view></ui-view>'
      })
      .state('dashboard.apps', {
        url: '/apps',
        data: {
          requiresLogin: true,
          title: 'My Applications'
        },
        component: 'apps'
      })
      .state('dashboard.appFunctions', {
        url: '/app-functions/:app_id',
        component: 'appFunctions',
        data: {
          requiresLogin: true,
          title: 'Functions'
        },
      })
      .state('dashboard.parmas', {
        url: 'app/:app_id/params/:param_id',
        component: 'appParams',
        data: {
          requiresLogin: true,
          title: 'Parameters'
        }
      });

    $urlRouterProvider.otherwise('/login');
  }

})();
