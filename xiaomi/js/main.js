/**
 * Created by Administrator on 2016/10/4.
 */
window.onload = function(){
    var items = document.getElementById("items").children;
    var child = document.getElementsByClassName("child");
    var carousel = document.getElementById("carousel");
    var allows = document.getElementById("allow").children;
    var lis = carousel.children;
    var circles = document.getElementById("circle").children;
    var timer ;
    for(var i = 0 ; i < items.length;i++){
        items[i].index = i;
        items[i].onmouseover = function(){
            this.className = "actives";
            child[this.index].style.display = "block";
        }
        items[i].onmouseout = function(){
            this.className = "" ;
            child[this.index].style.display = "none";
        }
    }
    function show(index){
        for(var i = 0 ; i < lis.length ; i++){
            lis[i].style.zIndex = 50 - i;
            lis[i].style.opacity = 0;
            circles[i].className = "";
        }
        lis[index].style.opacity = 1;
        circles[index].className = "active";
    }
    show(0);
    var count = 0;
    //设置轮播函数
    function autoplay(){
        if(count == 4 ){
            count = 0;
            show(count);
            return
        }
        count++;
        show(count);
    }
    timer = setInterval(autoplay ,2000);
    allows[0].onclick = function(){
        clearInterval(timer);
        //与轮播方向相反需要判断
        if(count == 0){
            count = 5;
        }
        count--;
        show(count);
        timer = setInterval(autoplay ,2000);
    }
    allows[1].onclick = function(){
        clearInterval(timer);
        autoplay();
        timer = setInterval(autoplay ,2000);
    }
    for(var i = 0 ; i < circles.length;i++){
        circles[i].index = i;
        circles[i].onclick = function(){
            clearInterval(timer);
            count = this.index;
            show(count);
            timer = setInterval(autoplay , 2000);
        }
    }
    /*模块视图开始*/
    var login = document.getElementById("login");
    var mask = document.getElementById("mask");
    var close = document.getElementById("close");
    var wrap = document.getElementById("wrap");
    var leader1 =-650,target1 = 0, op = 0;
    var ag;
    login.onclick = function(){
        mask.style.display = "block";
        ag = setInterval(function(){
            op+=0.01;
            leader1 = leader1 + (target1 - leader1)/10;

            wrap.style.opacity = op ;

            wrap.style.top = leader1 + "px";
            if(op > 1){
                clearInterval(ag);
            }
        },10)
    }
    close.onclick = function(){
        mask.style.display = "none";
        wrap.style.opacity = 0 ;
        wrap.style.top = -650 +"px";
        leader1 = -690;
        op=0;
        showlogin.style.display = "block";
        layout.style.display = "none";
    }

    var ul1 = document.getElementById("ul1");
    var leader = 0;
    var target = 0;

    /*切换时间定时器*/
    tim = setInterval(function(){
//        clearInterval(timer);
//        clearInterval(timer1);


        target-=1226;

        /*判断target值 */
        if(target < -1226){
            target =0;
//            clearInterval(timer);

        }else{
            /*缓动*/
            tim1=setInterval(function () {

                leader = leader + (target - leader) / 10;
                ul1.style.left = leader + "px";
//                clearInterval(timer);

            }, 15)

        }

    },6000)
}