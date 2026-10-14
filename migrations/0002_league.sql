-- Public learner names, scores, and connections.
-- Score counts words learned and words remembered again.
-- Leagues are derived from score, so this table does not store a league id.

create table if not exists learners (
  user_id text primary key,
  name text not null check (char_length(name) between 2 and 40),
  handle text not null unique check (handle ~ '^[a-z][a-z-]{1,22}[a-z]$'),
  score integer not null default 0,
  learned integer not null default 0,
  held integer not null default 0,
  firm integer not null default 0,
  streak integer not null default 0,
  last_day date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists learner_cards (
  user_id text not null references learners (user_id) on delete cascade,
  lang text not null,
  concept text not null,
  stage integer not null default 0,
  passes integer not null default 0,
  lapses integer not null default 0,
  last_mark text not null check (last_mark in ('r', 'w')),
  last_at timestamptz not null default now(),
  last_point_day date,
  primary key (user_id, lang, concept)
);

create table if not exists learner_days (
  user_id text not null references learners (user_id) on delete cascade,
  day date not null,
  learned integer not null default 0,
  remembered integer not null default 0,
  missed integer not null default 0,
  points integer not null default 0,
  primary key (user_id, day)
);

create table if not exists connections (
  follower_id text not null references learners (user_id) on delete cascade,
  followee_id text not null references learners (user_id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, followee_id),
  check (follower_id <> followee_id)
);

create index if not exists learner_cards_user_idx on learner_cards (user_id);
create index if not exists learner_days_user_day_idx on learner_days (user_id, day);
create index if not exists connections_followee_idx on connections (followee_id);
