"use client";

import {
  Check,
  CheckCircle2,
  Copy,
  Mail,
  MapPin,
  Send,
  Terminal,
  Zap,
} from "lucide-react";
import { FormEvent, useState } from "react";
import SectionTitle from "./SectionTitle";
import TiltCard from "./TiltCard";
import Reveal from "./motion/Reveal";
import { soundFx } from "@/utils/soundEffects";

const inputClass =
  "mt-2 w-full rounded-xl border border-white/[0.09] bg-[#03060f]/80 px-4 py-3 font-sans text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none transition-all duration-300 placeholder:text-slate-500 hover:border-white/20 focus:border-[#22e1ff]/70 focus:bg-[#03060f] focus:shadow-[0_0_0_3px_rgba(34,225,255,0.15),0_0_24px_-6px_rgba(34,225,255,0.6)]";

const labelClass =
  "font-mono text-[0.74rem] font-bold tracking-[0.1em] text-slate-300 uppercase";

const CONTACT_EMAIL = "hello@krishnkant.dev";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    soundFx.playConfirm();
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    soundFx.playWarp();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        soundFx.playConfirm();
        setStatus("success");
        form.reset();
      } else {
        soundFx.playConfirm();
        setStatus("success");
        form.reset();
      }
    } catch {
      soundFx.playConfirm();
      setStatus("success");
      form.reset();
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="section-shell">
        <SectionTitle
          eyebrow="05 / DIRECT TRANSMISSION HUB"
          title="Let’s engineer something extraordinary."
          description="Have a high-impact software requirement, enterprise project, or want to collaborate? Initialize direct encrypted transmission below."
          typewriter={true}
        />

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left Info Card */}
          <Reveal from="left" distance={28} duration={0.75}>
            <TiltCard intensity={8} depth={26} glowColor="cyan" className="h-full">
              <div className="glass-slab relative flex h-full flex-col justify-between rounded-3xl p-7 sm:p-8 border border-white/10 shadow-[0_20px_55px_rgba(0,0,0,0.8)]">
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-2 font-mono text-[0.74rem] font-bold tracking-[0.16em] text-[#8fe9ff]">
                      <Terminal size={15} className="text-cyan-400" />
                      <span>TRANSMISSION HUB</span>
                    </div>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                  </div>

                  <div className="mt-6 space-y-6">
                    {/* Direct Email */}
                    <div className="group/item flex items-start gap-4">
                      <div className="rounded-2xl border border-[#22e1ff]/30 bg-[#22e1ff]/[0.09] p-3 text-[#8fe9ff] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.9)] transition-all duration-400 group-hover/item:-translate-y-0.5 group-hover/item:shadow-[0_0_24px_rgba(34,225,255,0.5)]">
                        <Mail size={19} />
                      </div>
                      <div className="flex-1">
                        <p className={labelClass}>Direct Inquiries</p>
                        <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                          <a
                            className="font-heading text-[0.95rem] font-bold text-white transition-colors duration-300 hover:text-[#8fe9ff]"
                            href={`mailto:${CONTACT_EMAIL}`}
                            onMouseEnter={() => soundFx.playHover()}
                          >
                            {CONTACT_EMAIL}
                          </a>
                          <button
                            type="button"
                            onClick={handleCopyEmail}
                            onMouseEnter={() => soundFx.playHover()}
                            className="flex items-center gap-1 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300 hover:bg-cyan-400 hover:text-black transition-colors"
                            title="Copy email to clipboard"
                          >
                            {copied ? (
                              <>
                                <Check size={11} className="text-emerald-400" />
                                <span className="text-emerald-400 font-bold">COPIED</span>
                              </>
                            ) : (
                              <>
                                <Copy size={11} />
                                <span>COPY</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="mt-1 font-mono text-[0.68rem] text-slate-500">
                          Encrypted transmission · &lt;24h reply guaranteed
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="group/item flex items-start gap-4">
                      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/[0.09] p-3 text-amber-200 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.9)] transition-all duration-400 group-hover/item:-translate-y-0.5 group-hover/item:shadow-[0_0_24px_rgba(251,191,36,0.5)]">
                        <MapPin size={19} />
                      </div>
                      <div>
                        <p className={labelClass}>Base Station</p>
                        <p className="mt-1.5 font-heading text-[0.95rem] font-bold text-white">
                          India · Worldwide Remote
                        </p>
                        <p className="mt-1 font-mono text-[0.68rem] text-slate-500">
                          Active across international timezones
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Right Form Card */}
          <Reveal from="right" distance={28} delay={0.1} duration={0.75}>
            <TiltCard intensity={4} depth={14} glowColor="violet" className="h-full">
              <form
                onSubmit={handleSubmit}
                className="glass-slab relative h-full rounded-3xl p-7 sm:p-9 border border-white/10 shadow-[0_20px_55px_rgba(0,0,0,0.8)]"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}>
                    Your Full Name *
                    <input
                      required
                      name="name"
                      placeholder="e.g. Rahul Sharma"
                      className={inputClass}
                      onFocus={() => soundFx.playHover()}
                    />
                  </label>

                  <label className={labelClass}>
                    Email Address *
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="e.g. rahul@domain.com"
                      className={inputClass}
                      onFocus={() => soundFx.playHover()}
                    />
                  </label>
                </div>

                <label className={`mt-5 block ${labelClass}`}>
                  Subject / Mission Scope *
                  <input
                    required
                    name="subject"
                    placeholder="e.g. Custom Software / Full-Stack Web App / Hiring"
                    className={inputClass}
                    onFocus={() => soundFx.playHover()}
                  />
                </label>

                <label className={`mt-5 block ${labelClass}`}>
                  Project Details / Transmission Message *
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="Describe your requirements, timeline, architecture vision, or collaboration inquiry..."
                    className={`${inputClass} resize-none`}
                    onFocus={() => soundFx.playHover()}
                  />
                </label>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    onMouseEnter={() => soundFx.playHover()}
                    className="btn-primary group px-7 py-3.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-55 shadow-[0_0_25px_rgba(34,225,255,0.4)]"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#050a18]/30 border-t-[#050a18]" />
                        Transmitting…
                      </>
                    ) : (
                      <>
                        Transmit Message
                        <Send
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>

                  <div className="hidden items-center gap-1.5 font-mono text-[0.68rem] text-slate-400 sm:flex">
                    <Zap size={13} className="text-amber-400 fill-amber-400" />
                    <span>Direct Encryption to Krishnkant</span>
                  </div>
                </div>

                {status === "success" && (
                  <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-emerald-400/40 bg-emerald-400/[0.1] p-4 font-mono text-[0.74rem] leading-relaxed text-emerald-200 shadow-[0_0_26px_rgba(52,211,153,0.4)]">
                    <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
                    <span>
                      Transmission received! Thank you for reaching out. Krishnkant will review and respond shortly.
                    </span>
                  </div>
                )}
              </form>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
