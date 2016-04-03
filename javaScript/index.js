var doc=document;
//var domain = "http://t.yanchengqu.com/BlogController/";
var domain = "http://localhost:4936/";
var api = [
    { GetList: domain + "api/ArticalPart/GetList.api", type: "get" },//获取文章列表
    { GetArticalList: domain + "api/ArticalPart/GetArticalList.api", type: "get" },
    { GetArticalTypeList: domain + "api/ArticalPart/GetArticalTypeList.api", type: "get" },
    { GetLastMsgList: domain + "api/ArticalPart/GetLastMsgList.api", type: "get" },
    { GetMsgList: domain + "api/ArticalPart/GetMsgList.api", type: "get" },
    { GetArticalInfo: domain + "api/ArticalPart/GetArticalInfo.api", type: "get" },
    { AddArtical: domain + "api/ArticalPart/AddArtical.api", type: "post" },
    { AddComment: domain + "api/ArticalPart/AddComment.api", type: "post" },
    { AddMsg: domain + "api/ArticalPart/AddMsg.api", type: "post" },
    { Login: domain + "api/User/login.api", type: "post" },
    { addHot: domain + "api/ArticalPart/AddHot.api", type: "get" }

    ];

    function fn() {
        CreateNavFn2();
        createArticleMenu(0);
        createComment();
        CreateNavLogo();
        footHome();
        audio163Fn();
        rightBar();
    }
    var searchFn=(function(){
var query=document.getElementById('query');
var go=document.getElementById('go');
go.onclick=function(){
var reg=/^\s*$/;
    if (reg.test(query.value)) return;
    window.open('category.html?search='+escape(query.value));
// ('article-list', 1,query.value);
    }
})();
//创建菜单User 事件委托
function CreateNav() {
   var menuNav=doc.getElementById('menu-nav');
   var as = menuNav.getElementsByTagName('a');
   var dvs = menuNav.getElementsByTagName('div');
   var ul=menuNav.getElementsByTagName('ul')[0];
   var audios = menuNav.getElementsByTagName('audio');
   var colors = ['#b9d329', '#c0ebf7', '#b9d329', '#69bcf3', '#79d9f3', '#ffae5b', '#acd180', '#fab4cc', '#6cf'];
   for (var i = 0; i < as.length; i++) {
    as[i].index = i;
    dvs[i].style.background = colorcreateArticles[i];
};
ul.onmouseover=function(ev){
    var ev=ev||event;
    var target=ev.target||ev.srcElement;
    if(target.nodeName.toLowerCase()=='a'){
       var index = target.index;
            //ie8以下不支持audio
            if (isOldIE()) {
                if (!isNaN(audios[index].duration)) {
                    audios[index].currentTime = 0;
                }
                audios[index].play();
            }
            animate(dvs[index], 0, 'top', 2);
        }
    }
    ul.onmouseout=function(ev){
        var ev=ev||event;
        var target=ev.target||srcElement;
        if(target.nodeName.toLowerCase()=='a'){
            animate(dvs[target.index], 56, 'top', 2);
        }
    }
}
//创建菜单方法2
function CreateNavFn2() {
    var menuNav=doc.getElementById('menu-nav');
    var lis = menuNav.getElementsByTagName('li');
    var dvs = menuNav.getElementsByTagName('div');
    var ul=menuNav.getElementsByTagName('ul')[0];
    var audios = menuNav.getElementsByTagName('audio');
    var colors = ['#b9d329', '#c0ebf7', '#b9d329', '#69bcf3', '#79d9f3', '#ffae5b', '#acd180', '#fab4cc', '#6cf'];
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        dvs[i].style.background = colors[i];
        lis[i].onmouseover = function () {
            var index = this.index;
            //ie8以下不支持audio
            if (isOldIE()) {
                if (!isNaN(audios[index].duration)) {
                    audios[index].currentTime = 0;
                }
                audios[this.index].play();
            }
            animate(dvs[this.index], 0, 'top', 2);

        }
        lis[i].onmouseout = function () {

            animate(dvs[this.index], 56, 'top', 2);

        }
    };
}

//菜单动画
function animate(obj, y, direction, t) {
    clearInterval(obj.timer);
    obj.timer = setInterval(
        function () {
            var pos = parseInt(getStyle(obj, direction));
            if (pos < y)
                obj.style[direction] = pos + t + 'px';
            else if (pos > y)
                obj.style[direction] = pos - t + 'px';
            else
                clearInterval(obj.timer);
        }, t);
}

//logo光晕
function CreateNavLogo() {
    //设置logo 光晕动画
    var i = doc.getElementsByTagName("i")[0];
    var logo = doc.getElementById('logo');
    var oTimer = null;
    var iLeft = -50;
    logo.onmouseover = function () {
        this.timer = setInterval(toMove, 1000);
    }
    logo.onmouseout = function () {
        clearInterval(this.timer);
    }
    function toMove() {
        oTimer = setInterval(function () {
            iLeft += 10;
            if (iLeft == 50) {
                iLeft = -100;
                clearInterval(oTimer);
            }
            i.style.backgroundPosition = iLeft + "px 0px";

        }, 20);
    }
    toMove();
}

