/**
 * Created by Administrator on 2016/10/4.
 */



    var navitem = document.getElementById("navitem");
    var itemchildren = document.getElementById("itemchildren");
    navitem.onmouseover = function () {
        itemchildren.style.display = "block";

    }
    navitem.onmouseout = function () {
        itemchildren.style.display = "none";
    }

    var contentitem = document.getElementById("contentitem");
    var contenttext = document.getElementById("contenttext");
    var list = document.getElementById("list");
    var arrow = document.getElementById("arrow");
    var arrowleft = document.getElementById("arrowleft");
    var arrowright = document.getElementById("arrowright");

    var timer1 = null;
    var timer2 = null;
    var target = 0,leader = 0;
    var pagers = document.getElementById("pagers");
    var lis1 = pagers.getElementsByTagName("a");
    //var circle = lis
    contentitem.onmouseover = function () {
        arrow.style.display = "block";
    }

    contentitem.onmouseout = function () {
        arrow.style.display = "none";
    }
    arrowright.onclick = function () {
        target = target - 296;
        console.log(target);
    }
    arrowleft.onclick = function () {
        target = target + 296;
        console.log(target);
    }
    for(var i = 0; i < 4; i++) {
        lis1[i].onclick = function (i) {
            return function () {
                target = -i * 296;
                timer2 = setInterval(function () {
                    leader = leader + (target - leader) / 10;
                    list.style.left = leader + "px";
                }, 10);
            }
        }(i);
    }
    timer1 = setInterval(function(){
        clearInterval(timer2);
        if(target <= -888){
            target = -888;
            console.log(1);
        }else if(target >= 0){
            target = 0;
        }
        leader = leader + (target - leader)/10;
        list.style.left = leader + "px";
    },10);
