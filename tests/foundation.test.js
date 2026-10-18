import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../src/main.jsx', import.meta.url), 'utf8');

test('six cybersecurity centers are present in navigation', () => {
  for (const label of [
    'Offensive Security Lab',
    'Defensive Security Center',
    'Compliance & Risk',
    'Cloud & Infrastructure',
    'Identity & Access',
    'Digital Forensics & IR'
  ]) {
    assert.ok(source.includes(label), 'Missing center: ' + label);
  }
});

test('dangerous live integrations are not represented as active', () => {
  assert.ok(source.includes('No scanner or external test runner is configured'));
  assert.ok(source.includes('no cloud account is connected or scanned'));
  assert.ok(source.includes('Backend required'));
});

test('core prototype workflows and clear limitation states exist', () => {
  for (const text of [
    "active === 'blocking'",
    "active === 'assessments'",
    "active === 'logs'",
    "active === 'incidents'",
    "active === 'settings'",
    'Simulation only',
    'Not implemented'
  ]) assert.ok(source.includes(text), 'Missing workflow/status: ' + text);
});