function Myjax (url,afterSuccess){

    $.ajax({
        type: 'get',
async: true,//默认是异步
url: url,
dataType:'jsonp',
crossDomain: true, 
success: function(data){
    afterSuccess(data);
}

});

}

// 音乐播放器
var audio163Fn=(function(){
 var turn = 0;
 var flagPlay = false;
   var currentTime;//所剩时间
   var time,audio163,songName, singerName,audioImgBox,bar ,circle;
   var num=0;
   
   var array = [
   { "songName": 'My Soul', 'musicSrc': 'http://m2.music.126.net/drBbwuN31fi0V9ifqEkFPw==/5634997092422975.mp3', 'singerName': "July", 'timeLen': '230','cover': 'http://p3.music.126.net/NFl1s5Hl3E37dCaFIDHfNw==/727876697598920.jpg?param=90y90'},
   { "songName": 'Somewhere', 'musicSrc': 'http://m2.music.126.net/DZnwbr2cA26ZaEDAzBqnpg==/5639395138942171.mp3', 'singerName': "July", 'timeLen': '229','cover': 'http://p3.music.126.net/wpk6nSJhIhmQTzCq7oh_Hg==/731175232477827.jpg?param=90y90'},
   { "songName": 'The truth that you leave', 'musicSrc': 'http://m2.music.126.net/XQo6IAe0In6D5ckPbhpmqA==/2053887720694509.mp3', 'singerName': "Pianoboy", 'timeLen': '223','cover':'http://p4.music.126.net/9idkdzbel_-lYBP7Dv_dVQ==/102254581395289.jpg?param=90y90'}];

   function audioPlay(){
    time = doc.getElementById('time');
    audio163 = doc.getElementById('player').getElementsByTagName('audio')[0];
    songName=doc.getElementById('singer').getElementsByTagName('span')[0];
    singerName=doc.getElementById('singer').getElementsByTagName('span')[1];
    audioImgBox=doc.getElementById('audioImgBox');
    var play = doc.getElementById('play');
    var next = doc.getElementById('next');
    var pre = doc.getElementById('pre');
    circle = doc.getElementById('circle');
    bar = doc.getElementById('bar');
    playFn();
    circle.onmousedown = function(ev){
        var ev = ev || window.event;
        disX = ev.clientX - circle.offsetLeft;
        
        document.onmousemove = function(ev){
            var ev = ev || window.event;
            
            var L = ev.clientX - disX;
            
            if(L<0){
                L = 0;
            }
            else if(L>bar.offsetWidth - circle.offsetWidth){
                L = bar.offsetWidth - circle.offsetWidth;
            }
            
            circle.style.left = L + 'px';
            
            
            var scale = L/(bar.offsetWidth - circle.offsetWidth);
            
            audio163.currentTime = scale * array[turn].timeLen;
            currentTime=array[turn].timeLen - audio163.currentTime;
            circle.style.left = doc.getElementById('inBar').style.width = Math.floor(bar.offsetWidth * (array[turn].timeLen - currentTime) / array[turn].timeLen) + 'px';
            
            updateTime();
            
        };
        document.onmouseup = function(){
            document.onmousemove = null;
        };
        return false;
    };
    
    play.onclick = function () {
        this.style.backgroundPosition = !flagPlay ? '-36px -63px' : '0px 0px';
        flagPlay = !flagPlay;
        playFn();

    }
    next.onclick = function () {
        flagPlay = true;
        play.style.backgroundPosition = '-36px -63px';
        nextFn();
    }
    pre.onclick = function () {
        flagPlay = true;
        play.style.backgroundPosition = '-36px -63px';
        preFn();
    }

}
function nextFn() {
    clearInterval(time.timer);
    turn = ++turn > array.length - 1 ? 0 : turn;
    playFn();

}

function preFn() {
    clearInterval(time.timer);
    turn = --turn < 0 ? array.length - 1 : turn;
    playFn();

}

//播放音乐代码
function playFn() {
    songName.innerHTML = array[turn].songName;
    singerName.innerHTML='-'+array[turn].singerName;
    audioImgBox.src=array[turn].cover;
    if( getFileName(audio163.src) !=getFileName(array[turn].musicSrc)){
        audio163.src = array[turn].musicSrc;
        currentTime = array[turn].timeLen;
        updateTime();
    }



    if (flagPlay) {
        if (!isNaN(audio163.duration))
            audio163.currentTime = array[turn].timeLen-currentTime;

        time.timer = setInterval(function () { updateTime() }, 1000)
        if (audio163.play)
            audio163.play();
        audioImgBox.timer=setInterval(function(){
            if(!flagPlay)
                clearInterval(audioImgBox.timer);
            audioImgBox.style.WebkitTransform = "rotate("+(++num)*1+"deg)";
        },50);
    }
    else {
        clearInterval(time.timer);
        if (audio163.pause){
            audio163.pause();
            
        }
    }
}

//更新音乐播放器时间以及bar
function updateTime() {
    if (currentTime < 1&&flagPlay) {
        clearInterval(time.timer);
        nextFn();
    }
    circle.style.left = doc.getElementById('inBar').style.width = Math.floor(bar.offsetWidth * (array[turn].timeLen - currentTime) / array[turn].timeLen) + 'px';
    time.innerHTML = formatSeconds(currentTime);
    currentTime = array[turn].timeLen - audio163.currentTime;
}


return audioPlay;
})();

