/* Premium AI SaaS static site helpers
   - Mobile nav toggle
   - Scroll reveal micro-interactions
   - WhatsApp CTA routing with prefilled lead details
*/

(function () {
  const WHATSAPP_NUMBER = "917517420170";
  const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

  function qs(sel, root = document) {
    return root.querySelector(sel);
  }
  function qsa(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  function safe(v) {
    const s = (v ?? "").toString().trim();
    return s;
  }

  function nowStamp() {
    // human-friendly, no timezone ambiguity for lead review
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  }

  function getPageLabel() {
    const title = safe(document.title);
    const path = safe(location.pathname);
    return title ? `${title} (${path})` : path || "Website";
  }

  function buildWaUrl(message) {
    const text = encodeURIComponent(message);
    return `${WHATSAPP_BASE}?text=${text}`;
  }

  function buildGenericMessage(options) {
    const module = safe(options?.module);
    const intent = safe(options?.intent) || "Get Started";
    const page = getPageLabel();

    const lines = [
      "Hello, I am interested in your AI-powered customer communication solutions.",
      "",
      `Intent: ${intent}`,
      module ? `Module: ${module}` : null,
      `Source: ${page}`,
      `Time: ${nowStamp()}`,
    ].filter(Boolean);

    return lines.join("\n");
  }

  function redirectToWhatsApp(message) {
    const url = buildWaUrl(message);
    // Use assign so user can navigate back if needed
    window.location.assign(url);
  }

  function initYear() {
    const y = qs("[data-year]");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function initMobileNav() {
    const topbar = qs(".topbar");
    const btn = qs("[data-menu-btn]");
    if (!topbar || !btn) return;
    btn.addEventListener("click", () => {
      topbar.classList.toggle("mobile-open");
      const expanded = topbar.classList.contains("mobile-open");
      btn.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  }

  function initReveal() {
    const els = qsa(".reveal");
    if (!els.length) return;
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("show");
              io.unobserve(e.target);
            }
          }
        },
        { threshold: 0.12 }
      );
      els.forEach((el) => io.observe(el));
      return;
    }
    // fallback
    els.forEach((el) => el.classList.add("show"));
  }

  function initWhatsAppCTAs() {
    qsa(".cta-whatsapp").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const module = safe(el.getAttribute("data-module"));
        const intent = safe(el.getAttribute("data-intent")) || safe(el.textContent) || "Get Started";
        redirectToWhatsApp(buildGenericMessage({ module, intent }));
      });
    });
  }

  function serializeModules(form) {
    const checked = qsa('input[name="modules"]:checked', form).map((i) => safe(i.value)).filter(Boolean);
    return checked.length ? checked.join(", ") : "";
  }

  function initLeadForm() {
    const form = qs("#lead-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = safe(qs('[name="name"]', form)?.value);
      const phone = safe(qs('[name="phone"]', form)?.value);
      const businessName = safe(qs('[name="businessName"]', form)?.value);
      const businessType = safe(qs('[name="businessType"]', form)?.value);
      const modules = serializeModules(form);
      const description = safe(qs('[name="description"]', form)?.value);
      const language = safe(qs('[name="language"]', form)?.value);

      // Minimal validation (HTML5 required handles most)
      if (!name || !phone || !businessName || !businessType || !language) return;

      const lines = [
        "Hello, I want to get started with your AI communication solutions.",
        "",
        "Lead details:",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Business name: ${businessName}`,
        `Business type: ${businessType}`,
        modules ? `Selected module(s): ${modules}` : "Selected module(s): Not selected",
        description ? `Product/Service: ${description}` : "Product/Service: Not provided",
        `Preferred language: ${language}`,
        "",
        `Source: ${getPageLabel()}`,
        `Time: ${nowStamp()}`,
      ];

      redirectToWhatsApp(lines.join("\n"));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initYear();
    initMobileNav();
    initReveal();
    initWhatsAppCTAs();
    initLeadForm();
  });
})();

