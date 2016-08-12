/**
 * This is for the graph anchor in order to show up the graph only when the
 * button is clicked this uses graph in d3.js.
 * Created by Minki Chung / Daniel Suh on 8/9/16.
 */
;(function() {
  angular
      .module('ganchor')
      .controller('ganchorCtrl', ['$scope', function($scope) {
          $scope.graphOn = false;
          $scope.bettingOn = false;
          $scope.kisweOn = false;

          $scope.graphTurnOn = function() {
            $scope.kisweOn=true;
            $scope.graphOn=true;
            $scope.bettingOn=false;
          };

          $scope.bettingTurnOn = function() {
            $scope.kisweOn=true;
            $scope.graphOn=false;
            $scope.bettingOn=true;
          };

          $scope.returnHome = function() {
            $scope.kisweOn=false;
            $scope.graphOn=false;
            $scope.bettingOn=false;
          };
      }]);
})();