function getFileName(file){
    //github下来的地址有编码
    return file.substring(file.lastIndexOf('/')+1);
}
//返回顶部
function returnTop() {
    window.scrollBy(0, -200);
    var sTop = doc.body.scrollTop + doc.docElement.scrollTop
    if (sTop > 0)
        setTimeout('returnTop()', 100);
}


//格式化时间for 音乐
function formatSeconds(second) {
    var m = parseInt(second / 60);
    m = m < 10 ? "0" + m : m;
    var s = parseInt(second % 60);
    s = s < 10 ? "0" + s : s;
    return "-" + m + ":" + s;
}

//首页大图轮播
// doc.onreadystatechange = bannerSlider;

var bannerSlider=(function(){
  var currentIndex = 0;
  var imgLoadFlag=false;
  var sliderBtnImg ; 
  var imgLength;

  function slider() {
    var sliderArr = [{ 'src': "1.jpg", 'acticleid': '#?1' }, { 'src': "2.jpg", 'acticleid': '#?2' }, { 'src': "3.jpg", 'acticleid': '#?3' }, { 'src': "4.jpg", 'acticleid': '#?4' }, { 'src': "5.jpg", 'acticleid': '#?5' }, { 'src': "6.jpg", 'acticleid': '#?6' }, { 'src': "7.jpg", 'acticleid': '#?7' }, { 'src': "8.jpg", 'acticleid': '#?8' }];
    var slider = doc.getElementById('slider');
    var sliderBtn = doc.getElementById('slider-btn');
    var sliderLis = slider.getElementsByTagName('li');
    var sliderBtnLis = sliderBtn.getElementsByTagName('li');
    sliderBtnImg = sliderBtn.getElementsByTagName('img');
    
    createHtml(slider, sliderArr, "");
    createHtml(sliderBtn, sliderArr);
    sliderTimer(slider, sliderBtnLis);
    imgLength=sliderBtnImg.length;
    sliderBtnLis[0].style.opacity = '1.0';
    if (!isOldIE()) sliderBtnLis[0].style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
    for (var i = 0; i < sliderBtnLis.length; i++) {
       sliderBtnImg[i].onload = function() {

        imgLength--;

    };
    sliderBtnLis[i].onmouseover = function () {
     if(imgLength!=0) return;
     clearInterval(slider.timer);
     currentIndex = this.getAttribute('index');
     fnSlider(slider, sliderBtnLis, "");

 }
 sliderBtnLis[i].onmouseout = function () {
    sliderTimer(slider, sliderBtnLis);
}
};

}
function sliderTimer(slider, sliderBtnLis) {

    slider.timer = setInterval(function () {
            // console.log(imgLength);
            if(imgLength==0){
                ++currentIndex;
                fnSlider(slider, sliderBtnLis);
            }
        }, 3000);
    
}
//banner 滑动
function fnSlider(slider, sliderBtnLis, moveFlag) {
    for (var i = 0; i < sliderBtnLis.length; i++) {
        sliderBtnLis[i].style.opacity = '0.4';
        if (!isOldIE()) sliderBtnLis[i].style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=60)';

    }
    if (currentIndex > 8) {
        sliderBtnLis[1].style.opacity = '1.0';
        if (!isOldIE()) sliderBtnLis[1].style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
        marQuee(slider, 2, moveFlag);
        currentIndex = 1;
    }
    else if (currentIndex == 8) {
        sliderBtnLis[0].style.opacity = '1.0';
        if (!isOldIE()) sliderBtnLis[0].style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';

        marQuee(slider, 2, moveFlag);
    }
    else {
        sliderBtnLis[currentIndex].style.opacity = '1.0';
        if (!isOldIE()) sliderBtnLis[currentIndex].style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';

        marQuee(slider, 2, moveFlag);
    }


}
//大图切换
function marQuee(obj, speed, moveFlag) {
    var bpos = 0;

    if (parseInt(getStyle(obj, 'left')) >= 9600)
        obj.style.left = '-1200px';
    if (currentIndex * 1200 == -parseInt(getStyle(obj, 'left'))) return;
    var direction = currentIndex * 1200 < -parseInt(getStyle(obj, 'left')) ? 50 : -50;
    var left = currentIndex * 1200 > 9600 && direction < 0 ? 0 : -(currentIndex - 1) * 1200;

    if (direction > 0)
        left = currentIndex * 1200 > 9600 && direction < 0 ? 0 : -(parseInt(currentIndex) + 1) * 1200;
    if (currentIndex == 0 && parseInt(getStyle(obj, 'left')) != 0) { direction = -50; left = 0; }//循环后从第八张（充当第一张）第二张
    if (moveFlag == "" && currentIndex == 0) { left = -1200; direction = 50; }//onmoverover事件触发的第一张
    var timer = setInterval(function () {
        bpos += direction;
        if (Math.abs(bpos) <= 1200)
            obj.style.left = left + bpos + 'px';
        else
            clearInterval(timer);
    }, speed)
}
return slider;
})();




