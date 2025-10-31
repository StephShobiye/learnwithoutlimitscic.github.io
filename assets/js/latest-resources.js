<script>
(function () {
  const target = document.getElementById('latest-resources');
  if (!target) return;
  fetch('/resources/learning/resources.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(items => {
      if (!Array.isArray(items)) throw new Error('Invalid JSON');
      items.sort((a,b) => (b.date||'').localeCompare(a.date||''));
      const latest = items.slice(0,3);
      if (!latest.length) {
        target.innerHTML = '<li>No resources yet. Visit <a href="/resources/learning/">all resources</a>.</li>';
        return;
      }
      target.innerHTML='';
      latest.forEach(it => {
        const li=document.createElement('li');
        const type = it.type ? ` <small>(${it.type})</small>` : '';
        li.innerHTML = `<a href="${it.url}" ${it.download?'download':''}>${it.title}${type}</a>`;
        target.appendChild(li);
      });
    })
    .catch(() => {
      target.innerHTML = '<li>Couldn’t load resources. See <a href="/resources/learning/">all resources</a>.</li>';
    });
})();
</script>
