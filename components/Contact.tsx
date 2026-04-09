"use client";

import { FormEvent, useMemo, useState } from "react";
import { Github, Linkedin, Mail, Send, Twitter } from "lucide-react";
import { motion } from "framer-motion";

import type { AnimationConfig, SiteContent } from "@/lib/content";

type ContactProps = {
  site: SiteContent;
  motionConfig: AnimationConfig;
};

type FormState = {
  name: string;
  email: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  message: "",
};

export default function Contact({ site, motionConfig }: ContactProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const socialLinks = useMemo(
    () => [
      { key: "github", href: site.github, icon: Github, label: "GitHub" },
      { key: "linkedin", href: site.linkedin, icon: Linkedin, label: "LinkedIn" },
      { key: "twitter", href: site.twitter, icon: Twitter, label: "Twitter" },
    ].filter((entry) => entry.href),
    [site.github, site.linkedin, site.twitter],
  );

  const canSubmit = form.name.trim() && form.email.trim() && form.message.trim();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    setStatus("sending");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok) {
        setStatus("error");
        setFeedbackMessage(payload.message || site.ui.labels.contact_email_send_error);
        return;
      }

      setStatus("success");
      setFeedbackMessage(payload.message || site.ui.labels.contact_submit_success);
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
      setFeedbackMessage(site.ui.labels.contact_submit_error);
    }
  }

  return (
    <section className="section-shell py-14" id="contact">
      <motion.div
        className="surface-card mx-auto max-w-3xl p-6 text-center md:p-8"
        initial={{ opacity: 0, y: motionConfig.distance }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: motionConfig.duration }}
      >
        <h2 className="section-title">{site.ui.section_titles.contact}</h2>

        {site.email ? (
          <p className="mt-4">
            <a
              className="inline-flex items-center gap-2 text-base font-medium hover:underline"
              href={`mailto:${site.email}`}
            >
              <Mail size={16} />
              {site.email}
            </a>
          </p>
        ) : null}

        {site.show_contact_form ? (
          <form className="mx-auto mt-8 grid max-w-xl gap-3 text-left" onSubmit={handleSubmit}>
            <label className="text-sm muted-copy" htmlFor="name">
              {site.ui.labels.name_label}
            </label>
            <input
              className="h-12 rounded-[var(--radius)] border border-white/15 bg-black/20 px-3 text-sm outline-none transition focus:border-[color:var(--accent-primary)]"
              id="name"
              name="name"
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              value={form.name}
            />

            <label className="text-sm muted-copy" htmlFor="email">
              {site.ui.labels.email_label}
            </label>
            <input
              className="h-12 rounded-[var(--radius)] border border-white/15 bg-black/20 px-3 text-sm outline-none transition focus:border-[color:var(--accent-primary)]"
              id="email"
              name="email"
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              type="email"
              value={form.email}
            />

            <label className="text-sm muted-copy" htmlFor="message">
              {site.ui.labels.message_label}
            </label>
            <textarea
              className="min-h-[132px] rounded-[var(--radius)] border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none transition focus:border-[color:var(--accent-primary)]"
              id="message"
              name="message"
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              value={form.message}
            />

            <button
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius)] border border-[color:var(--accent-primary)] text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!canSubmit || status === "sending"}
              type="submit"
            >
              {status === "sending" ? site.ui.labels.sending_message_button : site.ui.labels.send_message_button}
              <Send size={15} />
            </button>

            {status === "success" ? (
              <p className="text-sm" style={{ color: "var(--accent-secondary)" }}>
                {feedbackMessage}
              </p>
            ) : null}

            {status === "error" ? (
              <p className="text-sm text-red-300">
                {feedbackMessage || site.ui.labels.contact_submit_error}
              </p>
            ) : null}
          </form>
        ) : null}

        {socialLinks.length > 0 ? (
          <div className="mt-8 flex items-center justify-center gap-3">
            {socialLinks.map((entry) => {
              const Icon = entry.icon;
              return (
                <a
                  aria-label={entry.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius)] border border-white/20 text-[color:var(--text-secondary)] transition hover:-translate-y-1 hover:text-[color:var(--text-primary)]"
                  href={entry.href}
                  key={entry.key}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}
