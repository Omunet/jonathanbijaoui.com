(function () {
  "use strict";

  // Paste the Apps Script web app URL here after deploying form-backend/Code.gs.
  // It ends with /exec. Leave this empty until then: the form shows a
  // not-connected message instead of sending.
  // The inbox address is not stored in this file.
  var FORM_ENDPOINT = "";
  // Optional. Sent only when the script property SHARED_SECRET is set to the same value.
  var FORM_TOKEN = "";
  var MAX_BYTES = 18 * 1024 * 1024;
  var MAX_FILES = 10;

  var KEY = "jb-lang";
  var LANGS = { en: "en", fr: "fr", es: "es", zh: "zh-Hans", "zh-Hans": "zh-Hans", "zh-CN": "zh-Hans" };
  var NAMES = { en: "English", fr: "Français", es: "Español", zh: "中文" };
  var LOCALES = { en: "en_US", fr: "fr_FR", es: "es_ES", zh: "zh_CN" };

  var I18N = {
    en: {
      "meta.title": "Jonathan Bijaoui",
      "meta.description": "Personal site of Jonathan Bijaoui.",
      "skip": "Skip to content",
      "nav.open": "Open menu",
      "nav.close": "Close menu",
      "nav.label": "Main",
      "nav.projects": "Projects",
      "nav.creative": "Creative",
      "nav.services": "Services",
      "nav.contact": "Contact",
      "icon.nav": "Menu",
      "icon.home": "Home",
      "icon.projects": "Projects",
      "icon.creative": "Creative",
      "icon.services": "Services",
      "icon.contact": "Contact",
      "lang.label": "Choose language",
      "footer.note": "Personal site",
      "legal.privacy": "Privacy",
      "projects.title": "Projects — Jonathan Bijaoui",
      "projects.description": "Placeholder page for projects.",
      "projects.heading": "Projects",
      "projects.intro": "Placeholder copy. Project entries will appear here.",
      "projects.placeholderName": "Project name",
      "projects.placeholderAlt": "Placeholder image",
      "projects.newTab": "Opens in a new tab",
      "creative.title": "Creative — Jonathan Bijaoui",
      "creative.description": "Placeholder page for creative work.",
      "creative.heading": "Creative",
      "creative.intro": "Placeholder copy. This page will present creative work.",
      "creative.s1": "Selected work",
      "creative.s1body": "Placeholder text. A short description of creative work will go here.",
      "creative.s2": "Notes",
      "creative.s2body": "Placeholder text. Further details can be added later.",
      "services.title": "Services — Jonathan Bijaoui",
      "services.description": "Placeholder page for services.",
      "services.heading": "Services",
      "services.intro": "Placeholder copy. This page will describe services.",
      "services.s1": "Overview",
      "services.s1body": "Placeholder text. A short description of services will go here.",
      "services.s2": "Next step",
      "services.s2body": "Placeholder text. Use the contact form to send a message.",
      "privacy.title": "Privacy policy — Jonathan Bijaoui",
      "privacy.description": "How this personal site handles the contact form, hosting, and language preference.",
      "privacy.heading": "Privacy policy",
      "notfound.title": "Page not found — Jonathan Bijaoui",
      "notfound.description": "This page does not exist.",
      "notfound.heading": "Page not found",
      "notfound.text": "This page does not exist or has moved.",
      "notfound.home": "Back to the homepage",
      "form.title": "Contact",
      "form.close": "Close",
      "form.name": "Name",
      "form.surname": "Surname",
      "form.email": "Email",
      "form.phone": "Phone",
      "form.optional": "optional",
      "form.message": "Message",
      "form.attach": "Attach files",
      "form.fileList": "Attached files",
      "form.remove": "Remove",
      "form.removeNamed": "Remove {name}",
      "form.total": "Total: {size} / 18 MB",
      "form.consentBefore": "I agree that my information may be used to answer this message, as described in the ",
      "form.privacy": "privacy policy",
      "form.consentAfter": ".",
      "form.notice": "The purpose is to answer your message. The legal basis is your consent. This site stores nothing: the message and files are sent by email and kept only as long as needed to reply, then deleted. To ask about your information (access, correction, deletion, and so on), use this form. You can also contact your local data protection authority.",
      "form.noticeAge": "If you are under 16, use this form only with permission from a parent or guardian.",
      "form.noticeSensitive": "Do not send sensitive information, or photos or videos of other people, without their permission.",
      "form.noticePolicy": "Privacy policy",
      "form.send": "Send",
      "form.sending": "Sending…",
      "form.success": "Message sent. Thank you.",
      "form.error": "Could not send. Please try again.",
      "form.wait": "Wait a few seconds, then send it again.",
      "form.rate": "Several messages were sent in a row. Please try again later.",
      "form.busy": "It cannot be sent right now. Please try again later.",
      "form.size": "The files are over 18 MB in total. For a larger video, send a link in the message.",
      "form.tooLarge": "The files are too large for email. Send a link in the message.",
      "form.type": "Only images, videos and PDFs are accepted.",
      "form.count": "You can attach up to 10 files.",
      "form.invalid": "Check the fields and try again.",
      "form.unconfigured": "The contact form is not connected yet."
    },
    fr: {
      "meta.title": "Jonathan Bijaoui",
      "meta.description": "Site personnel de Jonathan Bijaoui.",
      "skip": "Aller au contenu",
      "nav.open": "Ouvrir le menu",
      "nav.close": "Fermer le menu",
      "nav.label": "Principal",
      "nav.projects": "Projets",
      "nav.creative": "Création",
      "nav.services": "Services",
      "nav.contact": "Contact",
      "icon.nav": "Menu",
      "icon.home": "Accueil",
      "icon.projects": "Projets",
      "icon.creative": "Création",
      "icon.services": "Services",
      "icon.contact": "Contact",
      "lang.label": "Choisir la langue",
      "footer.note": "Site personnel",
      "legal.privacy": "Confidentialité",
      "projects.title": "Projets — Jonathan Bijaoui",
      "projects.description": "Page provisoire pour les projets.",
      "projects.heading": "Projets",
      "projects.intro": "Texte provisoire. Les projets apparaîtront ici.",
      "projects.placeholderName": "Nom du projet",
      "projects.placeholderAlt": "Image provisoire",
      "projects.newTab": "S'ouvre dans un nouvel onglet",
      "creative.title": "Création — Jonathan Bijaoui",
      "creative.description": "Page provisoire pour le travail créatif.",
      "creative.heading": "Création",
      "creative.intro": "Texte provisoire. Cette page présentera le travail créatif.",
      "creative.s1": "Travaux choisis",
      "creative.s1body": "Texte provisoire. Une courte description du travail créatif viendra ici.",
      "creative.s2": "Notes",
      "creative.s2body": "Texte provisoire. D'autres détails pourront être ajoutés plus tard.",
      "services.title": "Services — Jonathan Bijaoui",
      "services.description": "Page provisoire pour les services.",
      "services.heading": "Services",
      "services.intro": "Texte provisoire. Cette page décrira les services.",
      "services.s1": "Aperçu",
      "services.s1body": "Texte provisoire. Une courte description des services viendra ici.",
      "services.s2": "Étape suivante",
      "services.s2body": "Texte provisoire. Utilisez le formulaire de contact pour envoyer un message.",
      "privacy.title": "Politique de confidentialité — Jonathan Bijaoui",
      "privacy.description": "Comment ce site personnel traite le formulaire de contact, l'hébergement et le choix de la langue.",
      "privacy.heading": "Politique de confidentialité",
      "notfound.title": "Page introuvable — Jonathan Bijaoui",
      "notfound.description": "Cette page n'existe pas.",
      "notfound.heading": "Page introuvable",
      "notfound.text": "Cette page n'existe pas ou a changé d'adresse.",
      "notfound.home": "Retour à l'accueil",
      "form.title": "Contact",
      "form.close": "Fermer",
      "form.name": "Prénom",
      "form.surname": "Nom",
      "form.email": "E-mail",
      "form.phone": "Téléphone",
      "form.optional": "facultatif",
      "form.message": "Message",
      "form.attach": "Joindre des fichiers",
      "form.fileList": "Fichiers joints",
      "form.remove": "Retirer",
      "form.removeNamed": "Retirer {name}",
      "form.total": "Total : {size} / 18 MB",
      "form.consentBefore": "J'accepte que mes informations soient utilisées pour répondre à ce message, selon la ",
      "form.privacy": "politique de confidentialité",
      "form.consentAfter": ".",
      "form.notice": "La finalité est de répondre à votre message. La base légale est votre consentement. Ce site ne conserve rien : le message et les fichiers sont envoyés par e-mail et conservés seulement le temps nécessaire pour répondre, puis supprimés. Pour toute demande sur vos informations (accès, rectification, effacement, etc.), utilisez ce formulaire. Vous pouvez aussi vous adresser à l'autorité de protection des données de votre pays.",
      "form.noticeAge": "Si vous avez moins de 16 ans, utilisez ce formulaire seulement avec l'autorisation d'un parent ou d'un tuteur.",
      "form.noticeSensitive": "N'envoyez pas d'informations sensibles, ni de photos ou de vidéos d'autres personnes, sans leur autorisation.",
      "form.noticePolicy": "Politique de confidentialité",
      "form.send": "Envoyer",
      "form.sending": "Envoi…",
      "form.success": "Message envoyé. Merci.",
      "form.error": "L'envoi a échoué. Veuillez réessayer.",
      "form.wait": "Attendez quelques secondes, puis envoyez-le de nouveau.",
      "form.rate": "Plusieurs messages ont été envoyés d'affilée. Veuillez réessayer plus tard.",
      "form.busy": "L'envoi est impossible pour le moment. Veuillez réessayer plus tard.",
      "form.size": "Les fichiers dépassent 18 MB au total. Pour une vidéo plus lourde, envoyez un lien dans le message.",
      "form.tooLarge": "Les fichiers sont trop volumineux pour l'e-mail. Envoyez un lien dans le message.",
      "form.type": "Seules les images, les vidéos et les PDF sont acceptés.",
      "form.count": "Vous pouvez joindre jusqu'à 10 fichiers.",
      "form.invalid": "Vérifiez les champs et réessayez.",
      "form.unconfigured": "Le formulaire de contact n'est pas encore connecté."
    },
    es: {
      "meta.title": "Jonathan Bijaoui",
      "meta.description": "Sitio personal de Jonathan Bijaoui.",
      "skip": "Saltar al contenido",
      "nav.open": "Abrir el menú",
      "nav.close": "Cerrar el menú",
      "nav.label": "Principal",
      "nav.projects": "Proyectos",
      "nav.creative": "Creación",
      "nav.services": "Servicios",
      "nav.contact": "Contacto",
      "icon.nav": "Menú",
      "icon.home": "Inicio",
      "icon.projects": "Proyectos",
      "icon.creative": "Creación",
      "icon.services": "Servicios",
      "icon.contact": "Contacto",
      "lang.label": "Elegir idioma",
      "footer.note": "Sitio personal",
      "legal.privacy": "Privacidad",
      "projects.title": "Proyectos — Jonathan Bijaoui",
      "projects.description": "Página provisional de proyectos.",
      "projects.heading": "Proyectos",
      "projects.intro": "Texto provisional. Los proyectos aparecerán aquí.",
      "projects.placeholderName": "Nombre del proyecto",
      "projects.placeholderAlt": "Imagen provisional",
      "projects.newTab": "Se abre en una pestaña nueva",
      "creative.title": "Creación — Jonathan Bijaoui",
      "creative.description": "Página provisional para el trabajo creativo.",
      "creative.heading": "Creación",
      "creative.intro": "Texto provisional. Esta página presentará el trabajo creativo.",
      "creative.s1": "Trabajos seleccionados",
      "creative.s1body": "Texto provisional. Aquí irá una breve descripción del trabajo creativo.",
      "creative.s2": "Notas",
      "creative.s2body": "Texto provisional. Más adelante se pueden añadir otros detalles.",
      "services.title": "Servicios — Jonathan Bijaoui",
      "services.description": "Página provisional de servicios.",
      "services.heading": "Servicios",
      "services.intro": "Texto provisional. Esta página describirá los servicios.",
      "services.s1": "Resumen",
      "services.s1body": "Texto provisional. Aquí irá una breve descripción de los servicios.",
      "services.s2": "Siguiente paso",
      "services.s2body": "Texto provisional. Usa el formulario de contacto para enviar un mensaje.",
      "privacy.title": "Política de privacidad — Jonathan Bijaoui",
      "privacy.description": "Cómo trata este sitio personal el formulario de contacto, el alojamiento y la preferencia de idioma.",
      "privacy.heading": "Política de privacidad",
      "notfound.title": "Página no encontrada — Jonathan Bijaoui",
      "notfound.description": "Esta página no existe.",
      "notfound.heading": "Página no encontrada",
      "notfound.text": "Esta página no existe o ha cambiado de dirección.",
      "notfound.home": "Volver al inicio",
      "form.title": "Contacto",
      "form.close": "Cerrar",
      "form.name": "Nombre",
      "form.surname": "Apellidos",
      "form.email": "Correo electrónico",
      "form.phone": "Teléfono",
      "form.optional": "opcional",
      "form.message": "Mensaje",
      "form.attach": "Adjuntar archivos",
      "form.fileList": "Archivos adjuntos",
      "form.remove": "Quitar",
      "form.removeNamed": "Quitar {name}",
      "form.total": "Total: {size} / 18 MB",
      "form.consentBefore": "Acepto que mis datos se usen para responder a este mensaje, según la ",
      "form.privacy": "política de privacidad",
      "form.consentAfter": ".",
      "form.notice": "La finalidad es responder a tu mensaje. La base legal es tu consentimiento. Este sitio no guarda nada: el mensaje y los archivos se envían por correo y se conservan solo el tiempo necesario para responder, y después se borran. Para cualquier solicitud sobre tu información (acceso, rectificación, supresión, etc.) usa este formulario. También puedes dirigirte a la autoridad de protección de datos de tu país.",
      "form.noticeAge": "Si tienes menos de 16 años, usa este formulario solo con el permiso de tu padre, madre o tutor.",
      "form.noticeSensitive": "No envíes datos sensibles ni fotos o vídeos de otras personas sin su permiso.",
      "form.noticePolicy": "Política de privacidad",
      "form.send": "Enviar",
      "form.sending": "Enviando…",
      "form.success": "Mensaje enviado. Gracias.",
      "form.error": "No se ha podido enviar. Inténtalo de nuevo.",
      "form.wait": "Espera unos segundos y vuelve a enviarlo.",
      "form.rate": "Se han enviado varios mensajes seguidos. Inténtalo más tarde.",
      "form.busy": "No se puede enviar ahora. Inténtalo más tarde.",
      "form.size": "Los archivos superan 18 MB en total. Para un vídeo más grande, envía un enlace en el mensaje.",
      "form.tooLarge": "Los archivos son demasiado grandes para el correo. Envía un enlace en el mensaje.",
      "form.type": "Solo se admiten imágenes, vídeos y PDF.",
      "form.count": "Puedes adjuntar hasta 10 archivos.",
      "form.invalid": "Revisa los campos e inténtalo de nuevo.",
      "form.unconfigured": "El formulario de contacto aún no está conectado."
    },
    zh: {
      "meta.title": "Jonathan Bijaoui",
      "meta.description": "Jonathan Bijaoui 的个人网站。",
      "skip": "跳到内容",
      "nav.open": "打开菜单",
      "nav.close": "关闭菜单",
      "nav.label": "主导航",
      "nav.projects": "项目",
      "nav.creative": "创作",
      "nav.services": "服务",
      "nav.contact": "联系",
      "icon.nav": "菜单",
      "icon.home": "首页",
      "icon.projects": "项目",
      "icon.creative": "创作",
      "icon.services": "服务",
      "icon.contact": "联系",
      "lang.label": "选择语言",
      "footer.note": "个人网站",
      "legal.privacy": "隐私",
      "projects.title": "项目 — Jonathan Bijaoui",
      "projects.description": "项目页面的占位内容。",
      "projects.heading": "项目",
      "projects.intro": "占位文字。项目条目将显示在这里。",
      "projects.placeholderName": "项目名称",
      "projects.placeholderAlt": "占位图片",
      "projects.newTab": "在新标签页中打开",
      "creative.title": "创作 — Jonathan Bijaoui",
      "creative.description": "创作页面的占位内容。",
      "creative.heading": "创作",
      "creative.intro": "占位文字。此页面将展示创作内容。",
      "creative.s1": "精选作品",
      "creative.s1body": "占位文字。这里将放一段关于创作的简短说明。",
      "creative.s2": "说明",
      "creative.s2body": "占位文字。以后可以在这里补充更多内容。",
      "services.title": "服务 — Jonathan Bijaoui",
      "services.description": "服务页面的占位内容。",
      "services.heading": "服务",
      "services.intro": "占位文字。此页面将介绍各项服务。",
      "services.s1": "概述",
      "services.s1body": "占位文字。这里将放一段关于服务的简短说明。",
      "services.s2": "下一步",
      "services.s2body": "占位文字。请使用联系表单发送消息。",
      "privacy.title": "隐私政策 — Jonathan Bijaoui",
      "privacy.description": "本个人网站如何处理联系表单、网站托管和语言偏好。",
      "privacy.heading": "隐私政策",
      "notfound.title": "未找到页面 — Jonathan Bijaoui",
      "notfound.description": "此页面不存在。",
      "notfound.heading": "未找到页面",
      "notfound.text": "此页面不存在或已更换地址。",
      "notfound.home": "返回首页",
      "form.title": "联系",
      "form.close": "关闭",
      "form.name": "名字",
      "form.surname": "姓氏",
      "form.email": "电子邮件",
      "form.phone": "电话",
      "form.optional": "可选",
      "form.message": "留言",
      "form.attach": "添加附件",
      "form.fileList": "附件",
      "form.remove": "移除",
      "form.removeNamed": "移除 {name}",
      "form.total": "合计：{size} / 18 MB",
      "form.consentBefore": "我同意按照",
      "form.privacy": "隐私政策",
      "form.consentAfter": "使用我的信息以回复此消息。",
      "form.notice": "目的是回复你的消息。法律依据是你的同意。本网站不保存任何内容：留言和文件通过电子邮件发送，只在回复所需的时间内保留，之后会删除。如需查询你的信息（访问、更正、删除等），请使用此表单。你也可以联系你所在地的数据保护机构。",
      "form.noticeAge": "如果未满 16 岁，请在父母或监护人允许后再使用此表单。",
      "form.noticeSensitive": "未经允许，请勿发送敏感信息，或他人的照片和视频。",
      "form.noticePolicy": "隐私政策",
      "form.send": "发送",
      "form.sending": "正在发送…",
      "form.success": "消息已发送。谢谢。",
      "form.error": "未能发送。请再试一次。",
      "form.wait": "请稍等几秒后再发送。",
      "form.rate": "刚刚连续发送了多条消息。请稍后再试。",
      "form.busy": "现在无法发送。请稍后再试。",
      "form.size": "文件合计超过 18 MB。较大的视频请在留言中发送链接。",
      "form.tooLarge": "文件太大，无法通过电子邮件发送。请在留言中发送链接。",
      "form.type": "仅接受图片、视频和 PDF。",
      "form.count": "最多可以附加 10 个文件。",
      "form.invalid": "请检查填写内容后再试。",
      "form.unconfigured": "联系表单尚未连接。"
    }
  };

  var current = "en";
  var afterApply = [];
  var formStarted = 0;
  var contactFiles = [];
  var contactSending = false;
  var contactStatusKey = "";
  var contactStatusTone = "";
  var contactSeq = 1;
  var ignoreOutsideUntil = 0;
  var lang = document.querySelector(".lang");
  var langBtn = document.getElementById("lang-btn");
  var langMenu = document.getElementById("lang-menu");
  var langOptions = langMenu.querySelectorAll("[data-lang]");
  var desc = document.querySelector('meta[name="description"]');

  function codeFrom(value) {
    if (!value) return "";
    if (value === "zh" || value === "zh-Hans" || value === "zh-CN") return "zh";
    if (value === "en" || value === "fr" || value === "es") return value;
    return "";
  }

  function htmlLang(code) {
    return LANGS[code] || "en";
  }

  function queryLang() {
    try {
      return codeFrom(new URLSearchParams(location.search).get("lang") || "");
    } catch (e) {
      return "";
    }
  }

  function setMeta(selector, attr, value) {
    var el = document.querySelector(selector);
    if (el && value) el.setAttribute(attr, value);
  }

  function apply(next) {
    var pack = I18N[next];
    if (!pack) return;
    current = next;
    document.documentElement.lang = htmlLang(next);
    var page = document.body.getAttribute("data-page");
    var titleKey = page ? page + ".title" : "meta.title";
    var descKey = page ? page + ".description" : "meta.description";
    document.title = pack[titleKey] || pack["meta.title"];
    if (desc && pack[descKey]) desc.setAttribute("content", pack[descKey]);
    setMeta('meta[property="og:title"]', "content", document.title);
    setMeta('meta[property="og:description"]', "content", pack[descKey] || "");
    setMeta('meta[property="og:locale"]', "content", LOCALES[next] || "en_US");
    document.querySelectorAll("[data-lang-block]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang-block") !== next;
    });
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (pack[key] != null) el.textContent = pack[key];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (pack[key] != null) el.setAttribute("aria-label", pack[key]);
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-title");
      if (pack[key] != null) el.setAttribute("title", pack[key]);
    });
    if (langBtn) langBtn.setAttribute("aria-label", pack["lang.label"] + ": " + (NAMES[next] || next));
    langOptions.forEach(function (btn) {
      btn.setAttribute("aria-selected", btn.getAttribute("data-lang") === next ? "true" : "false");
    });
    afterApply.forEach(function (fn) { fn(); });
  }

  function t(key) {
    var pack = I18N[current];
    if (pack && pack[key] != null) return pack[key];
    return "";
  }

  function fill(template, token, value) {
    return String(template).split(token).join(value);
  }

  function remember(next) {
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {}
  }

  function closeLang() {
    langMenu.hidden = true;
    langBtn.setAttribute("aria-expanded", "false");
  }

  function openLang() {
    closeContact(false);
    langMenu.hidden = false;
    langBtn.setAttribute("aria-expanded", "true");
  }

  langBtn.addEventListener("click", function () {
    if (langMenu.hidden) openLang();
    else closeLang();
  });

  langOptions.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = btn.getAttribute("data-lang");
      apply(next);
      remember(next);
      closeLang();
      langBtn.focus();
    });
  });

  langBtn.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    openLang();
    var items = langMenu.querySelectorAll('[role="option"]');
    var target = e.key === "ArrowUp" ? items[items.length - 1] : items[0];
    target.focus();
  });

  langMenu.addEventListener("keydown", function (e) {
    var items = Array.prototype.slice.call(langMenu.querySelectorAll('[role="option"]'));
    var index = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      var dir = e.key === "ArrowDown" ? 1 : -1;
      items[(index + dir + items.length) % items.length].focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0].focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1].focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      closeLang();
      langBtn.focus();
    }
  });

  lang.addEventListener("focusout", function (e) {
    if (!lang.contains(e.relatedTarget)) closeLang();
  });

  document.addEventListener("click", function (e) {
    if (!lang.contains(e.target)) closeLang();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (closeContact(true)) {
      e.preventDefault();
      return;
    }
    if (!langMenu.hidden) {
      closeLang();
      langBtn.focus();
    }
  });

  function contactRoot() {
    return document.querySelector(".contact");
  }

  function syncContactLabel() {
    var btn = document.getElementById("contact-btn");
    if (!btn) return;
    var open = btn.getAttribute("aria-expanded") === "true";
    var key = open ? "form.close" : "icon.contact";
    btn.setAttribute("aria-label", t(key));
    btn.setAttribute("title", t(key));
  }

  function focusEl(el) {
    if (!el) return;
    try {
      el.focus({ preventScroll: true });
    } catch (err) {
      el.focus();
    }
  }

  function contactBackdrop() {
    var backdrop = document.getElementById("contact-backdrop");
    if (backdrop) return backdrop;
    var header = document.querySelector(".site-header");
    if (!header) return null;
    backdrop = document.createElement("button");
    backdrop.type = "button";
    backdrop.id = "contact-backdrop";
    backdrop.className = "contact-backdrop";
    backdrop.tabIndex = -1;
    backdrop.setAttribute("aria-hidden", "true");
    backdrop.hidden = true;
    header.appendChild(backdrop);
    backdrop.addEventListener("click", function () {
      closeContact(false);
    });
    return backdrop;
  }

  function openContact() {
    var panel = document.getElementById("contact-panel");
    var btn = document.getElementById("contact-btn");
    if (!panel || !btn) return;
    closeLang();
    if (!formStarted) formStarted = Date.now();
    var backdrop = contactBackdrop();
    if (backdrop) backdrop.hidden = false;
    panel.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    syncContactLabel();
    focusEl(document.getElementById("contact-name"));
  }

  function closeContact(restoreFocus) {
    var panel = document.getElementById("contact-panel");
    var btn = document.getElementById("contact-btn");
    if (!panel || !btn || panel.hidden) return false;
    panel.hidden = true;
    var backdrop = document.getElementById("contact-backdrop");
    if (backdrop) backdrop.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    syncContactLabel();
    if (restoreFocus) focusEl(btn);
    return true;
  }

  function setStatus(key, tone) {
    contactStatusKey = key || "";
    contactStatusTone = tone || "";
    var el = document.getElementById("contact-status");
    if (!el) return;
    el.textContent = contactStatusKey ? t(contactStatusKey) : "";
    el.className = "form-status" + (contactStatusTone ? " is-" + contactStatusTone : "");
  }

  function formatSize(bytes) {
    var mb = bytes / (1024 * 1024);
    var text = mb >= 0.1 ? mb.toFixed(1) : (bytes / 1024).toFixed(0) + " KB";
    if (mb >= 0.1 && current !== "en" && current !== "zh") text = text.replace(".", ",");
    if (mb < 0.1) return text;
    return text + " MB";
  }

  function fileExt(name) {
    var parts = String(name || "").toLowerCase().split(".");
    return parts.length > 1 ? parts.pop() : "";
  }

  function fileAllowed(file) {
    if (!file || !file.size) return false;
    var type = String(file.type || "").toLowerCase().split(";")[0].trim();
    var ext = fileExt(file.name);
    var images = { jpg: 1, jpeg: 1, png: 1, gif: 1, webp: 1, bmp: 1, heic: 1, heif: 1, avif: 1, svg: 1 };
    var videos = { mp4: 1, m4v: 1, webm: 1, mov: 1, avi: 1, mkv: 1, mpeg: 1, mpg: 1, "3gp": 1, ogv: 1 };
    if (ext === "pdf") return type === "application/pdf";
    if (images[ext]) return type.indexOf("image/") === 0;
    if (videos[ext]) return type.indexOf("video/") === 0;
    return false;
  }

  function renderFiles() {
    var list = document.getElementById("contact-files");
    var totalEl = document.getElementById("contact-total");
    if (!list) return;
    while (list.firstChild) list.removeChild(list.firstChild);
    var total = 0;
    contactFiles.forEach(function (item) {
      total += item.file.size;
      var li = document.createElement("li");
      var name = document.createElement("span");
      name.className = "file-name";
      name.textContent = item.file.name;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "file-remove";
      btn.setAttribute("data-id", String(item.id));
      btn.textContent = t("form.remove");
      btn.setAttribute("aria-label", fill(t("form.removeNamed"), "{name}", item.file.name));
      if (contactSending) btn.disabled = true;
      li.appendChild(name);
      li.appendChild(btn);
      list.appendChild(li);
    });
    if (!totalEl) return;
    if (!contactFiles.length) {
      totalEl.hidden = true;
      totalEl.textContent = "";
      return;
    }
    totalEl.hidden = false;
    totalEl.textContent = fill(t("form.total"), "{size}", formatSize(total));
  }

  function addFiles(list) {
    var incoming = Array.prototype.slice.call(list || []);
    if (!incoming.length) return;
    var next = contactFiles.slice();
    var rejectedType = false;
    var rejectedCount = false;
    var rejectedSize = false;
    incoming.forEach(function (file) {
      if (!fileAllowed(file)) {
        rejectedType = true;
        return;
      }
      if (next.length >= MAX_FILES) {
        rejectedCount = true;
        return;
      }
      var duplicate = next.some(function (item) {
        var prev = item.file;
        return prev.name === file.name && prev.size === file.size && prev.lastModified === file.lastModified;
      });
      if (duplicate) return;
      var total = file.size;
      next.forEach(function (item) { total += item.file.size; });
      if (total > MAX_BYTES) {
        rejectedSize = true;
        return;
      }
      next.push({ id: contactSeq++, file: file });
    });
    contactFiles = next;
    renderFiles();
    if (rejectedSize) setStatus("form.size", "error");
    else if (rejectedType) setStatus("form.type", "error");
    else if (rejectedCount) setStatus("form.count", "error");
    else if (contactStatusKey === "form.size" || contactStatusKey === "form.type" || contactStatusKey === "form.count") setStatus("", "");
  }

  function trimField(id) {
    var el = document.getElementById(id);
    if (!el) return "";
    var value = String(el.value || "").replace(/^\s+|\s+$/g, "");
    el.value = value;
    return value;
  }

  function readFile(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        var raw = String(reader.result || "");
        var comma = raw.indexOf(",");
        resolve({
          name: file.name,
          type: file.type || "",
          data: comma >= 0 ? raw.slice(comma + 1) : raw
        });
      };
      reader.onerror = function () { reject(new Error("read")); };
      reader.readAsDataURL(file);
    });
  }

  function setBusy(on) {
    contactSending = on;
    var form = document.getElementById("contact-form");
    var sendBtn = document.getElementById("contact-send");
    if (form) form.setAttribute("aria-busy", on ? "true" : "false");
    if (sendBtn) {
      sendBtn.disabled = on;
      sendBtn.textContent = on ? t("form.sending") : t("form.send");
    }
    if (!form) return;
    var controls = form.querySelectorAll("input, textarea, button");
    Array.prototype.forEach.call(controls, function (control) {
      if (control === sendBtn) return;
      if (control.type === "file") return;
      control.disabled = on;
    });
  }

  function knownStatus(code) {
    if (code === "wait") return "form.wait";
    if (code === "rate") return "form.rate";
    if (code === "busy") return "form.busy";
    if (code === "size") return "form.size";
    if (code === "too_large") return "form.tooLarge";
    if (code === "invalid") return "form.invalid";
    return "form.error";
  }

  function initContact() {
    var root = contactRoot();
    var btn = document.getElementById("contact-btn");
    var panel = document.getElementById("contact-panel");
    var form = document.getElementById("contact-form");
    if (!root || !btn || !panel || !form) return;

    btn.addEventListener("click", function () {
      if (panel.hidden) openContact();
      else closeContact(false);
    });

    var closeBtn = document.getElementById("contact-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        closeContact(true);
      });
    }

    document.querySelectorAll(".js-contact").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        openContact();
      });
    });

    document.addEventListener("click", function (e) {
      if (Date.now() < ignoreOutsideUntil) return;
      if (root.contains(e.target)) return;
      if (e.target.closest && e.target.closest(".js-contact")) return;
      closeContact(false);
    });

    root.addEventListener("focusout", function (e) {
      if (!e.relatedTarget) return;
      if (!root.contains(e.relatedTarget)) closeContact(false);
    });

    var fileInput = document.getElementById("contact-file");
    var attachBtn = document.getElementById("contact-attach");
    if (attachBtn && fileInput) {
      attachBtn.addEventListener("click", function () {
        ignoreOutsideUntil = Date.now() + 2000;
        fileInput.click();
      });
    }
    if (fileInput) {
      fileInput.addEventListener("change", function () {
        ignoreOutsideUntil = Date.now() + 500;
        addFiles(fileInput.files);
        fileInput.value = "";
      });
    }
    window.addEventListener("focus", function () {
      if (Date.now() < ignoreOutsideUntil) ignoreOutsideUntil = Date.now() + 400;
    });

    var fileList = document.getElementById("contact-files");
    if (fileList) {
      fileList.addEventListener("click", function (e) {
        var target = e.target.closest ? e.target.closest("button") : null;
        if (!target || !fileList.contains(target) || contactSending) return;
        var id = target.getAttribute("data-id");
        contactFiles = contactFiles.filter(function (item) { return String(item.id) !== id; });
        renderFiles();
        if (contactStatusKey === "form.size" || contactStatusKey === "form.type" || contactStatusKey === "form.count") {
          setStatus("", "");
        }
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (contactSending) return;
      trimField("contact-name");
      trimField("contact-surname");
      trimField("contact-email");
      trimField("contact-phone");
      trimField("contact-message");
      if (!form.reportValidity()) return;
      var total = 0;
      contactFiles.forEach(function (item) { total += item.file.size; });
      if (total > MAX_BYTES) {
        setStatus("form.size", "error");
        return;
      }
      if (!FORM_ENDPOINT) {
        setStatus("form.unconfigured", "error");
        return;
      }
      if (!formStarted || Date.now() - formStarted < 3000) {
        setStatus("form.wait", "error");
        return;
      }
      setStatus("", "");
      setBusy(true);
      Promise.all(contactFiles.map(function (item) { return readFile(item.file); }))
        .then(function (files) {
          var payload = {
            name: document.getElementById("contact-name").value,
            surname: document.getElementById("contact-surname").value,
            email: document.getElementById("contact-email").value,
            phone: document.getElementById("contact-phone").value,
            message: document.getElementById("contact-message").value,
            company: (document.getElementById("contact-company") || { value: "" }).value,
            lang: current || "en",
            started: formStarted,
            origin: location.origin,
            files: files
          };
          if (FORM_TOKEN) payload.token = FORM_TOKEN;
          // text/plain avoids a CORS preflight. Apps Script answers with a
          // redirect; the browser follows it and we read the final JSON.
          return fetch(FORM_ENDPOINT, {
            method: "POST",
            redirect: "follow",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload)
          }).then(function (res) { return res.text(); });
        })
        .then(function (text) {
          var data;
          try {
            data = JSON.parse(text);
          } catch (err) {
            throw new Error("bad-response");
          }
          if (!data || data.ok !== true) {
            var failure = new Error("form");
            failure.code = data && data.error;
            throw failure;
          }
          form.reset();
          contactFiles = [];
          renderFiles();
          formStarted = Date.now();
          setStatus("form.success", "ok");
        })
        .catch(function (err) {
          setStatus(knownStatus(err && err.code), "error");
        })
        .then(function () {
          setBusy(false);
        });
    });

    afterApply.push(function () {
      syncContactLabel();
      renderFiles();
      var sendBtn = document.getElementById("contact-send");
      if (sendBtn) sendBtn.textContent = contactSending ? t("form.sending") : t("form.send");
      if (contactStatusKey) setStatus(contactStatusKey, contactStatusTone);
    });
  }

  initContact();

  var fromQuery = queryLang();
  if (fromQuery) {
    apply(fromQuery);
    remember(fromQuery);
  } else {
    var stored = "";
    try {
      stored = codeFrom(localStorage.getItem(KEY) || "");
    } catch (e) {}
    apply(stored || "en");
  }

  window.JB_I18N = {
    t: t,
    lang: function () { return current; }
  };
})();
