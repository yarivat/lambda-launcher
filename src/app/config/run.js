/**
 * @ngdoc run
 * @name LambdaLauncher.run
 *
 * @module LambdaLauncher
 *
 * @description
 * application run block to configure setting when providers are ready
 * 
 * @author Mohan Singh ( gmail::mslogicmaster@gmail.com, skype :: mohan.singh42 )
 */
(function () {
  'use strict';

  angular
    .module('LambdaLauncher')
    .run(run);
  /** @ngInject */
  function run(Auth, $rootScope, App) {
    //unregister lodadh lib from window. lodadh '_' is available as dependency
    window._ = undefined;

    //authenticate route before state transition
    Auth.AutherizeRoutes();
    var unregisterListner = $rootScope.$on('$stateChangeStart', function (event, to) {
      var data = (to.$$route) ? to.$$route : to.data;
      App.isLoginRequired = data.requiresLogin;
      App.pageTitle = data.title;
    });

    $rootScope.$on('$destroy', unregisterListner);
  }
})();
