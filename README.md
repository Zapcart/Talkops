# TalkOps (Static SaaS Website)

Premium, AI-themed SaaS website for an Indian startup providing:
- **AI Call-Receiving Sales Agent (Inbound Calls)** (primary)
- **Bulk WhatsApp & SMS Automation**
- **AI Script-Based Outbound Calling** (consent-based only)

## WhatsApp contact rule (implemented)

All primary CTAs and the lead form submission redirect to WhatsApp:
- **+91 7517420170**
- `https://wa.me/917517420170`

The **Get Started lead form** (`/get-started.html`) redirects with a **pre-filled WhatsApp message** containing all lead fields.

## Pages

- `index.html` (Home)
- `solutions/index.html`
- `solutions/ai-call-receiving-sales-agent.html`
- `solutions/bulk-whatsapp-sms-automation.html`
- `solutions/ai-outbound-calling.html`
- `pricing.html`
- `how-it-works.html`
- `industries.html`
- `get-started.html` (Lead form → WhatsApp prefill)
- `contact.html`
- `privacy-policy.html`
- `terms.html`
- `blog/index.html` (blog-ready)
- `blog/ai-call-answering-service-india.html` (sample SEO article)

## SEO deliverables

- Page-level **meta titles/descriptions**
- Keyword targeting included:
  - AI call answering service India
  - AI voice agent for business
  - WhatsApp automation for business
  - AI sales agent India
- **JSON-LD schema** (Organization/WebSite/Product/BlogPosting on relevant pages)
- `robots.txt`
- `sitemap.xml`

## Production domain

Production domain: **https://talkops.in**

- `robots.txt` → sitemap URL: `https://talkops.in/sitemap.xml`
- `sitemap.xml` → all URLs use `https://talkops.in`

## Run locally (recommended)

Because the site uses absolute paths like `/assets/...`, run a local web server from the project root.

### Option A: Python

```bash
python -m http.server 8080
```

Then open:
- `http://localhost:8080/`

### Option B: Windows Python launcher

```bash
py -m http.server 8080
```

## Branding

Brand name: **TalkOps**
Domain: **https://talkops.in**
