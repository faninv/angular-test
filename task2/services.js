angular.module('listApp.services', [])
  .factory('ListFactory', function() {
  	var list = [];
    var listStore = localStorage.getItem("itemList");
    if (listStore != null && listStore != '' && angular.isArray(angular.fromJson(listStore))) {
      list = angular.fromJson(listStore);
    }

  	var listSrv = {
      setList: function(newList) {
        list = newList;
        localStorage.setItem("itemList", angular.toJson(list));
        return true;
      },
      getList: function() {
        if (list != null) {
          return list;
        } else {
          return [];
        }
      }
    };
    return listSrv;
  });