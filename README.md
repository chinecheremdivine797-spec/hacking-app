# CYBERRECOVER AI

A mobile-responsive defensive cybersecurity workspace prototype. This repository is an alternative to the failed Base44 build and is intended as a clean, testable starting point.

## Current features
- Responsive dashboard with overview and setup/release status
- Code Lab example for defensive input validation
- Safe simulated firewall/log training exercises
- Authorized assessment record workflow (no live scanning)
- Website blocklist management in browser session (simulation only)
- Local log keyword review
- Incident response guidance
- AI/threat-intelligence integration status placeholders
- Compliance/risk checklist
- JSON export of current session data

## Run locally
Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Build production assets:

```bash
npm run build
npm run preview
```

## Important security limitations
This is a **frontend prototype**, not a production security product. It currently has no server-side authentication, role enforcement, tenant isolation, persistent database, live firewall scanner, network blocking integration, AI provider, threat-intelligence API, or backup service. Browser-session state is temporary. Never place real client secrets or sensitive evidence in this prototype.

The blocklist does not block sites or apps on the device. Real enforcement requires a supported DNS/VPN/router or Android device-management integration. The assessment form records a declaration only; it does not verify authorization or scan any target. The log analyzer performs simple local keyword matching.

Before production use, add a secure backend and automated tests, enforce permissions server-side, configure secrets securely, conduct security testing, and validate backup/restore. Android packaging and APK signing are not yet configured.

## Defensive-use boundary
Use assessments only for systems you own or have explicit written permission to test. No exploit automation, credential theft, stealth, persistence, or denial-of-service features are included.
