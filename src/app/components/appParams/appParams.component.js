/**
 * @ngdoc Component
 * @name LambdaLauncher.component.appParams
 *
 * @module LambdaLauncher
 *
 * @description
 * appParams component - A component to configure settings of an application
 *
 * @author Mohan Singh ( gmail::mslogicmaster@gmail.com, skype :: mohan.singh42 )
 */
(function () {
  'use strict';
  angular
    .module('LambdaLauncher')
    .component('appParams', {
      templateUrl: 'app/components/appParams/appParams.html',
      controller: [
        '$log',
        function ($log) {
          var $ctrl = this;

          /**
           * component's lifeCycle hooks
           */
          $ctrl.$onInit = initialization;

          /**
           * public methods
           */
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
            getFunctions();
          }

          function getFunctions() {

          }

        }]
    })
})();
