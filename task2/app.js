(function(angular) {
	angular.module('listApp', ['listApp.services', 'listApp.controllers', 'ui.router'])
	.config(
		function($stateProvider, $urlRouterProvider) {
		    $stateProvider
			  	.state('list', {
			      url: "/list",
			      views: {
			        "list": {
			        	templateUrl: "list.html"
			        }        
			      }
			    })    
			    .state('add', {
			      url: "/list/add",
			      views: {
			        "form": {
			        	templateUrl: "form.html"
			        }		
			      }			      
			    })
			    .state('edit', {
			      url: "/list/edit/:id",
			      views: {
			        "form": {
			        	templateUrl: "form.html"
			    	}
			      }
			    });
  			$urlRouterProvider.otherwise('/list');
		}
	);
})(window.angular);