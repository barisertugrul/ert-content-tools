# ERT Content Tools — Smoke Test Checklist

Bu liste, özellikle `Accordion` ve `Collapse` blokları için frontend + editör doğrulaması içindir.

## 1) Hazırlık

- Eklenti aktif olmalı.
- `Accordion` ve `Collapse` blokları eklenti ayarlarında etkin olmalı.
- JS derlemesi güncel olmalı:
	- `npm run build`

## 2) Editör (Block) Testleri

- Yeni bir sayfa aç.
- 1 adet `Accordion` bloğu ekle, en az 2 item gir.
- 1 adet `Collapse` bloğu ekle.
- Kaydet (taslak veya yayınla), editörde blok içeriklerinin kaybolmadığını doğrula.

Beklenen:
- Blok başlık/içerik değerleri editörde stabil kalır.
- Konsolda JS hata mesajı oluşmaz.

## 3) Frontend Davranış Testleri

- Sayfayı frontend’de aç.
- `Accordion` başlıklarına tek tek tıkla.
- `Collapse` başlığına tıklayarak aç/kapat yap.

Beklenen:
- `Accordion` içeriği açılıp kapanır.
- `Collapse` içeriği açılıp kapanır.
- `Accordion` tıklaması `Collapse` davranışını bozmaz (event çakışması yok).

## 4) Klavye Erişilebilirlik Testleri

- `Tab` ile `Accordion` ve `Collapse` başlıklarına odaklan.
- `Enter` ve `Space` ile aç/kapat tetikle.

Beklenen:
- Her iki blok da klavye ile çalışır.
- Odaklanan başlıkta aç/kapat durumu doğru güncellenir.

## 5) ARIA Durumu Kontrolü (DevTools)

- Başlık elementinde:
	- `aria-expanded` (kapalıyken `false`, açıkken `true`)
	- `aria-controls` (hedef panel id)
- İçerik panelinde:
	- `aria-hidden` (kapalıyken `true`, açıkken `false`)

Beklenen:
- Tıklama/klavye etkileşimi sonrası ARIA değerleri senkron değişir.

## 6) Çoklu Blok Testi

- Aynı sayfaya 2 farklı `Accordion` bloğu ekle.
- İlk blokta bir item aç/kapat, sonra ikinci blokta test et.

Beklenen:
- ID çakışması olmaz.
- Bir bloktaki işlem diğer bloğun yanlış panelini açmaz.

## 7) Hızlı Regresyon Kontrolü

- Aynı sayfada `Modal`/`Tooltip` gibi başka bloklar varsa temel tıklama davranışlarını kısa kontrol et.

Beklenen:
- Son değişiklikler diğer blok etkileşimlerini bozmaz.

## 8) Release / Deploy Komutları

- `npm run build`
	- Değişen JavaScript blok dosyalarını derler.
	- Yeni release ZIP paketi oluşturur.
	- Local test eklenti dizinini günceller.

- `npm run build:fast`
	- Derleme adımını atlar.
	- Mevcut build çıktılarıyla ZIP + local deploy yapar.

- `npm run start`
	- Geliştirme için watch mode başlatır.
