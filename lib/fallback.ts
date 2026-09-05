/**
 * Runs a database read for a public page. If it throws (database unreachable,
 * env var missing on the host, cold-start timeout), the error is logged and the
 * seed-based fallback is rendered instead, so visitors never see a crash page.
 * The admin panel still surfaces the real error; /api/health reports it too.
 */
export async function withSeedFallback<T>(label: string, read: () => Promise<T>, seed: () => T): Promise<T> {
  try {
    return await read();
  } catch (e) {
    console.error(`[${label}] database unavailable, rendering seed content:`, e);
    return seed();
  }
}
