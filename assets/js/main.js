
// Year
const y = document.getElementById('y'); if (y) { y.textContent = new Date().getFullYear(); }
// Fake form handlers
function handleFakeSubmit(formId, statusId, okMsg){
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if(!form || !status) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    status.className = 'status ' + (form.checkValidity()? 'ok':'err');
    status.textContent = form.checkValidity() ? okMsg : 'Please check the required fields.';
  });
}
handleFakeSubmit('contactForm','contactStatus','Message sent! We’ll reply by email.');
handleFakeSubmit('volunteerForm','volStatus','Thank you! We’ll be in touch.');
handleFakeSubmit('featureForm','featStatus','Thanks for your idea! We’ll review it.');
handleFakeSubmit('subscribeForm','subStatus','Subscribed! Please check your email.');
// Text reader
(function(){
  const btn = document.getElementById('readerToggle');
  const main = document.getElementById('main');
  const supported = btn && main && ('speechSynthesis' in window) && ('SpeechSynthesisUtterance' in window);
  if(!supported){ if(btn) btn.hidden = true; return; }
  let speaking = false, u;
  btn.addEventListener('click', ()=>{
    if(!speaking){
      u = new SpeechSynthesisUtterance(main.innerText);
      u.lang = 'en-GB'; u.rate = 1; 
      u.onend = ()=>{ speaking=false; btn.setAttribute('aria-pressed','false'); };
      window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
      speaking = true; btn.setAttribute('aria-pressed','true');
    }else{
      window.speechSynthesis.cancel(); speaking=false; btn.setAttribute('aria-pressed','false');
    }
  });
})();
