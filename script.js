
(function(angular) {
  'use strict';
var app = angular.module('tablesDirective', []);

  app.factory('coordinatesService', function ($window) {
    return {      
      randomIntFromInterval: function (min, max, even) {
        if(even == true){
          return this.makeEven($window.Math.floor($window.Math.random()*(max-min+1)+min), max);
        }
        return $window.Math.floor($window.Math.random()*(max-min+1)+min);        
      },
      isUniqueValue: function (generatedValue, usedValues) {      
        var isUnique = true;
        for(var i = 0; i < usedValues.length; i++){
          if(generatedValue == usedValues[i]){
            isUnique = false;
          }
        }
        if(isUnique == false)
          return false;
        return true;
      },
      makeEven: function(number, max){        
        if(number %2 > 0){
          if(number == max){
           number = number -1;
          }else{
           number = number +1;
          }
        }
        return number;
      },
      getTableValues: function(quantity, xeven = false, yeven = false){
        var data = [];
        var xValues = [];
        var yValues = [];
        var min = 1;
        var max = 10;

        if(max < quantity){
          console.log('table values quantity cant be more than max value');
          return false;
        }

        for(var i = 0; i < quantity; i++){

          var xVal = 0;
          var yVal = 0;
          var xUnique = false;
          var yUnique = false;

          data[i] = {};

          while(xUnique == false){
            xVal = this.randomIntFromInterval(min, max, xeven);

            if(this.isUniqueValue(xVal, xValues)){            
              xValues[i] = data[i].x = xVal;
              xUnique = true;
            }
          }

          while(yUnique == false){
            yVal = this.randomIntFromInterval(min, max, yeven);

            if(this.isUniqueValue(yVal, yValues)){            
              yValues[i] = data[i].y = yVal;
              yUnique = true;
            }
          }
        }
        return data;
      },
      drawGraphs: function($scope){
        for (var i = 0; i < $scope.tables.length; i++) {

            $scope.tables[i].maxx = 0;
            $scope.tables[i].maxy = 0;

          var arrLength = $scope.tables[i].items.length;
          for (var k = 0; k < arrLength; k++) {
              // Find Maximum X Axis Value
              if ($scope.tables[i].items[k].x > $scope.tables[i].maxx)
                $scope.tables[i].maxx = $scope.tables[i].items[k].x;
              if ($scope.tables[i].items[k].y > $scope.tables[i].maxy)
                $scope.tables[i].maxy = $scope.tables[i].items[k].y;
          }
        }
        return $scope;
      }
    }    
  });
  
  app.controller('TabsCtrl', ['$scope', 'coordinatesService', function($scope, coordinatesService) {

    $scope.tabs = [{
            title: 'One',
            url: 'one.tpl.html'
        }, {
            title: 'Two',
            url: 'two.tpl.html'
        }
    ];

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
        if(tab.title == "One"){
          $scope.tables = [];
          $scope.tables.push({ items: coordinatesService.getTableValues(5), type: 'dot'});          
        } else {
          $scope.tables = [];
          $scope.tables.push({ items: coordinatesService.getTableValues(5, true), type: 'bar'});        
        }
    }
    
    $scope.isActiveTab = function(tabUrl) {        
        $scope = coordinatesService.drawGraphs($scope);
        return tabUrl == $scope.currentTab;
    }

    $scope.tables = [];
    $scope.tables.push({ items: coordinatesService.getTableValues(5), type: 'dot'});

    $scope.width = 300;
    $scope.height = 150;
    $scope.yAxis = 'y';
    $scope.xAxis = 'x';

    $scope = coordinatesService.drawGraphs($scope);

  }])
  .directive('table', function() {
    return {
      templateUrl: 'table.html'
    };
  })
  .directive('graph', function() {
    return {
      templateUrl: 'graph.html'
    };
  });
})(window.angular);