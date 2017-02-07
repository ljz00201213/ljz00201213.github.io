/**
 * Created by 非也 on 2016/7/16.
 */
/*$
 //本地添加歌曲
 (function() {
 //var audio = $('#myAudio');
 var playMode = "oder";
 var myAudio = $("audio")[0];
 var $sourceList = $("#myAudio source");
 var currentSrcIndex = 0;
 var current =0 ;
 some();
 function some() {
 // Button click
 $('.i-bf').hide();
 var world = $sourceList.eq(0).attr('src');
 var art =  $sourceList.eq(0).attr('title');
 $('.song-name').text(world);
 $('.singer').text(art);
 $('.i-zt').on('click', function () {
 $('.i-bf').show();
 $('.i-zt').hide();
 Pause();
 });
 $(".i-bf").on('click', function () {
 $('.i-zt').show();
 $('.i-bf').hide();
 Play();
 });
 //icon click
 $(".i-fx").click(function () {
 $(this).css("color", "#415266");
 });
 $(".i-sc").click(function () {
 $(this).css("color", "yellow");
 });
 $(".i-ax").click(function () {
 $(this).css("color", "#FE8698");
 });
 $(".i-xh").click(function () {
 $(this).css("color", "#415266");
 if ($('.i-sj').css("color", "#415266")) {
 $('.i-sj').css("color", "#CDD2D7");
 }
 });
 $(".i-sj").click(function () {
 $('.i-bf').hide();
 $('.i-zt').show();
 $(this).css("color", "#415266");
 if ($('.i-xh').css("color", "#415266")) {
 $('.i-xh').css("color", "#CDD2D7");
 }
 });
 main();
 }
 function main(){
 //上一首
 $('.i-sys').on('click', function () {
 prev();
 //console.log(currentSrcIndex);
 });
 //下一首
 $('.i-xys').on('click', function () {
 next();
 });
 //单曲循环播放
 $(".i-xh").on("click", function () {
 //单曲循环
 myAudio.loop = true;
 if(pause = false){
 playMode = "singleCycle";
 currentSrc = $sourceList.eq(currentSrcIndex).attr("src");
 myAudio.src = currentSrc;
 $('#myAudio').attr('loop', 'loop');
 Play();
 TimeSpan();
 }
 });
 console.log(myAudio.loop);
 //随机播放
 $(".i-sj").on("click", function () {
 playMode="random";
 $('#myAudio').removeAttr('loop');
 randomPlay();
 });
 //自动播放
 $("#myAudio").bind("ended", function () {
 if (playMode != "singleCycle") {
 if(playMode=="oder"){
 next();
 Play();
 }else if(playMode=="random"){
 randomPlay();
 }
 }
 });
 //快进
 $('.processAll').click(TimeTrim);
 //快退
 $('.processnow').click(TimeTrim);
 }
 //音频进度条事件   快进 and 快退
 function  TimeTrim(e){
 //----播放进度条的基准参数
 //offset()检索元件的的当前位置,返回一个包含属性的对象顶部和左侧。
 //offest(坐标)重新定位的元件。
 var left = $('.processAll').offset().left;
 var processLength = $('.processAll').width();
 var currentProcess = e.clientX - left;
 console.log(currentProcess);
 TimeSelec(currentProcess/processLength);
 $('.processnow').css('width',currentProcess);
 $('.i-zt').show();
 $('.i-bf').hide();
 }
 function randomPlay(){
 var sources = new Array();
 $("#myAudio").find("source").each(function (index, item) {
 sources.push($(item).attr("src"));
 });
 var math = Math.floor(Math.random() * (sources.length - 1));
 myAudio.src = sources[math];
 Play();
 go(math);
 }
 function go(index){
 if(index<0){
 index=0;
 }else if(index>$sourceList.length-1){
 index = $sourceList.length-1;
 }
 var top = index *(-100);
 $('.list').stop(true,true).animate({top:top},function(){
 current = index;
 });
 var world = $sourceList.eq(index).attr("src");
 var art = $sourceList.eq(index).attr("title");
 $('.song-name').text(world);
 $('.singer').text(art);
 current = index;
 }
 function prev(){
 go(current-1);
 --currentSrcIndex < 0 && (currentSrcIndex = 0);
 currentSrc = $sourceList.eq(currentSrcIndex).attr("src");
 myAudio.src = currentSrc;
 Play();
 }
 function next() {
 go(current + 1);
 ++currentSrcIndex > $sourceList.length - 1 && (currentSrcIndex = $sourceList.length-1);
 currentSrc = $sourceList.eq(currentSrcIndex).prop("src");
 myAudio.src = currentSrc;
 Play();
 }
 function Play() {
 myAudio.play();
 TimeSpan();
 }
 //Play()
 function Pause() {
 myAudio.pause();
 } //Pause()
 //响应播放进度条变化
 function TimeSelec(rangeVal){
 myAudio.currentTime = rangeVal * myAudio.duration;
 Play();
 }
 //进度条
 function TimeSpan() {
 var processnow = 0;
 setInterval(function () {
 var ProcessNow = (myAudio.currentTime / myAudio.duration) * 240;
 $(".processnow").css("width", ProcessNow);
 var currentTime = timeFormat(myAudio.currentTime);
 var timeAll = timeFormat(myAudio.duration);
 $(".song-time").html(currentTime + " | " + timeAll);
 }, 1000);
 }  //TimeSpan()
 //时间格式化处理，以s为单位
 function timeFormat(number) {
 var minute = parseInt(number / 60);
 var second = parseInt(number % 60);
 minute = minute >= 10 ? minute : "0" + minute;
 second = second >= 10 ? second : "0" + second;
 return minute + ":" + second;
 } //timeFormat()
 TimeSpan();
 });*/
