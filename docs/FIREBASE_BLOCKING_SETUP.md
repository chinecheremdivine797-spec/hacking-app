# CYBERRECOVER AI — Firebase and blocking policies

## Firebase setup
1. Create a Firebase project and register a web app.
2. Enable Authentication → Email/Password.
3. Create a Cloud Firestore database.
4. Configure the Vite environment variables from `.env.example` in local development and deployment.
5. Publish `firestore.rules` using the Firebase console or Firebase CLI.
6. Run CI tests and test with two accounts: account A must not read, add, or delete account B's rules.

Firebase web configuration is not a substitute for access control. Firestore Security Rules enforce user isolation. Never put Firebase Admin SDK service-account JSON or private keys in frontend code.

## What blocking does now
- Stores website/app policy requests in the signed-in user's Firestore subcollection when Firebase is configured.
- Otherwise displays sample policies as simulation data only.
- Marks saved requests as **Pending device integration**. It does not block traffic or disable applications.

## What is still required for real enforcement
- Android: a separate native Android implementation using a user-consented, supported VPN/DNS filtering or managed-device approach, plus lifecycle, permission, and device tests.
- Windows/macOS/Linux: a supported endpoint agent, managed DNS, or router/network integration; browser code cannot reliably block all apps or traffic.
- iOS/iPadOS: platform-specific Network Extension or managed-device capability with required entitlements and user/admin consent.
- A secure policy service/agent protocol, device enrollment, signed policy delivery, audit logs, rollback, and explicit owner/admin authorization.
- Integration tests against a real Firebase project and tests on actual devices.

Do not describe a policy as active until an enforcement agent confirms it has applied the policy. This change is not a live firewall or device blocker.
