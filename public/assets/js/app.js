var backendURL = "https://solucionelo-backend.herokuapp.com/api/rest";

var app = angular.module('solucioneloApp', ["checklist-model"]);		

app.controller('RegistrationCtrl',function($scope, $http) {
	$scope.idTypes = [
	                  {
	                	  id: "CC",
	                	  name: "Cedula"
	                  },
	                  {
	                	  id: "PA",
	                	  name: "Pasaporte"
	                  }
	                  ]
	$scope.user = {
			idType: $scope.idTypes[0].id,
			idNumber: null,
			registeredDate: null,
			firstName: null,
			lastName: null,
			phoneNumber: null,
			mobileNumber: null,
			email: null,
			referrer: null,
			ipAddress: null,
			offeredServices: [],
			otherServices: null
	};
	$scope.acceptance = false;
	$scope.otherService = null;
	$scope.ipAddress = null;
	var json = 'https://ipv4.myexternalip.com/json';
	var resIp = $http.get(json);
	resIp.success(function(result) {
	    $scope.ipAddress = result.ip;
	    $scope.user.ipAddress = result.ip; 
	});
	resIp.error(function(data, status, headers, config) {
		$scope.ipAddress = null;
		$scope.user.ipAddress = null;
	});

	$scope.services = null;
	$http.get(backendURL + '/services'
	).success(function(data) {			
		$scope.services = data;		
	});
	
	$scope.create = function() {
		if ($scope.user.offeredServices.length==0 && $scope.otherService==null) {
			document.getElementById("servicesValidation").innerText="Debes seleccionar al menos una profesión.";
			return;
		} else {
			document.getElementById("servicesValidation").innerText="";
			$scope.submitted = true;
			var res = $http.post(backendURL + '/users',$scope.user);
			res.success(function(data, status, headers, config) {	
				//Evento de analytics
				ga('send', {
					  hitType: 'event',
					  eventCategory: 'registro',
					  eventAction: 'registro',
					  eventLabel: ''
					});
				$scope.user = {
						idType: $scope.idTypes[0].id,
						idNumber: null,
						registeredDate: null,
						ipAddress: $scope.ipAddress,
						firstName: null,
						lastName: null,
						phoneNumber: null,
						mobileNumber: null,
						email: null,
						referrer: null,						
						offeredServices: [],
						otherServices: null
				};
				$scope.acceptance = false;
				$scope.submitted = false;
				$scope.otherService = null;
				showAlert('#successMessage');
			});
			res.error(function(data, status, headers, config) {			
				alert('Error');
			});
		}
		
	}
	
});

function showAlert(alertId) {
	$(alertId).show();
	window.setTimeout(function() {$(alertId).hide();}, 2000);
}
