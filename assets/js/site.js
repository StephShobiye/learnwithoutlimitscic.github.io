(function(){
  const $=s=>document.querySelector(s), html=document.documentElement;
  let size=100;
  $('#incText')?.addEventListener('click',()=>{ size=Math.min(150,size+10); html.style.fontSize=size+'%'; });
  $('#decText')?.addEventListener('click',()=>{ size=Math.max(90,size-10); html.style.fontSize=size+'%'; });
  $('#toggleHC')?.addEventListener('click',()=>{ document.body.classList.toggle('hc'); });
  $('#toggleDys')?.addEventListener('click',()=>{
    const on=document.body.dataset.dys==='1';
    document.body.dataset.dys= on ? '0':'1';
    document.body.style.fontFamily = on ? '' : "OpenDyslexic, Atkinson Hyperlegible, Arial, Verdana, sans-serif";
  });
  $('#readPage')?.addEventListener('click',()=>{
    const s=window.speechSynthesis; if(!s){ alert('Speech not supported.'); return; }
    s.cancel(); const t=document.getElementById('main')?.innerText||document.body.innerText;
    const u=new SpeechSynthesisUtterance(t); u.lang=document.documentElement.lang||'en-GB'; s.speak(u);
  });
})();
