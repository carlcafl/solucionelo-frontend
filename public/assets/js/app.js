var backendURL = "https://solucionelo-backend.herokuapp.com/api/rest";

var app = angular.module('solucioneloApp', []);		

app.controller('RegistrationCtrl',function($scope, $http) {
	$scope.idTypes = [
	                  {
	                	  id: "CC",
	                	  name: "Cedula de ciudadania"
	                  },
	                  {
	                	  id: "PA",
	                	  name: "Pasaporte"
	                  },
	                  {
	                	  id: "TI",
	                	  name: "Tarjeta de identidad"
	                  }
	                  ]
	$scope.user = {
			idType: null,
			idNumber: null,
			registeredDate: null,
			ipAddress: null,
			firstName: null,
			lastName: null,
			phoneNumber: null,
			mobileNumber: null,
			email: null,
			city: null,
			offeredServices: []
	};
	$scope.services = null;
	$http.get(backendURL + '/services'
	).success(function(data) {			
		$scope.services = data;
	});
	
});
