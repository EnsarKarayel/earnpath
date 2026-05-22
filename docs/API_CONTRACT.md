# API Sözleşmesi

İlk sürümde Supabase client doğrudan RLS korumalı tablolara erişebilir. Daha riskli işlemler Edge Function veya Next.js API route üzerinden yapılır.

## Public

### `GET /api/locales`

Desteklenen dilleri döndürür.

### `GET /api/routes?locale=tr`

Aktif gelir rotalarını döndürür.

## Authenticated

### `POST /api/profile`

Kullanıcı profilini oluşturur veya günceller.

### `POST /api/plans`

Profil girdisine göre plan üretir ve kaydeder.

### `POST /api/applications`

Başvuru takip kaydı oluşturur.

### `POST /api/payments/checkout`

Seçilen paket için ödeme oturumu açar.

## Admin

### `POST /api/admin/routes`

Gelir rotası oluşturur.

### `POST /api/admin/course-providers`

Kurs sağlayıcısı ekler.

### `POST /api/admin/job-sources`

İş ilanı kaynağı ekler.

## Plan Üretim Cevabı

```json
{
  "profileId": "uuid",
  "bestRoute": {
    "id": "customer-support",
    "score": 91,
    "incomeWindow": "7-21 gün"
  },
  "alternatives": [],
  "timeline": [],
  "applicationMessage": "Merhaba..."
}
```

