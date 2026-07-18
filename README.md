# Recehin — Promo Video (Remotion)

Video promosi vertikal **9:16, 60 detik** untuk aplikasi pencatat keuangan
**Recehin**, dibangun dengan [Remotion](https://www.remotion.dev). Memakai
footage rekaman layar asli (alur chat WhatsApp Recehin) sebagai B-roll dan
logo "R" sebagai branding di intro/outro.

![scene](https://img.shields.io/badge/format-1080x1920-1E6FF0) 60s · 30fps

## Isi & timeline

Komposisi `RecehinPromo` (`src/recehin/`) — 9 scene sesuai brief:

| Timecode | Scene | Isi |
|----------|-------|-----|
| 00:00–00:04 | Hook | Reveal logo + "Duitmu ke mana aja bulan ini?" |
| 00:04–00:09 | Problem | Motion graphic: nyatet manual itu ribet |
| 00:09–00:14 | Intro Solusi | Kenalin Recehin — di WhatsApp & Web |
| 00:14–00:24 | Demo Input Teks | Footage asli: ketik pengeluaran → "2 Transaksi Tercatat" |
| 00:24–00:32 | Demo Upload Struk | Footage asli: foto struk → AI baca "Kuitansi Tercatat" |
| 00:32–00:42 | AI Insight | Footage asli: donut, tren, forecast + callout badge |
| 00:42–00:50 | Menulis Mimpi | Kartu goal beranimasi + menu "Mimpiku" |
| 00:50–00:56 | Tagline | Split-screen WhatsApp & Web |
| 00:56–00:60 | CTA / Outro | Logo + "Coba Recehin sekarang" + URL |

Palet & tipografi ada di `src/recehin/theme.ts` (biru `#1E6FF0`→`#4A9EFF`,
Poppins). Batas tiap scene jatuh pas di grid ketukan 120 BPM.

## Menjalankan

```bash
npm install
npm run dev            # buka Remotion Studio untuk preview/edit
```

Render video final:

```bash
npx remotion render RecehinPromo out/RecehinPromo.mp4
```

> Di lingkungan tanpa Chrome sendiri, arahkan ke browser yang sudah ada:
> `npx remotion render RecehinPromo out/RecehinPromo.mp4 --browser-executable=/path/to/chrome`

## Aset

- `public/footage.mp4` — rekaman layar asli (850×1920) yang disediakan.
  Potongan tiap fitur dipilih lewat `trimBefore` (frame sumber, 30fps) di
  komponen `PhoneFrame`.
- `public/fonts/` — Poppins (woff2) di-bundle lokal, jadi render tidak
  butuh akses jaringan ke Google Fonts.
- `public/music/bed.mp3` — **placeholder** musik bed (chord pad 120 BPM yang
  di-synth). Ganti dengan track berlisensi (lihat di bawah).

## Audio: musik & voiceover (perlu diganti)

Environment build ini tidak punya engine TTS / library musik, jadi:

- **Voiceover** belum ada. Naskah lengkap + timecode ada di
  [`VOICEOVER.md`](./VOICEOVER.md). Semua narasi juga sudah tampil sebagai
  caption di layar, jadi video tetap komunikatif walau di-mute (cocok untuk
  Reels/TikTok/Status). Cara memasang VO ada di file itu.
- **Musik** saat ini memakai bed placeholder yang subtle. Ganti dengan track
  upbeat berlisensi: taruh file di `public/music/`, lalu ubah `staticFile(...)`
  pada `<Audio>` di `src/recehin/RecehinPromo.tsx`. Set `WITH_MUSIC = false`
  untuk master tanpa musik.

## Struktur kode

```
src/recehin/
  theme.ts            # token desain + timeline scene
  fonts.ts            # load Poppins dari file lokal
  RecehinPromo.tsx    # komposisi utama (rangkai 9 scene + musik)
  components/         # Logo, Background, PhoneFrame, Bits, Layout, SceneWrap
  scenes/             # Scene* untuk tiap segmen timeline
```
