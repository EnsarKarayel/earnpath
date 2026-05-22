# Supabase Kurulumu

## İlk Migration

`migrations/202605220001_initial_schema.sql` dosyası ilk üretim şemasını oluşturur.

Supabase Dashboard üzerinden:

1. SQL Editor aç.
2. Migration dosyasındaki SQL'i çalıştır.
3. Table Editor'da tabloları kontrol et.
4. Authentication > Providers içinde email login'i aktif et.
5. Storage içinde `documents` adlı private bucket oluştur.

## RLS

Şemada kullanıcıya ait veriler için Row Level Security açıktır:

- `profiles`
- `user_plans`
- `plan_tasks`
- `applications`
- `orders`

Public okunabilir tablolar:

- aktif diller
- aktif gelir rotaları
- beceri etiketleri
- kurs ve iş kaynakları
- aktif ürünler

## Dikkat

Service role key sadece backend ortamında kullanılmalı. Mobil uygulama ve tarayıcı tarafında sadece anon key kullanılır.

