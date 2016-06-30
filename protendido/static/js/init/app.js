var app = angular.module("protendidoApp",['ngRoute','ngResource','ngMaterial','ngMessages']);

app.config( function($routeProvider){


    $routeProvider
        .when('/', {
	    	templateUrl:'static/js/app/views/index.html', controller: 'AppController'
	    })

	    .when('/retangular', {
	    	templateUrl:'static/js/app/views/retangular.html', controller: 'RetangularController'
	    })

	    .when('/te', {
	    	templateUrl:'static/js/app/views/te.html', controller: 'TeController'
	    })

        .otherwise({redirectTo: '/'});

});
