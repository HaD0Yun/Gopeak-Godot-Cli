import assert from 'node:assert/strict';
import test from 'node:test';
import { runRequestLoop } from './request-loop.js';

test('runRequestLoop returns INVALID_ARGS when request JSON is malformed', async () => {
  const response = await runRequestLoop('{"action":', async () => ({ data: { ok: true } }));

  assert.equal(response.success, false);
  if (response.success) {
    assert.fail('response should be failure');
  }

  assert.equal(response.error.code, 'INVALID_ARGS');
  assert.match(response.error.message, /^Invalid JSON request:/);
});
