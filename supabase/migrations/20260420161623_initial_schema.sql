-- ============================================================
-- SmartWatt Portfolio — initial schema
-- Mirrors the structure of portfolio/content.json
-- ============================================================

-- ── site_meta (single-row config) ────────────────────────────
create table if not exists site_meta (
  id               smallint primary key default 1,
  name             text not null default '',
  short_name       text not null default '',
  location         text not null default '',
  timezone         text not null default '',
  available        boolean not null default false,
  copyright_year   text not null default '',
  updated_at       timestamptz not null default now(),
  constraint site_meta_one_row check (id = 1)
);

-- ── site_hero (single-row) ───────────────────────────────────
create table if not exists site_hero (
  id               smallint primary key default 1,
  index_number     text not null default '01',
  headline_line1   text not null default '',
  headline_line2   text not null default '',
  headline_line3   text not null default '',
  intro            text not null default '',
  currently        text not null default '',
  open_to          text not null default '',
  stack            text not null default '',
  updated_at       timestamptz not null default now(),
  constraint site_hero_one_row check (id = 1)
);

-- ── site_signal (single-row) ─────────────────────────────────
create table if not exists site_signal (
  id         smallint primary key default 1,
  caption    text not null default '',
  updated_at timestamptz not null default now(),
  constraint site_signal_one_row check (id = 1)
);

