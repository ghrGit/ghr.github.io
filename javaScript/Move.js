   var currentIndex=0;
 window.onload=function(){
 var sliderArr=[{'src':"1.jpg",'acticleid':'#?1'},{'src':"2.jpg",'acticleid':'#?2'},{'src':"3.jpg",'acticleid':'#?3'},{'src':"4.jpg",'acticleid':'#?4'},{'src':"5.jpg",'acticleid':'#?5'},{'src':"6.jpg",'acticleid':'#?6'},{'src':"7.jpg",'acticleid':'#?7'},{'src':"8.jpg",'acticleid':'#?8'}];
     var slider=document.getElementById('slider');
     var sliderBtn=document.getElementById('slider-btn');

     bannerSlider(slider,sliderBtn,sliderArr);
}

   function bannerSlider(slider,sliderBtn,sliderArr){
     var sliderLis=slider.getElementsByTagName('li');
     var sliderBtnLis=sliderBtn.getElementsByTagName('li');
     createHtml(slider,sliderArr,"");
     createHtml(sliderBtn,sliderArr);
     sliderTimer(slider,sliderBtnLis);
     sliderBtnLis[0].style.opacity='1.0';
     for (var i = 0; i < sliderBtnLis.length; i++) {
       sliderBtnLis[i].onmouseover=function(){
         clearInterval(slider.timer);
         currentIndex=this.getAttribute('index');

         fnSlider(slider,sliderBtnLis,"");

       }
       sliderBtnLis[i].onmouseout=function(){
         sliderTimer(slider,sliderBtnLis);
       }

     };
   }
   function sliderTimer(slider,sliderBtnLis){
     slider.timer=setInterval(function(){
       ++currentIndex;

       fnSlider(slider,sliderBtnLis);


     },3000);
   }
 //banner 滑动
 function fnSlider(slider,sliderBtnLis,moveFlag){
  for (var i = 0; i < sliderBtnLis.length; i++) {
   sliderBtnLis[i].style.opacity='0.5';
 }
 if(currentIndex>8) 
 {
   sliderBtnLis[1].style.opacity='1.0';
   marQuee(slider,2,moveFlag);
   currentIndex=1;          
 }
 else if(currentIndex==8)
 { 
  sliderBtnLis[0].style.opacity='1.0';
  marQuee(slider,2,moveFlag);
}
else {
 sliderBtnLis[currentIndex].style.opacity='1.0';
 marQuee(slider,2,moveFlag);
}


     }

     function marQuee(obj,speed,moveFlag){
      var bpos=0;

      if(parseInt(getStyle(obj,'left'))>=9600)
          obj.style.left='-1200px';
      if(currentIndex*1200==-parseInt(getStyle(obj,'left'))) return;
      var direction=currentIndex*1200<-parseInt(getStyle(obj,'left'))?50:-50;
       var left=currentIndex*1200>9600&&direction<0?0:-(currentIndex-1)*1200;

      if(direction>0)
        left=currentIndex*1200>9600&&direction<0?0:-(parseInt(currentIndex)+1)*1200; 
      if(currentIndex==0&&parseInt(getStyle(obj,'left'))!=0){direction=-50; left=0;}//循环后从第八张（充当第一张）第二张
      if(moveFlag==""&&currentIndex==0){left=-1200;direction=50;}//onmoverover事件触发的第一张
      var timer=setInterval(function(){
           bpos+=direction;
       if(Math.abs(bpos)<=1200)
         obj.style.left=left+bpos+'px';
       else 
        clearInterval(timer);
    },speed)
    }