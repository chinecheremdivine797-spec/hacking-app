import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = path => readFile(new URL(path, import.meta.url), 'utf8');

test('Firebase client is disabled until required public config is supplied', async () => {
  const source = await read('../src/lib/firebase.js');
  assert.match(source, /VITE_FIREBASE_API_KEY/);
  assert.match(source, /VITE_FIREBASE_AUTH_DOMAIN/);
  assert.match(source, /VITE_FIREBASE_PROJECT_ID/);
  assert.match(source, /VITE_FIREBASE_APP_ID/);
  assert.match(source, /firebaseConfigured = Boolean/);
  assert.doesNotMatch(source, /service.account|private_key/i);
});

test('Firestore rules restrict each user to their own blocking policy collection', async () => {
  const rules = await read('../firestore.rules');
  assert.match(rules, /request\.auth\.uid == userId/);
  assert.match(rules, /match \/users\/\{userId\}\/blockingRules\/\{ruleId\}/);
  assert.match(rules, /allow read, delete: if ownsDocument\(userId\)/);
  assert.match(rules, /allow create: if ownsDocument\(userId\)/);
  assert.match(rules, /allow update: if ownsDocument\(userId\)/);
  assert.match(rules, /allow read, write: if false/);
  assert.match(rules, /Pending device integration/);
});

test('docs clearly distinguish saved policies from actual device enforcement', async () => {
  const docs = await read('../docs/FIREBASE_BLOCKING_SETUP.md');
  assert.match(docs, /does not block traffic or disable applications/i);
  assert.match(docs, /actual devices/i);
  assert.match(docs, /Pending device integration/);
  assert.match(docs, /two accounts/i);
});
