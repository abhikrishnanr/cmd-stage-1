"use client";

import { useEffect, useRef, useState } from "react";
import {
  AudioLines,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  FileText,
  Gauge,
  Mic,
  Paperclip,
  Pause,
  Play,
  RotateCcw,
  Send,
  Square,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";
import { portalRoles } from "@/data/roles";

type RecorderState = "idle" | "recording" | "recorded";

const priorities = ["Critical", "High", "Medium", "Watch"] as const;
const priorityIcons = { Critical: CircleAlert, High: TriangleAlert, Medium: Gauge, Watch: Clock3 };
const responseTypes = [
  "Brief note",
  "Action taken report",
  "Data correction",
  "Field verification",
  "Cabinet note",
  "Department review",
];

export function CMReviewPanel({ open, onClose, initialTitle = "" }: { open: boolean; onClose: () => void; initialTitle?: string }) {
  const [priority, setPriority] = useState<(typeof priorities)[number]>("High");
  const [files, setFiles] = useState<File[]>([]);
  const [saved, setSaved] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => titleRef.current?.focus(), 80);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="review-overlay" role="presentation">
      <button className="review-backdrop" onClick={onClose} aria-label="Close review form" />
      <section className="review-dialog" role="dialog" aria-modal="true" aria-labelledby="review-dialog-title">
        <header className="review-dialog-head">
          <div>
            <span><Mic size={14} /> CM review</span>
            <h2 id="review-dialog-title">Create a review instruction</h2>
            <p>Record a voice note or write the instruction, then assign it for follow-up.</p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close review form"><X size={19} /></button>
        </header>

        {saved ? (
          <div className="review-success">
            <CheckCircle2 size={36} />
            <h3>Review instruction prepared</h3>
            <p>The instruction is ready. Department submission, ticket numbering and notifications can be connected when the review-ticket service is enabled.</p>
            <button onClick={() => { setSaved(false); onClose(); }}>Done</button>
          </div>
        ) : (
          <form className="review-form" onSubmit={(event) => { event.preventDefault(); setSaved(true); }}>
            <div className="review-form-main">
              <Field label="Review title">
                <input ref={titleRef} key={initialTitle} defaultValue={initialTitle} required placeholder="Enter the matter for review" />
              </Field>

              <div className="review-field-grid">
                <Field label="Related item type">
                  <select defaultValue="Dashboard indicator"><option>Dashboard indicator</option><option>Chart or trend</option><option>Programme</option><option>Department report</option><option>Grievance</option><option>Project</option></select>
                </Field>
                <Field label="Related item">
                  <input defaultValue={initialTitle.replace(/^Review:\s*/, "")} placeholder="Indicator, scheme or project name" />
                </Field>
              </div>

              <VoiceRecorder />

              <Field label="Written instruction">
                <textarea rows={4} placeholder="Add the direction, question or information required from the department" />
              </Field>

              <div className="review-field-grid">
                <Field label="Assign to">
                  <select defaultValue="chief-secretary">
                    {portalRoles.filter((role) => role.kind === "secretary").map((role) => (
                      <option key={role.id} value={role.id}>{role.title} · {role.name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Department">
                  <input placeholder="Select or enter department" />
                </Field>
              </div>

              <Field label="Priority">
                <div className="review-priorities" role="group" aria-label="Priority">
                  {priorities.map((item) => {
                    const Icon = priorityIcons[item];
                    return <button type="button" key={item} className={priority === item ? "active" : ""} data-priority={item.toLowerCase()} onClick={() => setPriority(item)}><Icon size={13} />{item}</button>;
                  })}
                </div>
              </Field>

              <div className="review-field-grid">
                <Field label="Due date">
                  <div className="review-input-icon"><CalendarDays size={15} /><input type="date" /></div>
                </Field>
                <Field label="Expected response">
                  <select defaultValue={responseTypes[0]}>{responseTypes.map((item) => <option key={item}>{item}</option>)}</select>
                </Field>
              </div>

              <Field label="Attachments">
                <div className="review-attachments">
                  <button type="button" onClick={() => fileRef.current?.click()}><Paperclip size={15} /> Attach file</button>
                  <input ref={fileRef} hidden type="file" multiple onChange={(event) => setFiles((current) => [...current, ...Array.from(event.target.files || [])])} />
                  <span>PDF, image or spreadsheet</span>
                </div>
                {files.length > 0 && <div className="review-file-list">{files.map((file, index) => (
                  <div key={`${file.name}-${index}`}><FileText size={14} /><span>{file.name}</span><small>{formatBytes(file.size)}</small><button type="button" onClick={() => setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remove ${file.name}`}><X size={13} /></button></div>
                ))}</div>}
              </Field>
            </div>

            <footer className="review-dialog-actions">
              <button type="button" className="secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="primary"><Send size={15} /> Prepare review instruction</button>
            </footer>
          </form>
        )}
      </section>
    </div>
  );
}

function VoiceRecorder() {
  const [status, setStatus] = useState<RecorderState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timer = useRef<number | null>(null);
  const startedAt = useRef(0);
  const audioUrl = useRef("");
  const audio = useRef<HTMLAudioElement>(null);

  const stopTimer = () => {
    if (timer.current != null) window.clearInterval(timer.current);
    timer.current = null;
  };

  const clearAudio = () => {
    if (audioUrl.current) URL.revokeObjectURL(audioUrl.current);
    audioUrl.current = "";
  };

  useEffect(() => () => {
    stopTimer();
    if (mediaRecorder.current?.state === "recording") mediaRecorder.current.stop();
    mediaStream.current?.getTracks().forEach((track) => track.stop());
    clearAudio();
  }, []);

  const start = async () => {
    setError("");
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Voice recording is not available in this browser. Use the written instruction field below.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaStream.current = stream;
      mediaRecorder.current = recorder;
      chunks.current = [];
      clearAudio();
      recorder.ondataavailable = (event) => {
        if (event.data.size) chunks.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: recorder.mimeType || "audio/webm" });
        if (blob.size) {
          audioUrl.current = URL.createObjectURL(blob);
          if (audio.current) audio.current.src = audioUrl.current;
        }
        stream.getTracks().forEach((track) => track.stop());
      };
      recorder.start();
      startedAt.current = Date.now();
      setElapsed(0);
      setPosition(0);
      setStatus("recording");
      timer.current = window.setInterval(() => setElapsed((Date.now() - startedAt.current) / 1000), 100);
    } catch {
      setError("Microphone access was not granted. Allow microphone access or use the written instruction field below.");
      setStatus("idle");
    }
  };

  const stop = () => {
    stopTimer();
    const finalDuration = Math.max(1, (Date.now() - startedAt.current) / 1000);
    setDuration(finalDuration);
    setElapsed(finalDuration);
    if (mediaRecorder.current?.state === "recording") mediaRecorder.current.stop();
    setStatus("recorded");
  };

  const reset = () => {
    audio.current?.pause();
    clearAudio();
    setStatus("idle");
    setPlaying(false);
    setElapsed(0);
    setDuration(0);
    setPosition(0);
    setError("");
  };

  const togglePlayback = async () => {
    const player = audio.current;
    if (!player || !audioUrl.current) return;
    if (playing) {
      player.pause();
      setPlaying(false);
    } else {
      await player.play();
      setPlaying(true);
    }
  };

  const progress = duration ? Math.min(100, (position / duration) * 100) : 0;

  return (
    <div className="voice-recorder">
      <div className="voice-recorder-label"><AudioLines size={15} /><strong>Voice note from CM</strong><span>Record the instruction instead of typing</span></div>
      {status === "idle" && <button type="button" className="voice-record-start" onClick={start}><Mic size={17} /> Record voice note</button>}
      {status === "recording" && (
        <div className="voice-recording">
          <span className="voice-live"><Mic size={16} /></span>
          <div className="voice-wave" aria-hidden="true">{Array.from({ length: 18 }).map((_, index) => <i key={index} style={{ height: `${8 + ((index * 11) % 22)}px` }} />)}</div>
          <time>{formatTime(elapsed)}</time>
          <button type="button" onClick={stop}><Square size={13} /> Stop</button>
        </div>
      )}
      {status === "recorded" && (
        <div className="voice-recorded">
          <button type="button" className="voice-play" onClick={togglePlayback} aria-label={playing ? "Pause voice note" : "Play voice note"}>{playing ? <Pause size={17} /> : <Play size={17} />}</button>
          <div><div className="voice-progress"><span style={{ width: `${progress}%` }} /></div><small>{formatTime(position)} <b>Voice note · {formatTime(duration)}</b> {formatTime(duration)}</small></div>
          <button type="button" className="voice-reset" onClick={reset} aria-label="Record again"><RotateCcw size={16} /></button>
          <button type="button" className="voice-reset" onClick={reset} aria-label="Delete voice note"><Trash2 size={16} /></button>
        </div>
      )}
      {error && <p className="voice-error">{error}</p>}
      <audio ref={audio} hidden onTimeUpdate={(event) => setPosition(event.currentTarget.currentTime)} onEnded={() => { setPlaying(false); setPosition(0); }} />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="review-field"><span>{label}</span>{children}</label>;
}

function formatTime(value: number) {
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function formatBytes(value: number) {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${Math.round(value / 1024)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}
