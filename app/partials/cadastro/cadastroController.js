(function () {
  'use strict';
  var app = angular.module('votaCampinas');
  var cadastroController = function ($scope, $rootScope, $location, $window, $auth) {
    $scope.user = {};
    $scope.user.birthDate = '16/11/1994';

    $scope.enviar = function () {
      $scope.user.gender = $('#sexo').val();

      console.log($scope.user);

      $auth.signup($scope.user)
        .then(function (response) {
          $auth.setToken(response);
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/account');
        })
        .catch(function (response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function (response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function (response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };

    $('select').material_select();
    $('#data-nascimento').mask('00/00/0000');
  };

  app.controller('cadastroController', cadastroController);
}());