-- ── work_items ───────────────────────────────────────────────
create table if not exists work_items (
  id           uuid primary key default gen_random_uuid(),
  display_id   text not null default '',
  title        text not null default '',
  venue        text not null default '',
  year         text not null default '',
  kind         text not null default 'engineering'
                 check (kind in ('research', 'engineering')),
  link         text not null default '',
  thumbnail    text not null default '',
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── experience_items ─────────────────────────────────────────
create table if not exists experience_items (
  id           uuid primary key default gen_random_uuid(),
  period       text not null default '',
  role         text not null default '',
  org          text not null default '',
  description  text not null default '',
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── education_items ──────────────────────────────────────────
create table if not exists education_items (
  id           uuid primary key default gen_random_uuid(),
  year         text not null default '',
  school       text not null default '',
  description  text not null default '',
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── contact_meta (single-row) ────────────────────────────────
create table if not exists contact_meta (
  id         smallint primary key default 1,
  intro      text not null default '',
  updated_at timestamptz not null default now(),
  constraint contact_meta_one_row check (id = 1)
);

-- ── contact_methods ──────────────────────────────────────────
create table if not exists contact_methods (
  id         uuid primary key default gen_random_uuid(),
  label      text not null default '',
  value      text not null default '',
  href       text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── updated_at triggers ──────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_site_meta_updated_at
  before update on site_meta
  for each row execute function set_updated_at();

create trigger trg_site_hero_updated_at
  before update on site_hero
  for each row execute function set_updated_at();

create trigger trg_site_signal_updated_at
  before update on site_signal
  for each row execute function set_updated_at();

create trigger trg_work_items_updated_at
  before update on work_items
  for each row execute function set_updated_at();

create trigger trg_experience_items_updated_at
  before update on experience_items
  for each row execute function set_updated_at();

create trigger trg_education_items_updated_at
  before update on education_items
  for each row execute function set_updated_at();

create trigger trg_contact_meta_updated_at
  before update on contact_meta
  for each row execute function set_updated_at();

create trigger trg_contact_methods_updated_at
  before update on contact_methods
  for each row execute function set_updated_at();

-- ── Row Level Security ───────────────────────────────────────
-- Public site reads everything via anon key.
-- Writes require authentication (admin user).

alter table site_meta         enable row level security;
alter table site_hero         enable row level security;
alter table site_signal       enable row level security;
alter table work_items        enable row level security;
alter table experience_items  enable row level security;
alter table education_items   enable row level security;
alter table contact_meta      enable row level security;
alter table contact_methods   enable row level security;

-- SELECT: everyone (anon + authenticated)
create policy "public read site_meta"         on site_meta         for select using (true);
create policy "public read site_hero"         on site_hero         for select using (true);
create policy "public read site_signal"       on site_signal       for select using (true);
create policy "public read work_items"        on work_items        for select using (true);
create policy "public read experience_items"  on experience_items  for select using (true);
create policy "public read education_items"   on education_items   for select using (true);
create policy "public read contact_meta"      on contact_meta      for select using (true);
create policy "public read contact_methods"   on contact_methods   for select using (true);

-- INSERT / UPDATE / DELETE: authenticated users only
create policy "auth write site_meta"         on site_meta         for all using (auth.role() = 'authenticated');
create policy "auth write site_hero"         on site_hero         for all using (auth.role() = 'authenticated');
create policy "auth write site_signal"       on site_signal       for all using (auth.role() = 'authenticated');
create policy "auth write work_items"        on work_items        for all using (auth.role() = 'authenticated');
create policy "auth write experience_items"  on experience_items  for all using (auth.role() = 'authenticated');
create policy "auth write education_items"   on education_items   for all using (auth.role() = 'authenticated');
create policy "auth write contact_meta"      on contact_meta      for all using (auth.role() = 'authenticated');
create policy "auth write contact_methods"   on contact_methods   for all using (auth.role() = 'authenticated');

-- ── Seed data (from content.json) ────────────────────────────
insert into site_meta (id, name, short_name, location, timezone, available, copyright_year)
values (1,
  'Smart Wattanapornmongkol', 'SmartWatt',
  'Bangkok, TH', 'UTC+7', true, '2026')
on conflict (id) do nothing;

insert into site_hero (id, index_number, headline_line1, headline_line2, headline_line3,
                       intro, currently, open_to, stack)
values (1,
  '01',
  'Building [thoughtful]',
  'systems at the',
  '{research} & {product} seam.',
  'Engineering student at Chulalongkorn University. AI researcher at OpenThaiGPT Lab, backend lead at CU NEX. Interested in data-centric ML, infrastructure, and the boring work that makes systems actually ship.',
  'Drafting an Interspeech 2026 paper on data-centric synthetic-data scaling. Leading the CU NEX backend team alongside Kasikorn Business-Technology Group.',
  E'ML / backend internships · Summer 2027.\nResearch collaborations year-round.',
  E'Python · TypeScript · Rust\nPyTorch · FastAPI · Actix Web\nPostgreSQL · Docker · AWS / GCP')
on conflict (id) do nothing;

insert into site_signal (id, caption)
values (1, 'three things shipping right now ↓')
on conflict (id) do nothing;

insert into work_items (display_id, title, venue, year, kind, link, thumbnail, sort_order) values
  ('001', 'Audio-Conditioned Gain — synthetic data selection for low-resource ASR', 'Interspeech 2026 · in submission', '2026', 'research', '', '', 0),
  ('002', 'Direct matching between music & image for contextual analysis', 'IEEE ICCI 2024 · published', '2024', 'research', 'https://doi.org/10.1109/ICCI60780.2024.10532575', '', 1),
  ('003', 'CU NEX election & attendance platform', 'KBTG · backend lead', '2025', 'engineering', '', '', 2),
  ('004', 'Whisper fine-tuning · low-resource Thai ASR', 'OpenThaiGPT Lab', '2025', 'research', '', '', 3),
  ('005', 'Internal CI/CD & code-review pipeline', 'CU NEX · platform work', '2025', 'engineering', '', '', 4),
  ('006', 'Earlier projects · personal work archive', 'GitHub · open source', '2021—', 'engineering', 'https://github.com/smartwhatt', '', 5);

insert into experience_items (period, role, org, description, sort_order) values
  ('2025 — Now', 'Head of IT & Backend Lead', 'CU NEX Club · with Kasikorn Business-Technology Group',
   'Architecting an election-management platform and the CU NEX attendance feature, used by university stakeholders. Established CI/CD pipelines, automated tests, and code-review culture across the backend team.', 0),
  ('2025 — 2026', 'AI Researcher Intern · Speech & Multimodal', 'OpenThaiGPT Lab · iApp Technology · Super AI Engineer SS5',
   'Led a data-centric study on synthetic speech selection for Thai ASR. Proposed Audio-Conditioned Gain (ACG) — a normalized metric for sample utility. Manuscript in preparation for Interspeech 2026.', 1),
  ('2024 — 2028', 'B.Eng, Information & Communication Engineering', 'Chulalongkorn University · International School of Engineering',
   'CGPA 3.90 / 4.00 · expected October 2028.', 2),
  ('2024', 'Co-author · IEEE ICCI 2024', 'Direct matching between music and image for contextual relationship analysis',
   'doi:10.1109/ICCI60780.2024.10532575', 3);

insert into education_items (year, school, description, sort_order) values
  ('2024', 'Chulalongkorn University', 'B.Eng, Information & Communication Engineering · International School of Engineering · CGPA 3.90/4.00 · Expected Oct 2028', 0),
  ('2021', 'Suankularb Wittayalai School', 'Senior High · Eplus+ Program', 1),
  ('2017', 'Suankularb Wittayalai School', 'Junior High · Eplus+ Program', 2),
  ('2011', 'Attaphiwat School', 'Kindergarten Y3 — Primary School', 3),
  ('2009', 'Sunflower Trilingual School', 'Kindergarten Y1—Y2', 4);

insert into contact_meta (id, intro)
values (1, 'Reach out about research collaborations, internships, freelance backend work, or anything you found here interesting. I read every message.')
on conflict (id) do nothing;

insert into contact_methods (label, value, href, sort_order) values
  ('Email',    'smartwattana@gmail.com',      'mailto:smartwattana@gmail.com',          0),
  ('LinkedIn', 'linkedin.com/in/smartwatt',   'https://www.linkedin.com/in/smartwatt/', 1),
  ('GitHub',   'github.com/smartwhatt',       'https://github.com/smartwhatt',          2),
  ('Location', 'Bangkok, Thailand · UTC+7',   '',                                       3);
