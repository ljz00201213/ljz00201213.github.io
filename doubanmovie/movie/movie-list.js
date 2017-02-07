/**
 * Created by Administrator on 2016/10/25.
 */
var mlmodule =  angular.module("app.movieList" ,[]);
//首先分清楚这个控制器当中需要做哪些事

mlmodule.controller("MovieListController" ,
    ["$scope","URLConfig","$routeParams","$http","$rootScope","$route",
    function($scope ,$URLConfig ,$routeParams ,$http ,$rootScope ,$route){
        //配置页面显示的个数 和获取数据的api
        var count = $URLConfig.page_size || 20;
        var appurl = $URLConfig.appURL;
        //获取分类的类型
        var type = $routeParams.type || "in_theaters";
        var page = $routeParams.page || 1;
        $scope.currentPage = page;
        $scope.type = type;
        $scope.loading = true;
        $scope.size = count;
        //请求数据 我需要一个接口,这个接口必须是一个完整的接口
        var url = appurl  +"/"+type + "?count="+count+"&start=" + page + "&callback=movieListCallBack";


        $http.jsonp(url).error(function(){

        })
        window.movieListCallBack = function(jsonData){

            console.log(jsonData);
            $scope.title = jsonData.title;
            $scope.total = jsonData.total;
            $scope.movies = jsonData.subjects;
            $scope.loading = false;
        }
        $scope.$watch("currentPage" ,function(newValue ,oldValue){
            if(newValue !== oldValue){
                $scope.updateParams({
                    page : newValue
                })
            }
        })
    }
])