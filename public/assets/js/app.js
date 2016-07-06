var backendURL = "https://solucionelo-backend.herokuapp.com/api/rest";

var app = angular.module('solucioneloApp', []);		

app.controller('RegistrationCtrl',function($scope, $http) {
	$http.get(backendURL + '/services'
	).success(function(data) {			
		$scope.services = data;
	});
	
});
