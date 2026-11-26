# Contact form web app

Google Apps Script web app for the contact form on jonathanbijaoui.com. The inbox that receives messages is a script property named `RECIPIENT`. Do not put that address in this repository, in the page, or in a response from the script.

`FORM_ENDPOINT` in `js/main.js` is an empty string until you deploy. While it is empty, the form does not send and shows “The contact form is not connected yet.”

## Deploy on Jonathan’s Google account

1. Open [Google Apps Script](https://script.google.com) while signed in to the Google account that should send the mail, and create a project.
2. Replace the default script with `Code.gs` from this folder.
3. In the Apps Script editor, open **Project settings** (the gear) and add **Script properties**:
   - `RECIPIENT`: the inbox that should receive the messages. Set it only here. Never commit it.
   - `ALLOWED_ORIGINS`: `https://jonathanbijaoui.com,https://www.jonathanbijaoui.com,https://omunet.github.io`
     If you leave this property unset, `Code.gs` uses that same list.
   - `SHARED_SECRET` (optional): if this is set, each request must include the same value as `token`. Put that value in `FORM_TOKEN` in `js/main.js`. The page source is public, so this only stops clients that never read the script.
4. Choose **Deploy**, then **New deployment**. Click the gear next to “Select type”, choose **Web app**, and set:
   - **Execute as:** Me
   - **Who has access:** Anyone
     (older editors call this “Anyone, even anonymous”)
5. Click **Deploy** and authorize sending mail when Google asks. The script runs as the account you deploy with and only sends email. It does not store the message.
6. Copy the **Web app URL**. It looks like `https://script.google.com/macros/s/…/exec`. Copy only the URL that ends in `/exec`.
7. Paste that URL into `js/main.js` as the value of `FORM_ENDPOINT`:

   ```js
   var FORM_ENDPOINT = "https://script.google.com/macros/s/……/exec";
   ```

8. Commit and push that change, or edit the file on the branch you publish, so GitHub Pages serves the new address. Until this string is a real `/exec` URL, visitors see the not-connected message.

After editing `Code.gs`, open **Deploy**, **Manage deployments**, edit the web app (pencil), and set **Version** to **New version**. That keeps the same `/exec` URL, so you do not have to paste it again. You redeploy the script yourself; this repository does not deploy it.

## What the email contains

The site stores nothing. Each accepted message is mailed to `RECIPIENT`, with the visitor’s address as reply-to. The subject starts with `[jonathanbijaoui.com]` and the sender’s name. The body is in English. It says the message came from the contact form and includes the fields, the page language (English, Français, Español, or 中文), and the time in UTC. Uploaded files are attachments on that email, not links.

The page posts JSON as `text/plain`, so the browser does not send a CORS preflight. Apps Script answers with a redirect. The page follows it and reads `{"ok":true}` or `{"ok":false,"error":"..."}`. The error is a short code (`wait`, `rate`, `busy`, `size`, `too_large`, `invalid`, or `server`). The response does not include an inbox address.

Limits, checked on the raw file bytes: each file and the whole submission must be at most 18 MB. The request body cap is 30 MB so the base64 form of an 18 MB file still fits. Images, video (including mp4) and PDF are accepted only when both the type and the extension match. The message is limited to 4000 characters. Surname and phone may be empty. If `MailApp.getRemainingDailyQuota()` is 0, the script returns `busy` and sends nothing. If `sendEmail` throws because the message is too large, it returns `too_large`. Work stops with `busy` if it runs past five and a half minutes, inside Apps Script’s six-minute limit.

Spam checks, with no third-party captcha: a honeypot field named `company`, a minimum of about 3 seconds between opening the form and sending, and CacheService counters (not Script Properties) of about 5 messages per hour for the same visitor address and about 100 per hour overall.

`MailApp` sends as the deploying account. Consumer Google accounts can send on the order of 100 messages a day. When that quota is used up, the visitor is asked to try again later. Nothing is kept on the site.

Opening the `/exec` URL in a browser runs `doGet` and returns `{"ok":true}`. That check does not show the script properties.

## Local mock

No Google account is needed to try the form. From the site root:

```bash
node form-backend/mock-server.js
```

Open `http://127.0.0.1:8787/`. The server rewrites the empty `FORM_ENDPOINT` only in the JavaScript it serves, so the page posts to this mock instead of showing the not-connected message. The file in the repository stays empty.

A static server such as `python3 -m http.server` serves the files as published. On that server the endpoint is still empty, so the form shows the not-connected message. Use the mock when you want to submit.

The mock follows the Apps Script redirect: `POST /exec` responds with `302` to `/done`, and `/done` returns JSON. The terminal prints the sender’s name, the page language, and the file names. It does not have an inbox address and does not print one.

Wait about three seconds after opening the form before sending. A filled honeypot is reported as success and dropped. A post that arrives too quickly returns `{"ok":false,"error":"wait"}`.
