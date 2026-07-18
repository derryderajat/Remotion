#!/usr/bin/env python3
"""Generate a NATURAL Indonesian voiceover with edge-tts (Microsoft neural TTS).

Run this on a machine with open internet access. It overwrites the offline
espeak files in public/vo/voN.mp3 with natural neural speech — no Remotion code
change needed, the composition already points at those filenames.

    pip install edge-tts
    python scripts/generate_vo.py                 # default: id-ID-GadisNeural (female)
    python scripts/generate_vo.py --voice id-ID-ArdiNeural   # male
    python scripts/generate_vo.py --rate +12%     # speak a bit faster

Indonesian neural voices: id-ID-GadisNeural (F), id-ID-ArdiNeural (M).
After running, re-render:  npx remotion render RecehinPromo out/RecehinPromo.mp4
"""
import argparse
import asyncio
import os

import edge_tts

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "vo")

# (id, text). Narasi Bahasa Indonesia — santai/akrab, gaya teman.
LINES = [
    ("vo1", "Uang bulanan sering raib, nggak jelas ke mana?"),
    ("vo2", "Nyatet pengeluaran manual? Ribet. Gampang lupa. Gampang males."),
    ("vo3", "Kenalin, Recehin — pencatat keuangan yang hidup di WhatsApp dan Web kamu."),
    ("vo4", "Ketik aja pengeluaranmu kayak chat biasa, langsung tercatat rapi."),
    ("vo5", "Males ngetik? Foto struk aja, biar AI yang baca dan rapiin."),
    ("vo6", "Recehin nggak cuma nyatet — dia ngasih insight, ngingetin budget, "
            "dan bisa diajak diskusi soal duitmu, kapan aja."),
    ("vo7", "Bahkan mimpimu bisa kamu tulis di sini — dan Recehin bantu kamu "
            "kejar, pelan-pelan, receh demi receh."),
    ("vo8", "Kemudahan pencatatan keuangan, sekarang ada di genggaman tanganmu."),
    ("vo9", "Coba Recehin sekarang, di WhatsApp dan Web."),
]

# Scene budgets (seconds) — lines that must be tighter get a faster default rate.
BUDGET = {"vo3": "+10%", "vo6": "+8%", "vo7": "+6%"}


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--voice", default="id-ID-GadisNeural")
    ap.add_argument("--rate", default="+6%", help="base speaking rate, e.g. +10%")
    ap.add_argument("--pitch", default="+0Hz")
    args = ap.parse_args()

    os.makedirs(OUT_DIR, exist_ok=True)
    for vid, text in LINES:
        rate = BUDGET.get(vid, args.rate)
        out = os.path.join(OUT_DIR, vid + ".mp3")
        tts = edge_tts.Communicate(text, args.voice, rate=rate, pitch=args.pitch)
        await tts.save(out)
        print(f"{vid}: voice={args.voice} rate={rate} -> {out}")
    print("\nDone. Re-render: npx remotion render RecehinPromo out/RecehinPromo.mp4")


if __name__ == "__main__":
    asyncio.run(main())
