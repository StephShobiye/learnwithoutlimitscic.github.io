(function () {
  const target = document.getElementById('latest-resources');
  if (!target) return;

  // Pick the right resources page link by language
  const lang = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
  const allPage = lang === 'cy' ? '/resources.cy.html' : '/resources.en.html';

  fetch('/downloads/resources.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(data => {
      const items = Array.isArray(data?.resources) ? data.resources : [];
      // newest first by ISO date string
      items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
      const latest = items.slice(0, 3);

      if (!latest.length) {
        target.innerHTML = `<li>No resources yet. Visit <a href="${allPage}">all resources</a>.</li>`;
        return;
      }

      target.innerHTML = '';
      latest.forEach(it => {
        const firstFile = Array.isArray(it.files) && it.files[0] ? it.files[0] : null;
        const href = firstFile ? firstFile.url : allPage;
        const type = firstFile?.label ? ` <small>(${firstFile.label})</small>` : '';
        const date = it.date ? ` <small>${it.date}</small>` : '';
        const li = document.createElement('li');
        li.innerHTML = `<a href="${href}" download>${it.title}</a>${type}${date}`;
        target.appendChild(li);
      });
    })
    .catch(() => {
      target.innerHTML = `<li>Couldn’t load resources. See <a href="${allPage}">all resources</a>.</li>`;
    });
})();
