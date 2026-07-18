#!/usr/bin/env python3
"""Generate the Recehin Indonesian voiceover offline with espeak-ng (ctypes).

This is the fallback used when neural TTS hosts (HuggingFace / Edge / Google)
are blocked by network policy. For a natural voice, use scripts/generate_vo.py
(edge-tts) on a machine with open network — the Remotion composition prefers
neural files automatically. See VOICEOVER.md.
"""
import ctypes
import os
import struct
import subprocess
import wave

import espeakng_loader

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "vo")
FFMPEG = os.path.join(
    os.path.dirname(__file__),
    "..",
    "node_modules",
    "@remotion",
    "compositor-linux-x64-gnu",
    "ffmpeg",
)
FPS = 30

# (id, text, scene_duration_seconds). Text = narasi Bahasa Indonesia.
LINES = [
    ("vo1", "Uang bulanan sering raib, nggak jelas ke mana?", 4.0),
    ("vo2", "Nyatet pengeluaran manual? Ribet. Gampang lupa. Gampang males.", 5.0),
    ("vo3", "Kenalin, Recehin. Pencatat keuangan yang hidup di WhatsApp dan Web kamu.", 5.0),
    ("vo4", "Ketik aja pengeluaranmu kayak chat biasa, langsung tercatat rapi.", 10.0),
    ("vo5", "Males ngetik? Foto struk aja, biar A I yang baca dan rapiin.", 8.0),
    ("vo6", "Recehin nggak cuma nyatet. Dia ngasih insight, ngingetin budget, "
            "dan bisa diajak diskusi soal duitmu, kapan aja.", 10.0),
    ("vo7", "Bahkan mimpimu bisa kamu tulis di sini, dan Recehin bantu kamu "
            "kejar, pelan-pelan, receh demi receh.", 8.0),
    ("vo8", "Kemudahan pencatatan keuangan, sekarang ada di genggaman tanganmu.", 6.0),
    ("vo9", "Coba Recehin sekarang, di WhatsApp dan Web.", 4.0),
]

lib = ctypes.CDLL(espeakng_loader.get_library_path())
DATA_PARENT = os.path.dirname(espeakng_loader.get_data_path())

lib.espeak_Initialize.restype = ctypes.c_int
lib.espeak_Initialize.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.c_char_p, ctypes.c_int]
lib.espeak_Synth.argtypes = [
    ctypes.c_char_p, ctypes.c_size_t, ctypes.c_uint, ctypes.c_int,
    ctypes.c_uint, ctypes.c_uint, ctypes.c_void_p, ctypes.c_void_p,
]
RATE = lib.espeak_Initialize(1, 0, DATA_PARENT.encode(), 0)  # AUDIO_OUTPUT_RETRIEVAL

SYNTH_CB = ctypes.CFUNCTYPE(ctypes.c_int, ctypes.POINTER(ctypes.c_short), ctypes.c_int, ctypes.c_void_p)


def synth(text, speed, pitch=55):
    buf = []

    def cb(wav, n, events):
        if n > 0:
            buf.extend(wav[i] for i in range(n))
        return 0

    c_cb = SYNTH_CB(cb)
    lib.espeak_SetSynthCallback(c_cb)
    lib.espeak_SetVoiceByName(b"id")
    lib.espeak_SetParameter(1, speed, 0)   # rate (wpm)
    lib.espeak_SetParameter(2, 200, 0)     # volume
    lib.espeak_SetParameter(3, pitch, 0)   # pitch
    lib.espeak_SetParameter(5, 8, 0)       # word gap (10ms units) for clarity
    data = text.encode("utf8")
    lib.espeak_Synth(data, len(data) + 1, 0, 0, 0, 1, None, None)
    lib.espeak_Synchronize()
    return buf


def write_wav(path, samples):
    with wave.open(path, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(RATE)
        w.writeframes(struct.pack("<%dh" % len(samples), *samples))


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for vid, text, scene_dur in LINES:
        budget = scene_dur - 0.35
        speed = 150
        samples = synth(text, speed)
        dur = len(samples) / RATE
        # speed up until it fits the scene (cap 205 wpm)
        while dur > budget and speed < 205:
            speed = min(205, int(speed * (dur / budget) + 4))
            samples = synth(text, speed)
            dur = len(samples) / RATE
        wav_path = os.path.join(OUT_DIR, vid + ".wav")
        mp3_path = os.path.join(OUT_DIR, vid + ".mp3")
        write_wav(wav_path, samples)
        # light EQ + loudness for a warmer, less harsh read; export mp3
        subprocess.run(
            [FFMPEG, "-y", "-i", wav_path,
             "-af", "loudnorm=I=-17:TP=-2:LRA=11,"
                    "aformat=sample_rates=44100:channel_layouts=stereo",
             "-c:a", "libmp3lame", "-b:a", "160k", mp3_path],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        os.remove(wav_path)
        print(f"{vid}: speed={speed} dur={dur:.2f}s (budget {budget:.2f}s) -> {mp3_path}")


if __name__ == "__main__":
    main()
