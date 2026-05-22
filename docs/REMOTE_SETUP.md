# Uzaktan Erişim ve Yayın Kurulumu

Bu ürün bu bilgisayara bağlı kalmamalı. Kod GitHub'da, veritabanı Supabase'de, web Vercel'de, mobil uygulama Expo/EAS tarafında durmalı.

## 1. GitHub

1. GitHub'da `earnpath` adlı private repo aç.
2. Bu klasörü repo olarak push et.
3. Ana branch `main` olsun.
4. GitHub üzerinden dosyaları her yerden okuyabilir ve düzenleyebilirsin.

## 2. Supabase

1. Supabase'de yeni proje aç.
2. Bölge olarak hedef pazara yakın bir region seç. İlk pazar Türkiye ise Europe mantıklı.
3. `supabase/migrations/202605220001_initial_schema.sql` dosyasındaki SQL'i migration olarak uygula.
4. Auth email login'i aç.
5. Storage için `documents` bucket'ı oluştur.
6. `NEXT_PUBLIC_SUPABASE_URL` ve anon key değerlerini `.env` dosyalarına ekle.

## 3. Vercel

1. GitHub repo'yu Vercel'e bağla.
2. Root olarak `apps/web` seç.
3. Environment variables içine Supabase public URL ve anon key ekle.
4. Production domain bağla.

## 4. Expo

1. Expo hesabı aç.
2. `apps/mobile` altında EAS build ayarla.
3. iOS için Apple Developer hesabı gerekir.
4. Android için Google Play Console hesabı gerekir.

## 5. Mobil Mağaza Hesapları

- Apple Developer hesabı yıllık ücretlidir.
- Google Play Console tek seferlik kayıt ücreti ister.
- İlk aşamada Expo Go ile test, sonra TestFlight ve Internal Testing.

## 6. Güvenlik Notları

- `SUPABASE_SERVICE_ROLE_KEY` asla mobil uygulamaya veya web client'a koyulmaz.
- Anon key public olabilir ama RLS politikaları açık olmalı.
- CV, telefon, konum ve ödeme verisi minimum düzeyde tutulmalı.
- Kullanıcı hesabı silme akışı ilk sürümlerden itibaren planlanmalı.