//banner大图html代码
function createHtml(obj, arr, bigPic) {
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        str += "<li index='" + i + "'><a href='" + arr[i].acticleid + "'><img src='imgs/" + arr[i].src + "'/></a></li>"
    };
    //大图多一张for图片循环
    if (bigPic == "")
        str += "<li index='" + 8 + "'><a href='" + arr[0].acticleid + "'><img src='imgs/" + arr[0].src + "'/></a></li>";
    obj.innerHTML = str;
}




//获取文章列表;
function createArticle(articlelist, pageIndex) {
    var typeName=GetQueryString('articleType');
    var searchText=GetQueryString('search');
    if(searchText!=null){
            doc.getElementById('type').innerHTML = '<span id="type"><a class="viewAll" href="index.html">首页 </a><i>&gt;</i><em class="viewAll" >' + searchText + '</a></span>';
      typeName = ""; 
      }
else if (typeName != null) {
        doc.getElementById('type').innerHTML = '<span id="type"><a class="viewAll" href="index.html">首页 </a><i>&gt;</i><em class="viewAll">' + typeName + '</em></span>';
        typeName = escape(typeName);
        searchText="";
    }
     else {typeName = ""; searchText=""};
    var str = '';
    Myjax(api[0].GetList + "?typeName=" + typeName + "&pageIndex=" + pageIndex+"&searchText=" + searchText, function (arr) {
        var articleArray = JSON.parse(arr.Data);
        var page = arr.Page;
        doc.getElementById('paginator').innerHTML = page;
        var as = doc.getElementById("paginator").getElementsByTagName("a");
        for (var i = 0; i < as.length; i++) {
            as[i].onclick = function () {
                var curIndex = this.getAttribute('curIndex');
                createArticle('article-list', curIndex);
            }
        }

        for (var i = 0; i < articleArray.length; i++) {
            str += "<article class='article-content'><div class='article'><div class='article-title'><h3><a href='#'>" + articleArray[i].title + "</a></h3><img src='" + articleArray[i].userPhoto + "' alt='" + articleArray[i].userName + "' class='fr'/><span class='fr'>" + articleArray[i].userName + "</span> </div><div class='clear'><figure class='";
            //i % 2 == 0 ? str += 'arimg1' : str += 'arimg2';
            str += 'arimg1' ;
            str += "'><a href='article.html?articleId=" + articleArray[i].articleId + "'><img src='http://t.yanchengqu.com" + articleArray[i].imgSrc + "' /></a>  <figcaption ><p>微代码</p> </figcaption> </figure></div><section>" + delHtmlTag(articleArray[i].content) + "<a class='viewAll f12' href='article.html?articleId=" + articleArray[i].articleId + "'>查看全文</a></section><div class='article-info articleMemo-info'><a  class='article-replay fr' href='article.html?articleId=" + articleArray[i].articleId + "'>" + articleArray[i].articleReplayCount + "</a><a class='article-view fr'  onclick= agree(this,'article','articleId=" + articleArray[i].articleId + "')><span>" + articleArray[i].hot + "</span><span class='add1'>+1</span></a><div class='article-time arListT'><span>" + articleArray[i].articleDate + "</span><span>" + articleArray[i].wek + "</span><i></i></div></div></div></article>";
        };

        doc.getElementById(articlelist).innerHTML = str;
    });
}
function delHtmlTag(str) {
    return str.replace(/<[^>]+>/g, "").substring(0, 100)+'...';//去掉所有的html标记, 截取0-50个字符。； 
}

