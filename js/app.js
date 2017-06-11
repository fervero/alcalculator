var calcApp = angular.module("calcApp", []);

calcApp.service('calcService', function() {
  var ethanolDensity = 0.789;
  var genderCoefficient = { 
    "male": 5/3, 
    "female": 10/7 
  }
  var soberingTime = 1 / 0.15;
  this.calculateOneDrink = function(drinksNumber, vol, proof) {
    var calc = drinksNumber * vol * proof / 100;
    return Number.isNaN(calc) ? 0 : calc * ethanolDensity;
  }
  this.calculateBAC = function(bodyMass, gender, ethanolMass) {
    return genderCoefficient[gender] * ethanolMass / bodyMass;
  }
  this.calculateSoberingTime = function(bac) {
    return bac * soberingTime;
  }
});

calcApp.service('idService', function() {
  this.id = 0;
  this.getID = function() {
    return ++this.id;
  }
});

calcApp.controller("mainController", ['$scope', 'calcService', 'idService', function($scope, $calcService, $idService) {
  $scope.drinkRecord = [];
  $scope.calculateOneDrink = $calcService.calculateOneDrink;
  $scope.BAC = $calcService.calculateBAC;
  $scope.calculateTime = $calcService.calculateSoberingTime;
  $scope.gender = "male";
  $scope.bodyMass = 75;
  $scope.availableDrinks = [
    {type: "vodka", proof: 45, vol: 40},
    {type: "beer", proof: 5.5, vol: 500},
    {type: "wine", proof: 12, vol: 100},
    {type: "whisky, gin, tequila", proof: 40, vol: 40},
    {type: "liqueur", proof: 18, vol: 40},
    {type: "dwarven spirit", proof: 100, vol: 40}
  ];
  $scope.addDrink = function() {
    $scope.drinkRecord.push({ 
      name: $idService.getID(),
      number: 1,
      vol: 0,
      proof: 0
    });
  }
  $scope.drinksSum = function() {
    return ($scope.drinkRecord)
      .reduce(
        function(acc, drink) { 
          return acc + drink.ethanol
        }, 0);
  }
  $scope.destroyRow = function(ID) {
    var elemIndex = $scope.drinkRecord.findIndex(function(elem) {
      return elem.name === ID
    });
    $scope.drinkRecord.splice(elemIndex, 1);
  }
  $scope.$on("killme", function(e, arg) {
    $scope.destroyRow(arg);
  });
}]);

calcApp.directive("oneDrink", function() {
  return {
    templateUrl: 'views/one-drink.html',
    require: 'ngModel',
    controller: 'mainController',
    replace: true
  }
});