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
			ARLAffiliated: null,
			bankAccount: null,
			age: null,
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
		if ($scope.user.offeredServices.length==0 && $scope.user.otherServices==null) {
			document.getElementById("servicesValidation").innerHTML="Debes seleccionar al menos una profesi&oacute;n, o ingresar OTRA.";
			return;
		} else {
			document.getElementById("servicesValidation").innerHTML="";
			showLoading();
			$scope.submitted = true;
			$scope.user.ARLAffiliated = document.getElementById("ARLAffiliated").checked;
			$scope.user.bankAccount = document.getElementById("bankAccount").checked;
			var res = $http.post(backendURL + '/users',headers: {'Access-Control-Allow-Origin': '*'},$scope.user);
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
						ARLAffiliated: null,
						bankAccount: null,
						age: null,
						offeredServices: [],
						otherServices: null
				};
				$scope.acceptance = false;
				$scope.submitted = false;
				$scope.otherService = null;
				hideLoading();
				showAlert('#successMessage');
			});
			res.error(function(data, status, headers, config) {			
				hideLoading();
				alert('Error grabando el registro. Por favor intenta nuevamente.');
			});
		}
		
	}
	
});

function showAlert(alertId) {
	$(alertId).show();
	window.setTimeout(function() {$(alertId).hide();}, 2000);
}

function showLoading() {
	document.getElementById('loadingDiv').style.display = 'block';
}

function hideLoading() {
	document.getElementById('loadingDiv').style.display = 'none';
}

function turnOnSwitch() {
	$("[name='ARLAffiliated']").bootstrapSwitch();	
	$("[name='bankAccount']").bootstrapSwitch();
}