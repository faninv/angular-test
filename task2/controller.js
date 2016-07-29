angular.module('listApp.controllers', [])
.controller('listController', ['ListFactory', '$scope', '$state',
    function(ListFactory, $scope, $state) {
      $scope.objectIndex = '';
      $scope.form = {};
      var id = 0;
      $scope.itemList = ListFactory.getList();

      $scope.changeState = function (state) {
          $state.go(state);
      };
      
      $scope.add = function() {        
        $scope.form = {};
        $scope.objectIndex = '';
        $scope.message = 'add new item';
      };

      $scope.edit = function(id) {        
        for(var i = 0; i < $scope.itemList.length; i++){
          if($scope.itemList[i].id == id){
            $scope.form = angular.copy($scope.itemList[i]);
            $scope.objectIndex = i;
          }
        }
        $scope.message = 'edit item id: '+id+'; value: '+$scope.form.itemName;
      };

      $scope.save = function() {
        if($scope.itemList == null)$scope.itemList = [];        
        if($scope.itemList[$scope.objectIndex] == null) {
          //if this is new record, add it in users array
          if($scope.form != null && $scope.form.itemName != null){
            
            $scope.form.id = 1;
            if($scope.itemList.length > 0)
              $scope.form.id = $scope.itemList[$scope.itemList.length - 1].id + 1;            

            $scope.itemList.push($scope.form);
            ListFactory.setList($scope.itemList);
          }

        } else {
          //for existing record, find this record using id
          //and update it.
          $scope.itemList[$scope.objectIndex] = $scope.form;          
          ListFactory.setList($scope.itemList);
        }

        //clear the add record form
        $scope.form = {};
        $scope.objectIndex = '';
        $scope.changeState('list');
      };

      $scope.delete = function(id) {
        $scope.itemList.splice(id,1);        
        ListFactory.setList($scope.itemList);

        if($scope.itemList.length < 1){          
          localStorage.removeItem('itemList');
        }
      };
}]);