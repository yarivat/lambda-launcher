/**
 * @ngdoc Component
 * @name LambdaLauncher.component.appFunctions
 *
 * @module LambdaLauncher
 *
 * @description
 * appFunctions component - Manage applications Lambda functions
 *
 * @author Mohan Singh ( gmail::mslogicmaster@gmail.com, skype :: mohan.singh42 )
 */
(function () {
  'use strict';
  angular
    .module('LambdaLauncher')
    .component('appFunctions', {
      templateUrl: 'app/components/appFunctions/appFunctions.html',
      controller: [
        'Lambda',
        '$log',
        '$state',
        '_',
        function (Lambda, $log, $state, _) {
          var $ctrl = this;

          /**
           * component's lifeCycle hooks
           */
          $ctrl.$onInit = initialization;

          /**
           * public methods
           */
          $ctrl.runFunction = runFunction;
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
            var params = {
              pageSize: 200,
              filter: [
                {
                  fieldName: "actionType",
                  operator: "equals",
                  value: "Function"
                }
              ]
            };
            Lambda
              .getFunctions(params)
              .then(function (data) {
                functionsHandler(data);
              }).catch(function (data) {
                $log.error(data);
              });
          }

          function functionsHandler(data) {
            var functions = data ? data.data : [];
            $ctrl.functions = functions;
            if (functions.length > 0) {
              updateFunctionParameters(functions);
            }
          }

          function updateFunctionParameters(functions) {
            _.forEach(functions, function (f) {
              $log.info('function', f);
              if (!_.isEmpty(f.inputParameters)) {
                var params = _.split(f.inputParameters, ',');
                $log.info('inputParameters', f);
                params = _.map(params, function (p) {
                  return {
                    name: p,
                    value: '',
                    key: _.camelCase(p)
                  }
                });
                Lambda
                  .saveParameters(f.iD, params);
              }
            });
          }

          function runFunction(func) {
            Lambda
              .getParameters(func.iD)
              .then(function (parameters) {
                if (containsEmptyValue(parameters)) {
                  $state.go('dashboard.parameters', { function_id: func.iD });
                  return;
                }
                var params = {};
                _.forEach(parameters, function (p) {
                  params[p.name] = p.value;
                });
                Lambda
                  .runFunction(func.name, params)
                  .then(function (response) {
                    $log.info('Function run successful', response);
                  }, function (error) {
                    $log.error('Function run error', error);
                  });
              });
          }

          function containsEmptyValue(params) {
            return _.every(params, ['value', '']);
          }


          //end of controller
        }]
    });
})();
