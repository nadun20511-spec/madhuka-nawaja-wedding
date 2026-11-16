'use strict';
(function(){
 const layer=document.getElementById('falling-hearts');
 if(!layer||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 for(let i=0;i<14;i++){
  const heart=document.createElement('i');heart.className='fa-solid fa-heart fall-heart';
  heart.style.setProperty('--left',((i*37)%100)+'%');
  heart.style.setProperty('--size',(11+(i%4)*4)+'px');
  heart.style.setProperty('--duration',(16+(i%7)*2)+'s');
  heart.style.setProperty('--delay',(-i*2.1)+'s');
  heart.style.setProperty('--drift',((i%5)-2)*18+'px');
  heart.style.setProperty('--heart-opacity',String(.15+(i%3)*.035));
  layer.append(heart);
 }
 document.addEventListener('visibilitychange',()=>layer.classList.toggle('effects-paused',document.visibilityState==='hidden'));
})();
