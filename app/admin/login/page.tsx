import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <section className="carto-dark flex min-h-[100vh] items-center justify-center bg-navy-deepest px-6 py-16 text-bg-light">
      <div className="w-full max-w-[400px] rounded-[4px] border border-bg-light/16 bg-navy-panel/85 p-8">
        <p className="eyebrow m-0 mb-2 text-accent-light">SPATIAL ALPHABET — ADMIN</p>
        <h1 className="display m-0 mb-6 text-[24px] font-semibold">Sign in to the panel.</h1>
        {error === "1" && (
          <p role="alert" className="m-0 mb-4 rounded-[3px] border border-gold/50 px-3 py-2 text-[13.5px] text-gold">
            Incorrect password. Try again.
          </p>
        )}
        {error === "env" && (
          <p role="alert" className="m-0 mb-4 rounded-[3px] border border-gold/50 px-3 py-2 text-[13.5px] text-gold">
            ADMIN_PASSWORD / AUTH_SECRET are not configured in .env.local.
          </p>
        )}
        <form method="post" action="/api/admin/login" className="flex flex-col gap-4">
          <label htmlFor="admin-password" className="field-label text-bg-light/65">
            PASSWORD
            <input
              id="admin-password"
              type="password"
              name="password"
              required
              autoFocus
              autoComplete="current-password"
              className="field-dark"
            />
          </label>
          <button type="submit" className="btn-solid border-0 font-[family-name:var(--font-plex-sans)]">
            Sign in →
          </button>
        </form>
      </div>
    </section>
  );
}
