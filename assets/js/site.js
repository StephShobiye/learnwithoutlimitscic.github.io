
(function(){
  const $ = (sel,root=document)=>root.querySelector(sel);
  const navBtn=$('#navToggle'); const nav=$('#nav');
  if(navBtn){ navBtn.addEventListener('click',()=>{ const open=nav.classList.toggle('open'); navBtn.setAttribute('aria-expanded',String(open));});}
  const ttsBtn=document.querySelector('[data-action="tts"]');
  const fsBtn=document.querySelector('[data-action="fontsize"]');
  const hcBtn=document.querySelector('[data-action="contrast"]');
  const rmBtn=document.querySelector('[data-action="pause-anim"]');
  let fsScale=1;
  if(ttsBtn){ ttsBtn.addEventListener('click',()=>{ if(!('speechSynthesis'in window)){alert('Text-to-speech not supported in this browser.');return;} window.speechSynthesis.cancel(); const text=document.body.innerText; const u=new SpeechSynthesisUtterance(text); speechSynthesis.speak(u);});}
  if(fsBtn){ fsBtn.addEventListener('click',()=>{ fsScale=fsScale>=1.5?1:(fsScale+0.1); document.documentElement.style.fontSize=(fsScale*100)+'%';});}
  if(hcBtn){ hcBtn.addEventListener('click',()=>{ document.documentElement.classList.toggle('hc');});}
  if(rmBtn){ rmBtn.addEventListener('click',()=>{ const css=document.createElement('style'); css.setAttribute('data-rm','1'); css.textContent='*{animation:none !important;transition:none !important;scroll-behavior:auto !important}'; const cur=document.querySelector('style[data-rm]'); if(cur){cur.remove();} else {document.head.appendChild(css);} });}
})();
