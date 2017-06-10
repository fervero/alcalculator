var calcApp = angular.module("calcApp", []);

calcApp.controller("mainController", function($scope) {
  $scope.drinkRecord = [];
  $scope.message = "Hello";
  $scope.availableDrinks = [
    {name: "vodka", proof: "45", vol: "40"},
    {name: "beer", proof: "6", vol: "500"}
  ];
  $scope.addDrink = function() {
    console.log("gulp!");
    $scope.drinkRecord.push({ name: Math.random().toString() });
  }
});