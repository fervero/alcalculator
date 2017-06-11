var calcApp = angular.module("calcApp", []);

calcApp.service('calcService', function() {
  var ethanolDensity = 0.789;
  this.calculateOneDrink = function(drinksNumber, vol, proof) {
    var calc = drinksNumber * vol * proof / 100;
    return Number.isNaN(calc) ? 0 : calc * ethanolDensity;
  }
});

calcApp.controller("mainController", ['$scope', 'calcService', function($scope, $calcService) {
  $scope.drinkRecord = [];
  $scope.calculateOneDrink = $calcService.calculateOneDrink;
  $scope.availableDrinks = [
    {type: "vodka", proof: "45", vol: "40"},
    {type: "beer", proof: "6", vol: "500"}
  ];
  $scope.addDrink = function() {
    $scope.drinkRecord.push({ name: Math.random().toString() });
  }
  $scope.drinksSum = function() {
    return ($scope.drinkRecord)
      .reduce(
        function(acc, drink) { 
          return acc + drink.number 
        }, 0);
  }
}]);


calcApp.directive("oneDrink", function() {
  return {
    templateUrl: 'views/one-drink.html',
    require: 'ngModel',
    replace: true,
    scope: {
      drinkObject: "=",
      drinkList: "=",
      selectedDrink: "=",
      calculate: "&"
    }
  }
});