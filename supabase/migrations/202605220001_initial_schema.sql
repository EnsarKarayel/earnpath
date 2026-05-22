create extension if not exists "pgcrypto";

create type public.plan_status as enum ('draft', 'active', 'completed', 'paused');
create type public.application_status as enum ('saved', 'applied', 'interview', 'offer', 'rejected', 'closed');
create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'canceled', 'none');

create table public.supported_locales (
  code text primary key,
  native_name text not null,
  english_name text not null,
  direction text not null default 'ltr' check (direction in ('ltr', 'rtl')),
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  locale text not null default 'tr' references public.supported_locales(code),
  display_name text,
  city text,
  country text,
  education_level text,
  device_access text,
  daily_time_budget text,
  work_mode text,
  income_urgency text,
  languages text[] not null default '{}',
  skills text[] not null default '{}',
  constraints text,
  onboarding_completed boolean not null default false,
  subscription_status public.subscription_status not null default 'none',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.skill_tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null,
  created_at timestamptz not null default now()
);

create table public.skill_tag_translations (
  skill_tag_id uuid not null references public.skill_tags(id) on delete cascade,
  locale text not null references public.supported_locales(code),
  name text not null,
  description text,
  primary key (skill_tag_id, locale)
);

create table public.career_routes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  base_score integer not null default 50,
  income_window_min_days integer not null,
  income_window_max_days integer not null,
  prep_level text not null check (prep_level in ('low', 'medium', 'high')),
  work_modes text[] not null default '{}',
  device_requirements text[] not null default '{}',
  education_levels text[] not null default '{}',
  skill_slugs text[] not null default '{}',
  language_hints text[] not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.career_route_translations (
  career_route_id uuid not null references public.career_routes(id) on delete cascade,
  locale text not null references public.supported_locales(code),
  name text not null,
  short_description text not null,
  facts text[] not null default '{}',
  gaps text[] not null default '{}',
  job_titles text[] not null default '{}',
  primary key (career_route_id, locale)
);

