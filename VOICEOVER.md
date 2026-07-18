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

## Cara memasang VO ke video

1. Rekam / generate tiap baris sebagai file audio (`vo-1.mp3` … `vo-9.mp3`),
   atau satu file utuh `voiceover.mp3` sepanjang 60 detik.
2. Taruh di `public/vo/`.
3. Di `src/recehin/RecehinPromo.tsx`, tambahkan `<Audio>` (import dari
   `remotion`) dengan `staticFile("vo/voiceover.mp3")`. Untuk per-klip,
   bungkus tiap `<Audio>` dalam `<Sequence from={...}>` sesuai timecode di atas
   (kalikan detik × 30 untuk dapat frame; boundary tiap scene ada di
   `src/recehin/theme.ts` → `scenes`).
4. Turunkan volume musik bed saat VO aktif — set `volume={0.5}` pada `<Audio>`
   musik menjadi lebih rendah (mis. `0.25`), atau gunakan volume ducking.
