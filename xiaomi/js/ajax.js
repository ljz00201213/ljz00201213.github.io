/**
 * Created by Administrator on 2016/10/6.
 */
function ajax(data) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }


    var type = data.type == "get" ? "get" : "post";
    var url = data.url;
    var flag = data.async == "true" ? "true" : "false";
    xhr.open(type, url, flag);
    if (type == "get") {
        xhr.send(null);
    } else {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data.data)
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (typeof data.success == "function") {
                    var d = data.datatype == "xml" ? xhr.responseXML : xhr.responseText;
                    data.success(d);
                }
            } else if (typeof data.failure == "function") {
                data.failure();
            }
        }
    }
}

var arr1 = [],arr2 = [];
var logindata = {
    type : "get",
    url : "data.php",
    async : true,
    success : function(data){
        var datajson = JSON.parse(data);
        for(var i = 0 ; i < datajson.length ; i++){
            arr1.push(datajson[i].username);
            arr2.push(datajson[i].password);
        }
    }
}

function isIn(arr , ojb){
    for(var i = 0 ; i < arr.length ; i++){
        if(arr[i] == ojb){
            return true;
        }
    }
    return false;
}
var btn = document.getElementById("btn");
var btn1 = document.getElementById("btn1");
var showlogin = document.getElementById("showlogin");
var layout = document.getElementById("layout");
var user = document.getElementById('user');
var pass = document.getElementById('pass');
var login = document.getElementById('login')
var sub = document.getElementById('sub');
var word1 = document.getElementById("word1");
var word2 = document.getElementById("word2");
var exit = document.getElementById("exit");
var capacity = document.getElementById("capacity");
var imgview = document.getElementsByClassName("imgview");


user.onblur = function () {
    var usn = user.value;
    if(usn.toString().length < 1){
        word1.innerHTML = "请输入用户名";
        word1.style.display = "block";
        sub.setAttribute("disabled","disabled")
        sub.style.background = "#BC4749";
    }else{
        word1.style.display = "none";
        sub.style.background = "rgb(255,103,0)";

    }

}
pass.onblur = function () {
    var psw = pass.value;
    if(psw.toString().length < 6) {
        word2.innerHTML = "请输入不少于六位数的密码";
        word2.style.display = "block";
    }else{
        word2.style.display = "none";
    }
}

btn.onclick = function(){
    ajax(logindata);

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if(isIn(arr1 , username)){
        if(isIn(arr2 ,password)){
            alert("成功");
            login.innerHTML = "欢迎" + username;
            mask.style.display = "none";
            exit.innerHTML = "退出";
        }else{
            alert("密码错误");
        }
    }else{
        alert("用户名不存在");
    }
}
btn1.onclick = function(){
    showlogin.style.display = "none";
    layout.style.display = "block";
}
sub.onclick = function(){

    var register = {
        type : "post",
        url : "register.php",
        async : true,
        data : "username=" + user.value + "&password=" + pass.value,
        success : function(){
            alert("注册成功,请登录");
            showlogin.style.display = "block";
            layout.style.display = "none";
        },
        failure : function(){
            alert("注册失败");
        }
    }
    ajax(register);
    ajax(logindata);
}
var photo = {
    type: "get",
    url: "photo.php",
    async: true,
    success: function (d) {
        var datajson = JSON.parse(d);
        imgview[0].children[0].src = datajson[0].src;
    }
}
window.onscroll = function() {
    if (checkFlag()) {
        ajax(photo);
    }
}

function checkFlag() {
    var lastHeight = capacity.offsetTop;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (lastHeight < (scrollTop + pageHeight)){
        return true;
    }
}

