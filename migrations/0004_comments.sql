-- Notes and mistake reports left on a flashcard or a course section.
-- The handle is copied at the time of writing. The board prefers the current
-- league handle when the account still has one.

create table if not exists card_comments (
  id serial primary key,
  user_id text not null,
  handle text not null,
  lang text not null check (char_length(lang) between 2 and 16),
  target_kind text not null check (target_kind in ('card', 'section')),
  target_id text not null check (char_length(target_id) between 1 and 80),
  label text not null check (char_length(label) between 1 and 140),
  level text not null default '',
  bucket text not null default '',
  kind text not null check (kind in ('comment', 'mistake')),
  body text not null check (char_length(body) between 4 and 500),
  created_at timestamptz not null default now()
);

create index if not exists card_comments_target_idx
  on card_comments (lang, target_kind, target_id, created_at);
create index if not exists card_comments_user_idx
  on card_comments (user_id, created_at desc);