function rightBar(){ 
    var rightBar=doc.getElementById("rightBar"); 
    var msg=doc.getElementById('msg');
    var H=0,iE6; 
    var Y=rightBar; 
    while(Y){H+=Y.offsetTop;Y=Y.offsetParent}; 
    iE6=window.ActiveXObject&&!window.XMLHttpRequest; 
    if(!iE6){ 
        window.onscroll=function() 
        { 
            var s=doc.body.scrollTop||doc.documentElement.scrollTop; 
            if((s-rightBar.offsetHeight)>(H+msg.offsetHeight)){rightBar.className="rightBar div2";if(iE6){rightBar.style.top=(s-H)+"px";}} 
            else{rightBar.className="rightBar";} 
        }; 
    } 
}

//文章目录栏 选项卡
function createArticleMenu(curIndex) {
    var ul = doc.getElementById('article-menu').getElementsByTagName('ul');
    var hs = doc.getElementById('article-menu').getElementsByTagName('h4');
    //目录切换
    for (var i = 0; i < hs.length; i++) {
        hs[i].index = i;
        hs[i].onmouseover = function () {
            createArticleMenu(this.index);
        };
    }
    for (var i = 0; i < ul.length; i++) {
        ul[i].style.display = 'none';
        hs[i].style.backgroundColor = '#f1f1ef';
    };
    hs[curIndex].style.backgroundColor = '#3c9dff';
    ul[curIndex].style.display = 'block';

    var str = "";
    Myjax(api[2].GetArticalTypeList + "?curIndex=" + curIndex, function (arr) {

        arr = JSON.parse(arr.Data);
        for (var i = 0; i < arr.length; i++) {
            str += '<li> <em>' + (i + 1) + '</em><a href="article.html?articleId=' + arr[i].articleId + '" title="' + arr[i].title + '" target="_balnk">' + arr[i].title + '</a> <span>(' + arr[i].hot + ')</span></li>'
        };

        ul[curIndex].innerHTML = str;
    });
}

//文章内容
function createArContent() {
    var replayCount = doc.getElementById('replayCount');
    var arContent = doc.getElementById('arContent');
    var type = doc.getElementById('type');
    var articleId = GetQueryString('articleId');
    Myjax(api[5].GetArticalInfo + "?articleId=" + articleId, function (arrData) {
        var str = JSON.parse(arrData.Data);
        createArComment(arrData.Comment);
        replayCount.innerHTML = "评论数:" + str[0].articleReplayCount;
        arContent.innerHTML = "<h3>" + str[0].title + "</h3><article>" + getArContentImgSrc(str[0].content)+ "</article><div class='article-info marginT'><span class='article-replay fr'>" + str[0].articleReplayCount + "</span><a class='article-view fr' onclick=agree(this,\'article\','articleId=" + str[0].articleId + "')><span>" + str[0].hot + "</span><span class='add1'>+1</span></a><div class='article-time t'> <span>" + str[0].articleDate + "</span><span>" + str[0].wek + "</span><i></i></div></div> <section class='post_copyright'><h4>版权归 <a href='#' title='ghr'>" + str[0].userName + "</a> 所有</h4><p>本文标题：<a href='article.html?articleId=" + str[0].articleId + "' title='" + str[0].title + "'>" + str[0].title + "</a><br>转载请务必注明出处，小生将不胜感激，谢谢! 喜欢本文或觉得本文对您有帮助，请分享给您的朋友 ^_^</p> </section>";
        type.innerHTML = '<span id="type"><a class="viewAll" href="index.html">首页 </a><i>&gt;</i><a class="viewAll" href="category.html?articleType=' + escape(str[0].typeName) + '">' + str[0].typeName + '</a><i>&gt;</i>' + str[0].title + '</span>';
    });

};

//获取文章图片路径
function getArContentImgSrc(text){
    var div=doc.createElement('div');
    div.innerHTML=text;
    var imgs=div.getElementsByTagName('img');
    var src='';
    for (var i = 0; i <imgs.length; i++) {
        src=imgs[i].src;
        imgs[i].src='http://t.yanchengqu.com/'+src.substr(src.indexOf('blog'));
    };
    return div.innerHTML;
}


