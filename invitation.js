'use strict';
const WEDDING_DATE = '2027-01-20T09:40:00+05:30';
const cover=document.getElementById('cover'), invitation=document.getElementById('invitation'), opener=document.getElementById('open'), video=document.getElementById('wedding-video');
const mobileNav=document.getElementById('mobile-nav');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
function playVideo(){if(reducedMotion.matches){video.pause();return;}const playback=video.play();if(playback)playback.catch(()=>{});}
function pauseVideos(){video.pause();}
function showInvitation(){invitation.hidden=false;cover.hidden=true;opener.setAttribute('aria-expanded','true');pauseVideos();if(mobileNav)mobileNav.hidden=false;window.scrollTo(0,0);document.getElementById('back').focus({preventScroll:true});}
opener.addEventListener('click',showInvitation);
document.getElementById('back').addEventListener('click',()=>{invitation.hidden=true;cover.hidden=false;if(mobileNav)mobileNav.hidden=true;opener.setAttribute('aria-expanded','false');window.scrollTo(0,0);playVideo();opener.focus({preventScroll:true});});
playVideo();
function tick(now=Date.now()){let remaining=Math.max(0,new Date(WEDDING_DATE).getTime()-now);const units=[86400000,3600000,60000,1000];['days','hours','minutes','seconds'].forEach((id,i)=>{document.getElementById(id).textContent=String(Math.floor(remaining/units[i])).padStart(2,'0');remaining%=units[i];});}
tick();setInterval(tick,1000);
function weddingCalendar(){return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Madhuka and Nawaja//Wedding Invitation//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:madhuka-nawaja-20270120-wedding','DTSTAMP:20261116T000000Z','DTSTART:20270120T041000Z','SUMMARY:Madhuka & Nawaja Wedding','LOCATION:White Palace Hotel & Banquets\\, 164/3 New Kandy Rd\\, Weliweriya\\, Sri Lanka','DESCRIPTION:Poruwa ceremony at 9:40 AM (Sri Lanka time). Reception at White Palace Hotel & Banquets.','END:VEVENT','END:VCALENDAR',''].join('\r\n');}
document.getElementById('calendar').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([weddingCalendar()],{type:'text/calendar;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='madhuka-nawaja-wedding.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
const form=document.getElementById('rsvp-form'),thanks=document.getElementById('rsvp-thanks'),pending=document.getElementById('rsvp-pending'),submit=document.getElementById('rsvp-submit');
const email=window.INVITATION_CONFIG?.rsvpEmail?.trim()||'';
const configured=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const localFile=location.protocol==='file:';
const siteUrl=window.INVITATION_CONFIG?.siteUrl||'https://kavish-senali-invite-sample.hopefullemur1.chatgpt.site/';
if(configured){form.action='https://formsubmit.co/'+encodeURIComponent(email);form.hidden=localFile;pending.hidden=true;document.getElementById('return-url').value=(localFile?siteUrl:location.origin+location.pathname)+'#rsvp-thanks';}
document.getElementById('rsvp-offline').hidden=!localFile;
document.getElementById('rsvp-online-link').href=siteUrl+'#rsvp';
function syncAttendance(){const attending=form.querySelector('input[name="Attendance"]:checked').value==='Joyfully attending';const count=document.getElementById('guest-count');count.disabled=!attending;count.required=attending;document.getElementById('guest-count-wrap').hidden=!attending;}
form.querySelectorAll('input[name="Attendance"]').forEach(input=>input.addEventListener('change',syncAttendance));syncAttendance();
form.addEventListener('submit',event=>{if(!configured||localFile||!form.checkValidity()){event.preventDefault();form.reportValidity();return;}submit.disabled=true;document.getElementById('submit-status').textContent='Opening the secure email submission page…';});
window.addEventListener('pageshow',()=>{submit.disabled=false;document.getElementById('submit-status').textContent='';});
function showReceipt(){if(location.hash==='#rsvp-thanks'&&configured&&!localFile){showInvitation();form.hidden=true;thanks.hidden=false;thanks.scrollIntoView({behavior:'instant',block:'center'});thanks.focus({preventScroll:true});}else if(['#rsvp','#gallery','#venue','#welcome','#contact'].includes(location.hash)){if(invitation.hidden)showInvitation();const section=document.getElementById(location.hash.slice(1));if(section)section.scrollIntoView({behavior:'instant'});}}
showReceipt();window.addEventListener('hashchange',showReceipt);
document.getElementById('another-rsvp').addEventListener('click',()=>{thanks.hidden=true;form.hidden=!configured||localFile;form.reset();syncAttendance();submit.disabled=false;history.replaceState(null,'',location.pathname+location.search+'#rsvp');document.getElementById('guest-name').focus();});

if(typeof IntersectionObserver!=='undefined'){
 const sectionLinks=document.querySelectorAll('.mobile-nav a, .desktop-links a');
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;sectionLinks.forEach(link=>{const current=link.getAttribute('href')==='#'+entry.target.id;link.classList.toggle('active',current);if(current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});});},{rootMargin:'-15% 0px -50% 0px'});
 document.querySelectorAll('#invitation > section[id]').forEach(section=>observer.observe(section));
}
