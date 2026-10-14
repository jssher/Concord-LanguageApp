import { createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Shell } from "@/components/concord/shell";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <Shell>
      <main className="mx-auto flex w-full max-w-sm flex-col gap-4 px-4 py-16">
        <p className="text-xs font-semibold tracking-widest text-accent uppercase">Concord</p>
        <h1 className="text-4xl">Sign in</h1>
        <p className="text-muted">Your name, score, and league stay with the account you sign in with.</p>
        {authEnabled ? (
          GROK_PROVIDERS.map((provider) => (
            <button
              key={provider.providerId}
              type="button"
              onClick={() => signIn(provider.providerId, { callbackURL: "/league" })}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-card px-4 text-sm"
            >
              Continue with {provider.label}
            </button>
          ))
        ) : (
          <p className="text-sm text-muted">Sign-in is turned off.</p>
        )}
      </main>
    </Shell>
  );
}