//文章评论
function createArComment(arr) {
    var articleId = GetQueryString('articleId');
    var replyUl = doc.getElementById('replyUl')
    var str = "";
    arr = JSON.parse(arr);
    for (var i = 0; i < arr.length; i++) {
        arr[i].parent = JSON.parse(arr[i].parent);
        var child = JSON.parse(arr[i].child);
        str += '<li><div class="replayContentBox"><img src="' + arr[i].parent[0].userPhoto + '" class="replayTx fl"  /> <div class="w600 fr" ><span>' + arr[i].parent[0].userName + '</span><p> ' + replace_em(arr[i].parent[0].conContent) + '</p><div class="commentAction"><span >' + arr[i].parent[0].commentTime + '</span> <a class="article-replay" href="#inputBox" title="回复" onclick=BindValue(' + arr[i].parent[0].commentId + ',2)>回复</a><a class="article-view" onclick=agree(this,"comment","commentId=' + arr[i].parent[0].commentId + '")><span>' + arr[i].parent[0].hot + '</span><span class="add1">+1</span></a></div></div> </div>';
        if (child.length > 0) {
            str += '<ul class="repChildUl fr" >';
            for (var k = child.length-1; k >=0; k--) {
                str += '<li><div class="replayContentBox"><img src="' + child[k].userPhoto + '" class="replayTx fl" /> <div class="w570 fr" > <span>' + child[k].userName + '</span><p>' + replace_em(child[k].conContent) + '</p> <div class="commentAction"><span >' + child[k].commentTime + '</span><a class="article-replay" title="回复" href="#inputBox" onclick=BindValue(' + arr[i].parent[0].commentId + ',2)>回复</a> <a class="article-view" onclick=agree(this,"comment","commentId=' + child[k].commentId + '")>' + child[k].hot + '</a></div></div></div></li>';
            }
            str += '</ul >'
        }
        str += '</li>'

    }
    replyUl.innerHTML = str;

}


//留言列表
function createMsg(pageIndex) {
    var replyUl = doc.getElementById('replyUl')
    var str = "";
    Myjax(api[4].GetMsgList + "?pageSize=5&pageIndex=" + pageIndex + "&sortBy=msgTime desc", function (articleArray) {
        var arr = JSON.parse(articleArray.Data);
        var page = articleArray.Page;
        getMsgPager(page);
        for (var i = 0; i < arr.length; i++) {
            arr[i].parent = JSON.parse(arr[i].parent);
            var child = JSON.parse(arr[i].child);
            // str += '<li><div class="replayContentBox"> <img src="' + arr[i].parent[0].userPhoto + '" class="replayTx fl"  /><div class="w930 fr" ><span>' + arr[i].parent[0].userName + '</span> <p>' + replace_em(arr[i].parent[0].conContent) + '</p><div class="commentAction"><span >' + arr[i].parent[0].commentTime + '</span><a class="article-replay" title="回复" index="' + arr[i].parent[0].MsgId + '">回复</a> <a class="article-view" onclick=agree(this,"msg","msgId=' + arr[i].parent[0].MsgId + ')>' + arr[i].parent[0].hot + '</a></div></div> </div>';
            str += "<li><div class='replayContentBox'> <img src='" + arr[i].parent[0].userPhoto + "' class='replayTx fl'  /><div class='w930 fr' ><span>" + arr[i].parent[0].userName + "</span> <p>" + replace_em(arr[i].parent[0].conContent) + "</p><div class='commentAction'><span >" + arr[i].parent[0].commentTime + "</span><a class='article-replay' title='回复' href='#inputBox' onclick=BindValue(" + arr[i].parent[0].MsgId + ",2)>回复</a> <a class='article-view' onclick=agree(this,'msg','msgId=" + arr[i].parent[0].MsgId + "')><span>" + arr[i].parent[0].hot + "</span><span class='add1'>+1</span></a></div></div> </div>";
            if (child.length > 0) {
                str += '<ul class="msgChildUl fr" >';
                for (var k = child.length-1; k >=0; k--) {

                    str += "<li><div class='replayContentBox'> <img src='" + child[k].userPhoto + "' class='replayTx fl' /><div class='w870 fr' ><span> " + child[k].userName + "</span><p>" + replace_em(child[k].conContent) + "</p><div class='commentAction'><span >" + child[k].commentTime + "</span> <a class='article-replay'  href='#inputBox' onclick=BindValue(" + arr[i].parent[0].MsgId + ",2)>回复</a> <a class='article-view' onclick=agree(this,'Msg','MsgId=" + child[k].MsgId + "')><span>" + child[k].hot + "</span><span class='add1'>+1</span></a></div></div></div></li>";

                }
                str += '</ul >'
            }
            str += '</li>'

        }

        replyUl.innerHTML = str;
    });

}
//留言分页
function getMsgPager(page) {
    doc.getElementById('paginator').innerHTML = page;
    var as = doc.getElementById("paginator").getElementsByTagName("a");
    for (var i = 0; i < as.length; i++) {
        as[i].onclick = function () {
            var curIndex = this.getAttribute('curIndex');
            createMsg(curIndex);

        }
    }

}
//最近留言
function createComment() {
    var comment = doc.getElementById('comment');

    var str = ''
    Myjax(api[3].GetLastMsgList, function (arr) {
        arr = JSON.parse(arr.Data);
        for (var i = 0; i < arr.length; i++) {
            str += '<li><div class="authorInfo"> <img src="' + arr[i].userPhoto + '" class="fl" /><span>' + arr[i].userName + '<em>' + arr[i].commentTime + '</em></span> <a href="msg.html"><em>在</em>心情杂货店<em>留言</em></a></div><div class="commentInfo">' + replace_em(arr[i].conContent) + '</div></li>';
        };
        comment.innerHTML = str;
    })
}


