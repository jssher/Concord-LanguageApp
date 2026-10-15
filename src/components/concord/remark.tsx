import { useState, type FormEvent } from "react";
import { GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { postComment, type CommentKind, type CommentTarget } from "@/lib/comments/api";

export type RemarkScope = {
  kind: CommentTarget;
  id: string;
  label: string;
  level: string;
  bucket: string;
  name: string;
};

/** A closed "Comment" control. The form stays shut until someone asks for it. */
export function Remark({ lang, scopes }: { lang: string; scopes: RemarkScope[] }) {
  const session = useCurrentUserState();
  const [open, setOpen] = useState(false);
  const [scopeId, setScopeId] = useState(scopes[0]?.id ?? "");
  const [mode, setMode] = useState<CommentKind>("comment");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const scope = scopes.find((item) => item.id === scopeId) ?? scopes[0];
  if (!lang || !scope) return null;

  function send(event: FormEvent) {
    event.preventDefault();
    const body = text.trim();
    if (body.length < 4 || busy) return;
    setBusy(true);
    setNote("");
    void postComment({
      data: {
        lang,
        targetKind: scope.kind,
        targetId: scope.id,
        label: scope.label.slice(0, 140),
        level: scope.level,
        bucket: scope.bucket,
        kind: mode,
        body,
      },
    })
      .then((result) => {
        if (!result.ok) {
          setNote(result.error);
          return;
        }
        setText("");
        setOpen(false);
        setNote("Saved. It is listed under Comments.");
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "";
        setNote(message.includes("Unauthorized") ? "Sign in to comment." : message || "That did not save.");
      })
      .finally(() => setBusy(false));
  }

  return (
    <div className="mt-2">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => {
          setOpen((value) => !value);
          setNote("");
        }}
        className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm"
      >
        Comment
      </button>
      {note && !open ? <p className="mt-1 text-sm text-muted">{note}</p> : null}
      {open ? (
        session.user ? (
          <form onSubmit={send} className="mt-2 flex flex-col gap-2">
            {scopes.length > 1 ? (
              <div className="flex flex-wrap gap-2">
                {scopes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setScopeId(item.id)}
                    className={`min-h-11 rounded-full px-3 text-sm ${item.id === scope.id ? "bg-ink text-paper" : "bg-chip"}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setMode("comment")}
                className={`min-h-11 rounded-full px-3 text-sm ${mode === "comment" ? "bg-ink text-paper" : "bg-chip"}`}
              >
                Note
              </button>
              <button
                type="button"
                onClick={() => setMode("mistake")}
                className={`min-h-11 rounded-full px-3 text-sm ${mode === "mistake" ? "bg-accent text-accent-ink" : "bg-chip"}`}
              >
                Mistake
              </button>
            </div>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              maxLength={500}
              rows={2}
              aria-label={mode === "mistake" ? "Describe the mistake" : "Comment"}
              placeholder={mode === "mistake" ? "What is wrong on this one?" : "A note for other learners."}
              className="w-full resize-y rounded-2xl border border-line bg-card px-3 py-2 text-sm outline-none"
            />
            <p className="text-xs text-muted">Posted with your League handle.</p>
            {note ? <p className="text-sm text-accent">{note}</p> : null}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={busy || text.trim().length < 4}
                className="inline-flex min-h-11 items-center rounded-full bg-accent px-4 text-sm text-accent-ink disabled:opacity-40"
              >
                Post
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-2 flex flex-wrap gap-2">
            {GROK_PROVIDERS.map((provider) => (
              <button
                key={provider.providerId}
                type="button"
                onClick={() => signIn(provider.providerId, { callbackURL: window.location.pathname })}
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-4 text-sm"
              >
                Sign in to comment
              </button>
            ))}
          </div>
        )
      ) : null}
    </div>
  );
}
