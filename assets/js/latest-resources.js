<script>
(function () {
  const target = document.getElementById('latest-resources');
  if (!target) return;

  fetch('/downloads/resources.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(d => Array.isArray(d?.resources) ? d.resources : [])
    .then(items => {
      // newest first by ISO date (YYYY-MM-DD)
      items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
      const latest = items.slice(0, 3);

      if (!latest.length) {
        target.innerHTML = '<li>No resources yet. Visit <a href="/resources.en.html">all resources</a>.</li>';
        return;
      }

      target.innerHTML = '';
      latest.forEach(it => {
        // Prefer a PDF link if present, otherwise first file
        const pdf = (it.files || []).find(f => /pdf/i.test(f.label || ''));
        const f = pdf || (it.files || [])[0];
        if (!f) return;

        const li = document.createElement('li');
        const tag = it.tags && it.tags.length ? ` <small>(${it.tags.join(', ')})</small>` : '';
        li.innerHTML = `<a href="${f.url}" download>${it.title}</a>${tag}`;
        target.appendChild(li);
      });
    })
    .catch(() => {
      target.innerHTML = '<li>Couldn’t load resources. See <a href="/resources.en.html">all resources</a>.</li>';
    });
})();
</script>