create table public.user_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_snapshot jsonb not null,
  best_route_id uuid references public.career_routes(id),
  route_scores jsonb not null default '[]'::jsonb,
  timeline jsonb not null default '[]'::jsonb,
  application_message text,
  cv_summary text,
  status public.plan_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.plan_tasks (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.user_plans(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  day_number integer not null check (day_number between 1 and 90),
  title text not null,
  body text,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.job_sources (
  id uuid primary key default gen_random_uuid(),
  country text,
  city text,
  name text not null,
  url text,
  source_type text not null default 'job_board',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.course_providers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text,
  country text,
  free_available boolean not null default true,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid references public.user_plans(id) on delete set null,
  company_name text,
  role_title text not null,
  source text,
  status public.application_status not null default 'saved',
  notes text,
  applied_at timestamptz,
  follow_up_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  price_cents integer not null,
  currency text not null default 'TRY',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id),
  provider text not null,
  provider_checkout_id text,
  status text not null default 'pending',
  amount_cents integer not null,
  currency text not null,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  event_name text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger career_routes_set_updated_at
before update on public.career_routes
for each row execute function public.set_updated_at();

create trigger user_plans_set_updated_at
before update on public.user_plans
for each row execute function public.set_updated_at();

create trigger applications_set_updated_at
before update on public.applications
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.user_plans enable row level security;
alter table public.plan_tasks enable row level security;
alter table public.applications enable row level security;
alter table public.orders enable row level security;
alter table public.audit_events enable row level security;

alter table public.supported_locales enable row level security;
alter table public.skill_tags enable row level security;
alter table public.skill_tag_translations enable row level security;
alter table public.career_routes enable row level security;
alter table public.career_route_translations enable row level security;
alter table public.job_sources enable row level security;
alter table public.course_providers enable row level security;
alter table public.products enable row level security;

create policy "Public can read enabled locales"
on public.supported_locales for select
using (enabled = true);

create policy "Public can read public route data"
on public.career_routes for select
using (active = true);

create policy "Public can read route translations"
on public.career_route_translations for select
using (true);

create policy "Public can read skill tags"
on public.skill_tags for select
using (true);

create policy "Public can read skill translations"
on public.skill_tag_translations for select
using (true);

create policy "Public can read active job sources"
on public.job_sources for select
using (active = true);

create policy "Public can read active course providers"
on public.course_providers for select
using (active = true);

create policy "Public can read active products"
on public.products for select
using (active = true);

create policy "Users can read own profile"
on public.profiles for select
using ((select auth.uid()) = id);

create policy "Users can insert own profile"
on public.profiles for insert
with check ((select auth.uid()) = id);

create policy "Users can update own profile"
on public.profiles for update
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "Users can manage own plans"
on public.user_plans for all
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can manage own plan tasks"
on public.plan_tasks for all
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can manage own applications"
on public.applications for all
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can read own orders"
on public.orders for select
using ((select auth.uid()) = user_id);

insert into public.supported_locales (code, native_name, english_name, direction) values
  ('tr', 'Türkçe', 'Turkish', 'ltr'),
  ('en', 'English', 'English', 'ltr'),
  ('ar', 'العربية', 'Arabic', 'rtl'),
  ('de', 'Deutsch', 'German', 'ltr'),
  ('es', 'Español', 'Spanish', 'ltr'),
  ('fr', 'Français', 'French', 'ltr'),
  ('ru', 'Русский', 'Russian', 'ltr'),
  ('pt', 'Português', 'Portuguese', 'ltr'),
  ('hi', 'हिन्दी', 'Hindi', 'ltr');

insert into public.skill_tags (slug, category) values
  ('communication', 'soft'),
  ('computer', 'digital'),
  ('sales', 'business'),
  ('field', 'field'),
  ('design', 'creative'),
  ('repair', 'technical'),
  ('care', 'service'),
  ('food', 'service');

insert into public.products (slug, name, price_cents, currency) values
  ('free-analysis', 'Ücretsiz analiz', 0, 'TRY'),
  ('cv-application-pack', 'CV + başvuru paketi', 39900, 'TRY'),
  ('thirty-day-followup', '30 gün takip paketi', 99900, 'TRY');

insert into public.career_routes (
  slug,
  base_score,
  income_window_min_days,
  income_window_max_days,
  prep_level,
  work_modes,
  device_requirements,
  education_levels,
  skill_slugs,
  language_hints
) values
  ('customer-support', 72, 7, 21, 'medium', array['remote','hybrid','any'], array['computer','both','phone'], array['highschool','student','degree'], array['communication','computer'], array['en','ar','de','ru']),
  ('ecommerce-ops', 70, 14, 30, 'medium', array['hybrid','onsite','remote','any'], array['computer','both'], array['highschool','student','degree'], array['computer','sales'], array['en']),
  ('field-sales', 68, 3, 14, 'low', array['onsite','any'], array['phone','both','computer'], array['none','middle','highschool','student','degree'], array['communication','sales','field'], array['ar','ru']),
  ('micro-logistics', 66, 1, 10, 'low', array['onsite','any'], array['phone','both'], array['none','middle','highschool','student','degree'], array['field'], array[]::text[]),
  ('office-assistant', 62, 21, 45, 'high', array['onsite','hybrid','any'], array['computer','both'], array['highschool','student','degree'], array['computer','communication'], array['en']),
  ('content-ops', 60, 14, 45, 'medium', array['remote','hybrid','any'], array['computer','both','phone'], array['highschool','student','degree'], array['design','computer','sales'], array['en']),
  ('repair-apprentice', 58, 21, 60, 'medium', array['onsite','any'], array['phone','both','computer'], array['none','middle','highschool','student','degree'], array['repair','field'], array[]::text[]),
  ('care-support', 56, 3, 14, 'low', array['onsite','any'], array['phone','both'], array['none','middle','highschool','student','degree'], array['care','communication'], array['ar','ru']),
  ('food-service', 55, 3, 14, 'low', array['onsite','any'], array['phone','both'], array['none','middle','highschool','student','degree'], array['food','communication','field'], array['en','ar','ru']);

insert into public.career_route_translations (
  career_route_id,
  locale,
  name,
  short_description,
  facts,
  gaps,
  job_titles
)
select id, 'tr', 'Müşteri destek temsilcisi', 'Telefon, chat veya WhatsApp üzerinden müşteri taleplerini yönetme.', array['Chat desteği','Vardiya olabilir','CV etkili'], array['Temel CRM kullanımı','Net yazışma dili','Şikayet karşılama'], array['Çağrı merkezi','E-ticaret destek','Turizm danışma']
from public.career_routes where slug = 'customer-support'
union all
select id, 'tr', 'E-ticaret operasyon asistanı', 'Ürün girişi, sipariş takibi, Excel ve pazar yeri panel işleri.', array['Excel','Pazar yeri','Ofis/hibrit'], array['Excel filtre ve tablo','Ürün açıklaması','Sipariş takip disiplini'], array['Pazar yeri asistanı','Ürün giriş elemanı','Operasyon destek']
from public.career_routes where slug = 'ecommerce-ops'
union all
select id, 'tr', 'Saha satış ve marka temsilcisi', 'Mağaza, stant veya saha ziyaretleriyle hızlı primli gelir.', array['Prim','Saha','Hızlı başlangıç'], array['Kısa satış konuşması','Günlük hedef takibi','Temel ürün anlatımı'], array['Marka temsilcisi','Stant görevlisi','Saha satış']
from public.career_routes where slug = 'field-sales'
union all
select id, 'tr', 'Mikro lojistik ve kurye', 'Paket, market veya yerel teslimat işlerinde hızlı gelir.', array['Hızlı nakit','Saha','Esnek saat'], array['Rota takibi','Müşteri iletişimi','Günlük masraf hesabı'], array['Paket teslimat','Market hazırlama','Depo destek']
from public.career_routes where slug = 'micro-logistics'
union all
select id, 'tr', 'Ön muhasebe ve ofis asistanı', 'Fatura, evrak, randevu ve temel tablo takibi.', array['Excel','Evrak','Düzen'], array['Excel formülleri','E-fatura mantığı','Takvim yönetimi'], array['Ofis asistanı','Ön muhasebe destek','Sekreterya']
from public.career_routes where slug = 'office-assistant'
union all
select id, 'tr', 'Sosyal medya içerik operatörü', 'Kısa içerik, ürün görseli, metin ve paylaşım takvimi.', array['Portfolyo','Kısa video','Freelance'], array['Canva düzeni','Kısa metin yazımı','Örnek portfolyo'], array['İçerik asistanı','Sosyal medya destek','Ürün metni yazarı']
from public.career_routes where slug = 'content-ops'
union all
select id, 'tr', 'Teknik servis çıraklığı', 'Telefon, bilgisayar, beyaz eşya veya elektrik destek işi.', array['Usta yanında','Saha','Uzun vadeli'], array['Güvenlik kuralları','Parça tanıma','Servis notu tutma'], array['Servis çırağı','Teknik destek','Montaj yardımcısı']
from public.career_routes where slug = 'repair-apprentice'
union all
select id, 'tr', 'Bakım ve refakat desteği', 'Yaşlı, çocuk, hasta refakati veya günlük ev destek işleri.', array['Güven','Referans','Yerel'], array['Referans metni','Saatlik ücret hesabı','Güvenli ilan seçimi'], array['Refakatçi','Ev destek','Çocuk bakım yardımcısı']
from public.career_routes where slug = 'care-support'
union all
select id, 'tr', 'Kafe ve hızlı servis ekibi', 'Servis, kasa, paket hazırlama ve vardiyalı işletme işleri.', array['Vardiya','Bahşiş olabilir','Hızlı başlangıç'], array['Hijyen kuralları','Kasa iletişimi','Yoğun saat temposu'], array['Barista yardımcısı','Servis elemanı','Paket hazırlama']
from public.career_routes where slug = 'food-service';
