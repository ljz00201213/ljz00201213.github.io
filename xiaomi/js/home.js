/**
 * Created by Administrator on 2016/10/5.
 */

    var lis =document.getElementById("lis").children;
    var products = document.getElementById("product").children;

    for(var i = 0 ; i < lis.length;i++){
        lis[i].index = i;
        lis[i].onmouseover = function(){
            for(var j = 0 ; j <lis.length;j++){
                products[j].style.display = "none";
                lis[j].className = "";
            }
            this.className = "tab-active";
            products[this.index].style.display = "block";
        }

    }
    function review(id){
        var items = document.getElementById(id).children;
        var review = document.getElementById(id).getElementsByClassName("review");
        for(var i = 0 ; i< items.length - 2 ; i++){
            items[i].index = i;
            items[i].onmouseover = function(){
                review[this.index].style.height = 73 + "px";
                review[this.index].style.opacity = 1;
                this.className = "li-active";
            }
            items[i].onmouseout = function(){
                review[this.index].style.height = 0+ "px";
                review[this.index].style.opacity = 0;
                this.className = "";
            }
        }
    }
    review("items1");
    review("items2");
    review("items3");
    review("items4");