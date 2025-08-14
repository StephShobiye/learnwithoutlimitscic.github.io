# Cymru ALN CIC Website – v1.0 (14 Aug 2025)

This package contains README + LICENSE for the segmented deployment.

## How to Deploy (GitHub Pages, manual upload)
1) Create a new GitHub repo (public).
2) In your laptop folder, unzip **all 5 ZIPs** so their contents merge into a single tree (keep the same `assets/` structure).
3) In GitHub, click **Add files → Upload files**, drag the entire folder contents.
4) Commit with message: `Initial bilingual deploy – v1.0 – 14 August 2025`.
5) Go to **Settings → Pages**, set Source to **Deploy from a branch**, choose `main`, folder `/root`.
6) Wait for Pages to publish. If using a custom domain (cymrualn.org), add CNAME record pointing to `<username>.github.io` and add your domain under **Pages → Custom domain**.

## WCAG 2.2 Features
- Skip link, visible focus, semantic headings, ARIA labels
- Keyboard-friendly forms and controls
- Optional text reader (Web Speech API) on pages with the `readerToggle` button

## Next Steps
- Replace placeholders: Eventbrite URL, App purchase URL, Facebook group URL, Donate link
- Review Welsh copy with a native speaker or board reviewer for final wording
- Add favicon and additional images to `assets/img/` and entries to `alt_text.csv`

## Versioning
- Pages (EN): v1.0
- Pages (CY): v1.0
- Assets: v1.0
- Styles & Scripts: v1.0
- README & LICENSE: v1.0
