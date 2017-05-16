/**
 * @ngdoc Component
 * @name LambdaLauncher.component.header
 *
 * @module LambdaLauncher
 *
 * @description
 * header component - A application header
 *
 * @author Mohan Singh ( gmail::mslogicmaster@gmail.com, skype :: mohan.singh42 )
 */
(function () {
  'use strict';
  angular
    .module('LambdaLauncher')
    .component('appHeader', {
      templateUrl: 'app/components/header/header.html',
      bindings : {
        isAuthenticated : '<'
      },
      controller: [
        '$log',
        'Backand',
        function ($log, Backand) {
          var $ctrl = this;

          /**
           * component's lifeCycle hooks
           */
          $ctrl.$onInit = initialization;

          /**
           * public methods
           */
          $ctrl.logout = logout;
          /**
           * public properties
           */
          /**
            * @function
            * @name initialization
            * @description
            * A component's lifeCycle hook which is called after all the controllers on an element have
            * been constructed and had their bindings initialized
            */
          function initialization() {
            $log.info('header component initialized');
          }

          function logout() {
            Backand.signout().then(function () {
              $state.go('login');
            });
          }
        }]
    })
})();
