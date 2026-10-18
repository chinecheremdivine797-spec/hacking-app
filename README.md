# CYBERRECOVER AI

A responsive defensive cybersecurity workspace prototype for web browsers on laptops, tablets, and phones.

## Current features

- Responsive dashboard and setup/release status
- Firebase Authentication foundation (requires project configuration)
- Firestore-backed website/app policy-request storage scoped to the signed-in user's account (requires deployed rules)
- Code Lab example for defensive input validation
- Safe simulated firewall/log training exercises
- Authorized assessment record workflow (no live scanning)
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

## Important security notice

**Current status: Development and testing only. Do not enter real client investigation data.**

Authentication code and a Firebase integration foundation are present, but the complete workspace data model has not been migrated to and verified in Firebase. The live project's configuration, deployed Firestore rules, cross-user isolation, and production security have not been verified here. Automated CI passing confirms the configured tests and build only; it does not prove production security.

Use fictional test data only. Do not enter client investigation records, passwords, secrets, sensitive evidence, or confidential personal information until security testing is complete.

Before production use:

1. Create and configure a Firebase project; enable Email/Password Authentication and configure account recovery and verification.
2. Create Cloud Firestore and deploy `firestore.rules`.
3. Test with at least two separate accounts and verify that one account cannot read, create, modify, or delete the other account's records. Add Firebase Emulator or equivalent integration tests.
4. Review authentication, authorization, validation, error handling, audit logging, backups and restore, privacy, and deployment configuration.
5. Run security tests and verify the deployed configuration before entering real data.

Firebase web configuration is not a substitute for security rules. Never put Firebase Admin SDK service-account credentials in browser code.

## Website and app blocking limitation

The website/app policy screen stores policy requests when Firebase is configured. A saved policy is **not an active block** and does not stop a website or disable an app on any device. Actual enforcement needs a separately implemented, consent-based integration for each supported platform (for example, managed DNS/router controls, an Android VPN/DNS filtering service, or platform-approved device-management APIs). Device enrollment, policy delivery, audit, rollback, and real-device tests are not implemented or verified yet.

The responsive dashboard can be opened from laptops, tablets, and phones. That does not mean a policy automatically enforces across those devices.

## Other limitations

There is no live firewall scanner, external network scanning, connected AI provider, threat-intelligence API, or backup service. The assessment form records a declaration only; it does not verify authorization or scan a target. The log analyzer performs simple local keyword matching. Android packaging and APK signing are not configured.

## Defensive-use boundary

Use assessments only for systems you own or have explicit written permission to test. No exploit automation, credential theft, stealth, persistence, or denial-of-service features are included.
