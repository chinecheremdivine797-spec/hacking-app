import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = path => readFile(new URL(path, import.meta.url), 'utf8');

test('Supabase client requires both public environment variables', async () => {
  const source = await read('../src/lib/supabase.js');
  assert.match(source, /VITE_SUPABASE_URL/);
  assert.match(source, /VITE_SUPABASE_ANON_KEY/);
  assert.match(source, /Boolean\(url && anonKey\)/);
  assert.match(source, /: null/);
  assert.doesNotMatch(source, /service_role/i);
});

test('workspace has an authentication gate and sign-out action', async () => {
  const source = await read('../src/main.jsx');
  assert.match(source, /function AuthGate\(\)/);
  assert.match(source, /signInWithPassword/);
  assert.match(source, /signUp/);
  assert.match(source, /signOut/);
  assert.match(source, /if \(!supabaseConfigured\)/);
  assert.match(source, /<AuthGate \/>/);
});

test('database schema enforces owner-level RLS on sensitive tables', async () => {
  const sql = await read('../supabase/schema.sql');
  assert.match(sql, /alter table public\.profiles enable row level security/i);
  assert.match(sql, /alter table public\.case_records enable row level security/i);
  for (const operation of ['select', 'insert', 'update', 'delete']) {
    assert.match(sql, new RegExp('cases_' + operation + '_own'));
  }
  assert.match(sql, /owner_id = \(select auth\.uid\(\)\)/);
  assert.match(sql, /with check \(owner_id = \(select auth\.uid\(\)\)\)/);
  assert.match(sql, /references auth\.users\(id\) on delete cascade/i);
  assert.doesNotMatch(sql, /using \(true\)/i);
});

test('setup documentation warns against frontend service-role secrets', async () => {
  const docs = await read('../docs/SUPABASE_SETUP.md');
  assert.match(docs, /service-role key/i);
  assert.match(docs, /two separate test users/i);
  assert.match(docs, /does not yet implement shared organizations/i);
});
