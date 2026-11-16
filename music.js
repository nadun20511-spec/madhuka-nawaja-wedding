'use strict';
(function(){
 const widget=document.getElementById('music-widget');
 const config=window.INVITATION_CONFIG?.music||{};
 if(!config.src){widget.hidden=true;return;}
 const audio=document.getElementById('wedding-music'),toggle=document.getElementById('music-toggle'),panel=document.getElementById('music-panel'),status=document.getElementById('music-status'),label=document.getElementById('music-label');
 let started=false;
 widget.hidden=false;audio.volume=.5;audio.src=config.src;document.getElementById('music-track').textContent=config.title||'Our wedding song';audio.load();
 function setOpen(open){panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open));}
 async function play(){try{await audio.play();started=true;status.textContent='';}catch(error){status.textContent='Tap Play on the player to start the music.';}}
 toggle.addEventListener('click',()=>setOpen(panel.hidden));
 document.getElementById('music-close').addEventListener('click',()=>{setOpen(false);toggle.focus();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){setOpen(false);toggle.focus();}});
 audio.addEventListener('play',()=>{started=true;toggle.classList.add('is-playing');label.textContent='Playing';});
 audio.addEventListener('pause',()=>{toggle.classList.remove('is-playing');label.textContent='Music';});
 audio.addEventListener('error',()=>{status.textContent='The soundtrack is unavailable right now. Please try again later.';toggle.classList.remove('is-playing');label.textContent='Music';});
 document.getElementById('open').addEventListener('click',()=>{if(!started)play();});
 window.addEventListener('pagehide',()=>audio.pause());
})();
