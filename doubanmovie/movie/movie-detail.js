/**
 * Created by Administrator on 2016/10/25.
 */
var md = angular.module("app.movieDetail" ,[]);
md.controller("MovieDetailController" ,
    ["$scope" ,"$http" ,"URLConfig" ,"$route" ,"$rootScope","$routeParams",
    function( $scope ,$http,URLConfig , $route,$rootScope ,$routeParams ){

        var movieId = $routeParams.movieId;
        var appurl = URLConfig.appURL;
        var url = appurl + "/subject/" + movieId + "?callback=movieDetailCallBack";
        console.log(url)
        $http.jsonp(url).error(function(){

        })
        window.movieDetailCallBack = function (jsonData) {
            $scope.movie = jsonData;
        }
    }]);
