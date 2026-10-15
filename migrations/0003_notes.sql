-- Shared notes about how to improve the app.
-- Anyone signed in may write. Votes and replies are tied to that account.
-- Grok's reading of each note, and the ranked brief, are stored so they are not regenerated on every visit.

create table if not exists notes (
  id serial primary key,
  user_id text not null,
  author_name text not null,
  body text not null check (char_length(body) between 8 and 800),
  kind text check (kind is null or kind in ('thanks', 'points')),
  grok_reply text,
  points text,
  tries smallint not null default 0,
  summarized_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists note_replies (
  id serial primary key,
  note_id integer not null references notes (id) on delete cascade,
  user_id text not null,
  author_name text not null,
  body text not null check (char_length(body) between 2 and 500),
  created_at timestamptz not null default now()
);

create table if not exists note_votes (
  user_id text not null,
  note_id integer not null references notes (id) on delete cascade,
  vote smallint not null check (vote in (-1, 1)),
  primary key (user_id, note_id)
);

create table if not exists note_briefs (
  id smallint primary key default 1 check (id = 1),
  body text not null,
  through_note_id integer not null,
  created_at timestamptz not null default now()
);

create index if not exists notes_created_idx on notes (created_at desc);
create index if not exists notes_user_created_idx on notes (user_id, created_at desc);
create index if not exists note_replies_note_idx on note_replies (note_id, created_at);
create index if not exists note_votes_note_idx on note_votes (note_id);