//点赞功能
function agree(obj, type, id) {
    var _this = obj;

    var spanNum=_this.getElementsByTagName('span')[0];
    var add1=_this.getElementsByTagName('span')[1];
    Myjax(api[10].addHot + "?type=" + type + "&id=" + id, function (flag) {
        if (flag){
            spanNum.innerHTML =parseInt(spanNum.innerHTML) + 1;
            add1.style.visibility='visible';
            opacity(add1, 1, 0);
            doMove(add1,3,'top', -30, function() {
                add1.style.top = 0;
                opacity(add1,10,100);
                add1.style.visibility='hidden';
            });
        }

        else
            alert("buhaoyisi~");

    });
}
//首页心情条的切换
function UpdateMoodBar() {
    var oDiv = $('.update');
    var oUl = oDiv.find('ul');
    var iH = 0;
    var arrData = [
    { 'time': 4, 'title': '有的人浅薄，有的人金玉其表败絮其中。有一天 你会遇到一个彩虹般绚烂的人，当你遇到这个人后，会觉得其他人都只是浮云而已。' },
    { 'time': 5, 'title': "常写代码多看书，常写博客多总结" },
    { 'time': 6, 'title': '每天进步一点点~' }

    ];
    var str = '';
    var oBtnUp = $('#updateUpBtn');
    var oBtnDown = $('#updateDownBtn');
    var iNow = 0;
    var timer = null;

    for (var i = 0; i < arrData.length; i++) {
        str += '<li><p>' + arrData[i].title + '</p></li>';
    }
    oUl.html(str);

    iH = oUl.find('li').height();

    oBtnUp.click(function () {
        doMove(-1);
    });
    oBtnDown.click(function () {
        doMove(1);
    });

    oDiv.hover(function () {
        clearInterval(timer);
    }, autoPlay);

    function autoPlay() {
        timer = setInterval(function () {
            doMove(-1);
        }, 3500);
    }
    autoPlay();

    function doMove(num) {
        iNow += num;
        if (Math.abs(iNow) > arrData.length - 1) {
            iNow = 0;
        }
        if (iNow > 0) {
            iNow = -(arrData.length - 1);
        }
        oUl.stop().animate({ 'top': iH * iNow }, 2200, 'elasticOut');
    }
};

//增加评论
function addComment() {
    if (getCookie('userName') == null || getCookie('userPhoto') == null) {

        alert('需要先登录才可以留言呦~');

    }
    var articleId = GetQueryString('articleId');
    var options = {
        url: api[7].AddComment,
        type: 'post',
        data: {
            userName: getCookie('userName'),
            userPhoto: "imgs/tx/" + getCookie('userPhoto') + ".jpg",
            aid: articleId,
            Depth: $("#Depth").val(),
            ParentId: $("#ParentId").val(),
            conContent: $("#saytext").val()
        },
        success: function (data) {
            if (data.State == 0) {
                var cancleR = doc.getElementById('cancleReplay');
                cancleR.style.display == 'block' ? alert('replay Success!') : alert('submit Success!')
                cancleR.style.display = 'none';
                $("#Depth").val(0);
                $("#ParentId").val(0);
                Myjax(api[5].GetArticalInfo + "?articleId=" + articleId, function (arrData) {
                    createArComment(arrData.Comment);
                });
                $("#saytext").val("");


            }
        }
    };
    $.ajax(options);
    return false;
}

//添加留言
function addMsg() {
    if (getCookie('userName') == null || getCookie('userPhoto') == null)
        alert('需要先登录才可以留言呦~')
    var options = {
        url: api[8].AddMsg,
        type: 'post',
        data: {
            userName: getCookie('userName'),
            userPhoto: "imgs/tx/" + getCookie('userPhoto') + ".jpg",
            Depth: $("#Depth").val(),
            ParentId: $("#ParentId").val(),
            msgContent: $("#saytext").val()
        },
        success: function (data) {
            if (data.State == 0) {
                var cancleR = doc.getElementById('cancleReplay');
                cancleR.style.display == 'block' ? alert('replay Success!') : alert('submit Success!')
                cancleR.style.display = 'none';
                $("#Depth").val(0);
                $("#ParentId").val(0);
                Myjax(api[4].GetMsgList + "?pageSize=5&pageIndex=1&sortBy=msgTime desc", function (articleArray) {
                 createMsg(1);
             });
                $("#saytext").val("");

            }
        }
    };
    $.ajax(options);
    return false;
}
//留言表情转换
function replace_em(str) {
    str = str.replace(/\</g, '&lt;');
    str = str.replace(/\>/g, '&gt;');
    str = str.replace(/\n/g, '<br/>');
    str = str.replace(/\[em_([0-9]*)\]/g, '<img src="imgs/arclist/$1.gif" border="0" />');
    return str;
}

