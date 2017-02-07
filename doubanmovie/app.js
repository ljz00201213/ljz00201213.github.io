/**
 * Created by Administrator on 2016/10/25.
 */
//整体模块定义
//对于module中的第二个参数是app的依赖模块
var app = angular.module("app",[
    "ngRoute",
    "app.movieList",
    "app.movieDetail",
    "ui.bootstrap"
])
//选择指令
app.directive("selectLink" ,[function(){
    var item = [];
    return{
        restrict : "A",
        link : function(scope ,element ,attrs){
            item.push(element);
            element.bind("click" ,function(e){
                //事件绑定
                item.forEach(function(item){
                    if(item === element){
                        item.parent().addClass("active")
                    }else{
                        item.parent().removeClass("active");
                    }
                })
            })
        }
    }
}])
//数据加载
//app.config
app.config(["$routeProvider" ,function($routeProvider){
    //when 需要注入的模板 otherwise default 默认的加载功能
    $routeProvider.when("/detail/:movieId",{
        controller : "MovieDetailController",
        //导入的模板的路径
        templateUrl : "movie/movie-detail.html"
    }).when("/:type/:page?",{
        controller : "MovieListController",
        templateUrl : "movie/movie-list.html"
    }).otherwise({
        redirectTo : "/in_theaters/1"
    })
}])
app.constant("URLConfig" , {
    page_size: 20,
    appURL:"https://api.douban.com/v2/movie"
})
