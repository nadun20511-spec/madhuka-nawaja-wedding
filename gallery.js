'use strict';
(function(){
 const grid=document.getElementById('gallery-grid');
 const dialog=document.getElementById('photo-dialog');
 const full=document.getElementById('photo-full');
 const caption=document.getElementById('photo-caption');
 const photos=(window.INVITATION_CONFIG?.gallery||[]).filter(photo=>photo&&typeof photo.src==='string'&&photo.src.trim()&&!/^javascript:/i.test(photo.src)).slice(0,5);
 let current=0,lastTrigger=null;
 function display(index){if(!photos.length)return;current=(index+photos.length)%photos.length;const photo=photos[current];full.src=photo.src;full.alt=photo.alt||'Madhuka and Nawaja photo '+(current+1);caption.textContent=(current+1)+' / '+photos.length;}
 function close(){dialog.close();if(lastTrigger)lastTrigger.focus();}
 for(let i=0;i<5;i++){
  const photo=photos[i];
  if(photo){const button=document.createElement('button');button.type='button';button.className='gallery-photo rose-card';button.setAttribute('aria-label','View photo '+(i+1));const img=document.createElement('img');img.src=photo.src;img.alt=photo.alt||'Madhuka and Nawaja photo '+(i+1);img.loading='lazy';img.decoding='async';button.append(img);button.addEventListener('click',()=>{lastTrigger=button;display(i);dialog.showModal();});grid.append(button);}
  else{const slot=document.createElement('div');slot.className='gallery-placeholder rose-card';slot.setAttribute('aria-label','Photo '+(i+1)+' coming soon');const icon=document.createElement('i');icon.className='fa-regular fa-image';icon.setAttribute('aria-hidden','true');const number=document.createElement('span');number.className='photo-number';number.textContent=String(i+1).padStart(2,'0');slot.append(icon,number);grid.append(slot);}
 }
 document.getElementById('gallery-pending').hidden=photos.length===5;
 document.getElementById('photo-close').addEventListener('click',close);
 document.getElementById('photo-prev').addEventListener('click',()=>display(current-1));
 document.getElementById('photo-next').addEventListener('click',()=>display(current+1));
 dialog.addEventListener('click',event=>{if(event.target===dialog)close();});
 dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();display(current-1);}if(event.key==='ArrowRight'){event.preventDefault();display(current+1);}});
 dialog.addEventListener('close',()=>{if(lastTrigger)lastTrigger.focus();});
})();
