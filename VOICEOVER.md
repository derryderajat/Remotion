# Naskah Voiceover — Recehin Promo (9:16, 60 detik)

Bahasa Indonesia, nada santai/akrab (gen-z / milenial), seperti teman yang
kasih tips — bukan iklan formal. Tempo mengikuti cutting video.

Rekam / generate 9 klip VO ini, lalu drop ke timeline sesuai timecode. Semua
teks pada layar (caption) sudah tampil di video, jadi VO tinggal menegaskan.

| # | Timecode | Scene | Voiceover | Teks di layar |
|---|----------|-------|-----------|---------------|
| 1 | 00:00–00:04 | Hook | "Uang bulanan sering raib nggak jelas ke mana?" | Duitmu ke mana aja bulan ini? 🤔 |
| 2 | 00:04–00:09 | Problem | "Nyatet pengeluaran manual? Ribet. Gampang lupa. Gampang males." | Cape nyatet manual? Sama. |
| 3 | 00:09–00:14 | Intro Solusi | "Kenalin, Recehin — pencatat keuangan yang hidup di WhatsApp & Web-mu." | Recehin — di WhatsApp & Web |
| 4 | 00:14–00:24 | Demo Input Teks | "Ketik aja pengeluaranmu kayak chat biasa, langsung tercatat rapi." | Ketik, langsung kecatat ✍️ |
| 5 | 00:24–00:32 | Demo Upload Struk | "Males ngetik? Foto struk aja, biar AI yang baca dan rapiin." | Jepret struk, beres 📸 |
| 6 | 00:32–00:42 | AI Insight | "Recehin nggak cuma nyatet — dia ngasih insight, ngingetin budget, dan bisa diajak diskusi soal duitmu, kapan aja." | AI insight buat budgeting-mu 🧠 |
| 7 | 00:42–00:50 | Menulis Mimpi | "Bahkan mimpimu bisa kamu tulis di sini — dan Recehin bantu kamu kejar, pelan-pelan, receh demi receh." | Tulis mimpimu, kejar bareng Recehin ✨ |
| 8 | 00:50–00:56 | Tagline | "Kemudahan pencatatan keuangan, sekarang ada di genggaman tanganmu." | Ada di genggamanmu, kapan aja. |
| 9 | 00:56–00:60 | CTA / Outro | "Coba Recehin sekarang, di WhatsApp dan Web." | Coba Recehin sekarang → wa.me/628xxxxxx · recehin.my.id |

## Status VO saat ini

Video **sudah ada voiceover Bahasa Indonesia** di `public/vo/vo1…vo9.mp3`,
sudah terpasang & di-mix di `src/recehin/RecehinPromo.tsx` (musik otomatis
diturunkan / *ducking* saat VO bicara).

VO ini di-generate **offline pakai espeak-ng** (`scripts/gen_vo_espeak.py`),
karena environment build ini memblokir semua layanan TTS neural (HuggingFace /
Microsoft Edge / Google — kena kebijakan jaringan). Suaranya jelas & benar
Bahasa Indonesia, tapi terdengar sintetis/robotik.

## Upgrade ke suara natural (neural) — 1 perintah

Di komputer dengan internet terbuka:

```bash
pip install edge-tts
python scripts/generate_vo.py                      # id-ID-GadisNeural (perempuan)
# atau: python scripts/generate_vo.py --voice id-ID-ArdiNeural   (laki-laki)
npx remotion render RecehinPromo out/RecehinPromo.mp4
```

Script menimpa `public/vo/voN.mp3` dengan suara neural yang natural (nama file
sama, jadi **tidak perlu ubah kode**). Voice Indonesia yang bagus:
`id-ID-GadisNeural` (F) dan `id-ID-ArdiNeural` (M).

Kalau punya rekaman VO manusia sendiri, cukup timpa `public/vo/voN.mp3` dengan
file kamu (urut sesuai tabel di atas) lalu render ulang.

## Mengatur level / ducking

Di `src/recehin/RecehinPromo.tsx`:
- `musicVolume()` — `base` = volume musik saat tidak ada VO, `duck` = volume
  musik saat VO bicara. Naikkan/turunkan sesuai selera.
- Volume tiap `<Audio>` VO ada di array `VO`.