//获取歌曲
$(function () {
    //var myAudio = $('#myAudio');
    var playMode = "oder";
    var myAudio = $("audio")[0];
    /*   function getMusic () {
     $.ajax({
     url:'http://api.jirengu.com/fm/getSong.php',
     dataType: "json",
     Method:'get',
     channel:{},
     data:{
     'channel': $('#myAudio').attr('data-id')
     },
     success: function (ret) {
     var resource = ret.song[0],
     url = resource.url,
     bgPic = resource.picture,
     sid = resource.sid,
     ssid = resource.ssid,
     title = resource.title,
     author = resource.artist;
     $('#myAudio').attr('src',url);
     $('#myAudio').attr('sid',sid);
     $('#myAudio').attr('ssid',ssid);
     $('.song-name').text(title);
     $('.song-name').attr('title',title);
     $('.singer').text(author);
     $('.singer').attr('title',author);
     $(".list").css({
     'background':'url('+bgPic+')',
     'background-repeat': 'no-repeat',
     'background-position': 'center',
     'background-size': 'cover'
     });
     Play();
     //TimeTrim();
     }
     });
     }*/
    var currMath;
    //var songs;

    function getMusic() {
        $.ajax({
            url: 'http://api.jirengu.com/fm/getSong.php',
            dataType: "json",
            Method: 'get',
            channel: {},
            data: {
                'channel': $('#myAudio').attr('data-id')
            },
            success: function (ret) {
                var resource = ret.song[0];
                    url = resource.url,
                    bgPic = resource.picture,
                    sid = resource.sid,
                    ssid = resource.ssid,
                    title = resource.title,
                    author = resource.artist;
                $('#myAudio').attr('src', url);
                $('#myAudio').attr('sid', sid);
                $('#myAudio').attr('ssid', ssid);
                $('.song-name').text(title);
                $('.song-name').attr('title', title);
                $('.singer').text(author);
                $('.singer').attr('title', author);
                $(".list").css({
                    'background': 'url(' + bgPic + ')',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center',
                    'background-size': 'cover'
                });
                Play();
                //TimeTrim();
            }
        });
    }

    //获取频道信息
    function getChannel() {
        $.ajax({
            url: 'http://api.jirengu.com/fm/getChannels.php',
            dataType: 'json',
            Method: 'get',
            success: function (response) {
                var channels = response.channels;
                var num = Math.floor(Math.random() * channels.length);
                var channelname = channels[num].name;
                var channelId = channels[num].channel_id;
                $('.chan').text(channelname);
                $('.chan').attr('title', channelname);
                $('.chan').attr('data-id', channelId);
                getMusic();
            }
        })
    }
    function some() {
        // Button click
        $('.i-bf').hide();
        $('.i-zt').on('click', function () {
            $('.i-bf').show();
            $('.i-zt').hide();
            Pause();
        });
        $(".i-bf").on('click', function () {
            $('.i-zt').show();
            $('.i-bf').hide();
            Play();
        });
        //icon click
        $(".i-fx").click(function () {
            $(this).css("color", "#415266");
        });
        $(".i-sc").click(function () {
            $(this).css("color", "yellow");
        });
        $(".i-ax").click(function () {
            $(this).css("color", "#FE8698");
        });
        $(".i-xh").click(function () {
            $(this).css("color", "#415266");
            if ($('.i-sj').css("color", "#415266")) {
                $('.i-sj').css("color", "#CDD2D7");
            }
        });
        $(".i-sj").click(function () {
            $('.i-bf').hide();
            $('.i-zt').show();
            $(this).css("color", "#415266");
            if ($('.i-xh').css("color", "#415266")) {
                $('.i-xh').css("color", "#CDD2D7");
            }
        });
        main();
    }

    function main() {
        //上一首
        $('.i-sys').on('click', function () {
            //getMusic();
            //转成数字类型
            // currMath = Number(currMath);
            // if (currMath == 0) {
            //     currMath=songs.length-1;
            //     musicAttr(songs[currMath]);
            // }else{
            //     currMath=currMath-1;
            //     musicAttr(songs[currMath])
            // }
        });
        //下一首
        $('.i-xys').on('click', function () {
            getMusic();

        });
        //频道切换
        $('.i-pindao').on('click', function () {
            getChannel();
            //console.log(currentSrcIndex);
        });
        //单曲循环播放
        $(".i-xh").on("click", function () {
            //单曲循环
            myAudio.loop = true;
        });
        //随机播放
        $(".i-sj").on("click", function () {
            playMode = "random";
            myAudio.loop = false;
            getMusic();
        });
        //自动播放
        $("#myAudio").bind("ended", function () {
            getMusic();
        });
        //快进
        $('.processAll').click(TimeTrim);
        //快退
        $('.processnow').click(TimeTrim);
    }

    //音频进度条事件   快进 and 快退
    function TimeTrim(e) {
        //----播放进度条的基准参数
        //offset()检索元件的的当前位置,返回一个包含属性的对象顶部和左侧。
        //offest(坐标)重新定位的元件。
        var left = $('.processAll').offset().left;
        var processLength = $('.processAll').width();
        var currentProcess = e.clientX - left;
        //console.log(currentProcess);
        TimeSelec(currentProcess / processLength);
        $('.processnow').css('width', currentProcess);
        $('.i-zt').show();
        $('.i-bf').hide();
    }

    function Play() {
        myAudio.play();
        //TimeSpan();
    }

    //Play()
    function Pause() {
        myAudio.pause();
    } //Pause()
    //响应播放进度条变化
    function TimeSelec(rangeVal) {
        myAudio.currentTime = rangeVal * myAudio.duration;
        Play();
    }

    //进度条
    function TimeSpan() {
        var processnow = 0;
        setInterval(function () {
            var ProcessNow = (myAudio.currentTime / myAudio.duration) * 240;
            $(".processnow").css("width", ProcessNow);
            var currentTime = timeFormat(myAudio.currentTime);
            var timeAll = timeFormat(myAudio.duration);
            $(".song-time").html(currentTime + " | " + timeAll);
        }, 1000);
    }  //TimeSpan()
    //时间格式化处理，以s为单位
    function timeFormat(number) {
        var minute = parseInt(number / 60);
        var second = parseInt(number % 60);
        minute = minute >= 10 ? minute : "0" + minute;
        second = second >= 10 ? second : "0" + second;
        return minute + ":" + second;
    } //timeFormat()
    //TimeSpan();
    TimeSpan();
    getChannel();
    some();
});