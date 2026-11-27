"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "./primitives";

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

type Status = "idle" | "recording" | "recorded";

/** Prominent voice-note recorder for the CM — records (or simulates) audio with live
 *  duration, then offers playback with a progress bar and re-record. */
export function VoiceNote() {
  const [status, setStatus] = useState<Status>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [simulated, setSimulated] = useState(false);

  const recRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timer = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string>("");
  const simTimer = useRef<any>(null);

  useEffect(() => () => { clearInterval(timer.current); clearInterval(simTimer.current); if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);

  const startTimer = () => {
    setElapsed(0);
    const t0 = Date.now();
    timer.current = setInterval(() => setElapsed((Date.now() - t0) / 1000), 100);
  };

  const start = async () => {
    setStatus("recording");
    startTimer();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunks.current = [];
      rec.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        urlRef.current = URL.createObjectURL(blob);
        stream.getTracks().forEach((t) => t.stop());
      };
      rec.start();
      recRef.current = rec;
      setSimulated(false);
    } catch {
      // mic unavailable / denied → simulated demo recording
      setSimulated(true);
    }
  };

  const stop = () => {
    clearInterval(timer.current);
    setDuration(Math.max(1, elapsed));
    if (recRef.current && recRef.current.state !== "inactive") recRef.current.stop();
    setStatus("recorded");
    setPos(0);
  };

  const reset = () => {
    clearInterval(simTimer.current);
    if (urlRef.current) { URL.revokeObjectURL(urlRef.current); urlRef.current = ""; }
    recRef.current = null;
    setStatus("idle"); setElapsed(0); setDuration(0); setPos(0); setPlaying(false);
  };

  const togglePlay = () => {
    if (simulated || !urlRef.current) {
      // simulated playback: animate progress over duration
      if (playing) { clearInterval(simTimer.current); setPlaying(false); return; }
      setPlaying(true);
      const t0 = Date.now() - pos * 1000;
      simTimer.current = setInterval(() => {
        const p = (Date.now() - t0) / 1000;
        if (p >= duration) { clearInterval(simTimer.current); setPos(0); setPlaying(false); }
        else setPos(p);
      }, 100);
      return;
    }
    const a = audioRef.current!;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play(); setPlaying(true); }
  };

  const pct = duration ? Math.min(100, (pos / duration) * 100) : 0;

  return (
    <div className="rounded-xl border-2 border-dashed border-[color:var(--color-ribbon)]/35 bg-[color:var(--color-ribbon)]/[0.04] p-3">
      <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: "var(--color-ribbon)" }}>
        <Icon name="Mic" size={13} /> Voice note from CM <span className="font-medium normal-case text-slate-400">· speak instead of typing</span>
      </div>

      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.button key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={start} type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-ribbon)] py-2.5 text-sm font-bold text-white hover:opacity-90">
            <Icon name="Mic" size={17} /> Record voice note
          </motion.button>
        )}

        {status === "recording" && (
          <motion.div key="rec" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-3">
            <span className="live-dot grid h-9 w-9 shrink-0 place-items-center rounded-full bg-rose-500 text-white"><Icon name="Mic" size={16} /></span>
            <div className="flex flex-1 items-center gap-1">
              {Array.from({ length: 22 }).map((_, i) => (
                <motion.span key={i} className="w-1 rounded-full bg-rose-400"
                  animate={{ height: [6, 6 + ((i * 7) % 18) + 4, 6] }} transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.05 }} />
              ))}
            </div>
            <span className="tabular-nums text-[13px] font-black text-rose-600">{fmt(elapsed)}</span>
            <button onClick={stop} type="button" className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-2 text-[12px] font-bold text-white hover:bg-slate-900"><Icon name="Square" size={13} /> Stop</button>
          </motion.div>
        )}

        {status === "recorded" && (
          <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-3">
            <button onClick={togglePlay} type="button" className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white hover:opacity-90" style={{ background: "var(--color-ribbon)" }}>
              <Icon name={playing ? "Pause" : "Play"} size={18} />
            </button>
            <div className="flex-1">
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "var(--color-ribbon)" }} />
              </div>
              <div className="mt-1 flex items-center justify-between text-[10.5px] text-slate-500">
                <span className="tabular-nums">{fmt(pos)}</span>
                <span className="flex items-center gap-1"><Icon name="AudioLines" size={11} /> Voice note · {fmt(duration)}{simulated && " (demo)"}</span>
                <span className="tabular-nums">{fmt(duration)}</span>
              </div>
            </div>
            <button onClick={reset} type="button" title="Re-record" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-rose-500"><Icon name="Trash2" size={16} /></button>
            {urlRef.current && <audio ref={audioRef} src={urlRef.current} onTimeUpdate={(e) => setPos((e.target as HTMLAudioElement).currentTime)} onEnded={() => { setPlaying(false); setPos(0); }} className="hidden" />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Attachments() {
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files || []).map((f) => ({ name: f.name, size: `${(f.size / 1024).toFixed(0)} KB` }));
    setFiles((prev) => [...prev, ...list]);
    e.target.value = "";
  };

  return (
    <div>
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-400">Attachments</span>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => inputRef.current?.click()} className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] font-bold text-slate-600 hover:bg-slate-50">
          <Icon name="Paperclip" size={14} /> Attach file
        </button>
        <button type="button" onClick={() => inputRef.current?.click()} className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] font-bold text-slate-600 hover:bg-slate-50">
          <Icon name="Image" size={14} /> Photo
        </button>
        <input ref={inputRef} type="file" multiple onChange={onPick} className="hidden" />
        {files.length === 0 && <span className="text-[11px] text-slate-400">PDF, image, Excel…</span>}
      </div>
      {files.length > 0 && (
        <div className="mt-2 space-y-1.5">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[12px]">
              <Icon name="File" size={14} className="text-slate-400" />
              <span className="flex-1 truncate font-semibold text-slate-700">{f.name}</span>
              <span className="text-[10.5px] text-slate-400">{f.size}</span>
              <button type="button" onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-500"><Icon name="X" size={13} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
