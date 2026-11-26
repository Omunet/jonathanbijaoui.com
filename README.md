# jonathanbijaoui.com

Personal site of Jonathan Bijaoui. Static files, published with GitHub Pages on the custom domain in `CNAME`. `.nojekyll` is kept so GitHub Pages serves the files as they are and does not run Jekyll.

English is the default language. The same pages are also available in French, Spanish, and Mandarin (Simplified Chinese) through the language menu. The choice is remembered in this browser.

## Pages

- **Home** (`index.html`): the mark, centered, and the menu.
- **Projects** (`projects/`): a grid of placeholder cards. To add one, edit the `PROJECTS` list in `projects/index.html` and put the image in `assets/projects/`.
- **Creative** (`creative/`): placeholder page.
- **Services** (`services/`): placeholder page.
- **Privacy** (`privacy.html`): privacy policy for this personal site.
- **404** (`404.html`): missing pages.

The word menu on the home page is Projects, Creative, Services, then Contact. Contact opens the form. The icon menu in the header is on every page.

## Languages

The globe button at the top right opens English, Français, Español, and 中文. The choice is stored in `localStorage` under `jb-lang`. A `?lang=` parameter (`en`, `fr`, `es`, `zh`, or `zh-Hans`) overrides it for that visit and is remembered. Simplified Chinese uses a CJK font fallback after Cinzel (system fonts such as PingFang SC, Noto Sans SC, Microsoft YaHei, and Source Han Sans).

## Contact form

The form posts to a Google Apps Script web app. Setup, including where to paste the `/exec` URL, is in [`form-backend/README.md`](form-backend/README.md). `FORM_ENDPOINT` in `js/main.js` stays empty until that URL exists. The inbox address is a script property and is not stored in this repository.

## Local preview

```bash
python3 -m http.server 8000
```

Open `http://127.0.0.1:8000/`. The contact form shows that it is not connected yet.

To try a submission, use the mock, which serves the site and points the form at itself:

```bash
node form-backend/mock-server.js
```

Open `http://127.0.0.1:8787/`. Wait about three seconds after opening the form before sending.

## Theme

Page background `#0A1130`, brand navy `#001221`, mark `#F9F9F9`. The accent used by the contact form, the send button, and the selected language is dark blood red `#7A0A0A` (hover `#8E1010`) with light text.

There are no analytics scripts and no third-party trackers. Cinzel is self-hosted under the SIL Open Font License (`assets/fonts/OFL.txt`).