//底部导航
var footHome=(function(){
    function footHomeFn() {
        var oHome = doc.getElementById("home");
        var aImg = doc.getElementById("menu_list").getElementsByTagName("img");
        var bOff = true;
        var iR = -150;
        for (var i = 0; i < aImg.length; i++) {
            aImg[i].index = i;
            aImg[i].onclick = function () {
                this.style.transition = "0.3s";
                this.style.WebkitTransform = "scale(2) rotate(-720deg)";
                this.style.opacity = 0.1;
                addEnd(this, end);
                if (this.index == 4) window.location.reload();
                else if (this.index == 2) window.close();
                else if (this.index == 0) returnTop();
            else if (this.index == 1) history.go(-1);//无效
            else if (this.index == 3) window.location.href = 'index.html';
        };
    }

    oHome.onclick = function () {
        if (bOff) {
            this.style.WebkitTransform = "rotate(-360deg) scale(1.0)";
            for (var i = 0; i < aImg.length; i++) {
                var oLt = toLT(iR, 90 / 4 * i);
                aImg[i].style.transition = "0.5s " + i * 100 + "ms";
                aImg[i].style.left = oLt.l + "px";
                aImg[i].style.top = oLt.t + "px";
                aImg[i].style.WebkitTransform = "scale(1) rotate(-720deg)";
            }
        }
        else {
            this.style.WebkitTransform = "rotate(0deg) scale(0.8)";
            for (var i = 0; i < aImg.length; i++) {
                aImg[i].style.transition = "0.5s " + (aImg.length - i - 1) * 100 + "ms";
                aImg[i].style.left = 0 + "px";
                aImg[i].style.top = 0 + "px";
                aImg[i].style.WebkitTransform = "scale(1) rotate(0deg)";
            }
        }
        bOff = !bOff;
    };
}
function end() {
    this.style.transition = "0.1s";
    this.style.WebkitTransform = "scale(1) rotate(-720deg)";
    this.style.opacity = 1;
    removeEnd(this, end);
}

function toLT(iR, iDeg) {
    return { l: Math.round(Math.sin(iDeg / 180 * Math.PI) * iR), t: Math.round(Math.cos(iDeg / 180 * Math.PI) * iR) }
}
function addEnd(obj, fn) {
    obj.addEventListener('WebkitTransitionEnd', fn, false);
    obj.addEventListener('transitionend', fn, false);
}
function removeEnd(obj, fn) {
    obj.removeEventListener('WebkitTransitionEnd', fn, false);
    obj.removeEventListener('transitionend', fn, false);
}
return footHomeFn;
})();

//判断iE版本,是否小于等于ie8
function isOldIE() {
    var DEFAULT_VERSION = '8.0';
    var userAgent = navigator.userAgent;
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;
    var ua = userAgent.toLowerCase();

    if (isIE) {
        var safariVersion = ua.match(/msie ([\d.]+)/)[1];
        if (safariVersion <= DEFAULT_VERSION)
            return false; //小于ie8
        else return true;
    }
    else {
        return true;
    }
}
//获取属性值
function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}
function doMove(obj, num, attr, target, endFn) {

    clearInterval(obj.timer);
    
    num = parseInt( getStyle(obj, attr) ) < target ? num : -num;
    
    obj.timer = setInterval(function() {

        var speed = parseInt( getStyle(obj, attr) ) + num;
        
        if (speed > target && num > 0 || speed < target && num < 0) {
            speed = target;
        }
        
        obj.style[attr] = speed + 'px';
        
        if ( speed == target ) {
            clearInterval(obj.timer);
            endFn && endFn();
        }
        
    }, 30);
    
}


function opacity(obj, num, target, endFn) {

    clearInterval( obj.opacity );
    
    num = Math.floor(getStyle( obj, 'opacity' )*100) < target ? num : -num;
    
    obj.opacity = setInterval(function () {

        var speed = Math.floor(getStyle( obj, 'opacity' )*100) + num;
        
        if (speed > target && num > 0 || speed < target && num < 0) {
            speed = target;
        }
        
        obj.style.filter = 'alpha(opacity='+ speed +')';
        obj.style.opacity = speed/100;
        
        if ( speed == target ) {
            clearInterval(obj.opacity);
            endFn && endFn();
        }
        
    }, 30);
    
}
//绑定hidden数据
function BindValue(ParentId, Depth) {

    if (ParentId != 0) {
        doc.getElementById('cancleReplay').style.display = 'block';
    }
    $('#Depth').val(Depth);
    $('#ParentId').val(ParentId);

}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//获取cookie
function getCookie(key) {
    var arr1 = doc.cookie.split('; ');
    for (var i = 0; i < arr1.length; i++) {
        var arr2 = arr1[i].split('=');
        if (arr2[0] == key) {
            return unescape(arr2[1]);
        }
    }
}
