"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Consent = {
  analytics: boolean;
  necessary: true;
  updatedAt: string;
};

const storageKey = "fido-cookie-consent-v1";

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) setOpen(true);

    const openSettings = (event: Event) => {
      const target = event.target as Element | null;
      if (!target?.closest("[data-cookie-settings]")) return;
      event.preventDefault();
      const current = window.localStorage.getItem(storageKey);
      if (current) {
        try {
          setAnalytics(Boolean((JSON.parse(current) as Consent).analytics));
        } catch {
          setAnalytics(false);
        }
      }
      setShowDetails(true);
      setOpen(true);
    };

    document.addEventListener("click", openSettings);
    return () => document.removeEventListener("click", openSettings);
  }, []);

  function save(allowAnalytics: boolean) {
    const consent: Consent = {
      necessary: true,
      analytics: allowAnalytics,
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(storageKey, JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent("fido:cookie-consent", { detail: consent }));
    setAnalytics(allowAnalytics);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2147483646] flex items-end bg-black/25 p-4 sm:p-6" role="presentation">
      <section
        className="w-full max-w-[620px] border border-black/10 bg-white p-6 shadow-2xl sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
      >
        <p className="mb-2 text-sm font-semibold uppercase text-[#9b5c31]">Vaše súkromie</p>
        <h2 id="cookie-title" className="text-2xl font-medium leading-tight text-black">
          Nastavenia cookies
        </h2>
        <p className="mt-4 text-[15px] leading-7 text-black/65">
          Nevyhnutné cookies používame na správne fungovanie stránky. Analytické cookies nám pomáhajú zlepšovať web a použijeme ich iba s vaším súhlasom.
        </p>

        {showDetails ? (
          <div className="mt-6 border-y border-black/10">
            <div className="flex items-center justify-between gap-4 py-4">
              <div>
                <strong className="block text-sm font-semibold text-black">Nevyhnutné cookies</strong>
                <span className="mt-1 block text-sm text-black/55">Potrebné pre základné funkcie a uloženie vášho súhlasu.</span>
              </div>
              <span className="text-sm font-semibold text-black/55">Vždy aktívne</span>
            </div>
            <label className="flex cursor-pointer items-center justify-between gap-4 border-t border-black/10 py-4">
              <span>
                <strong className="block text-sm font-semibold text-black">Analytické cookies</strong>
                <span className="mt-1 block text-sm text-black/55">Anonymné štatistiky návštevnosti a používania stránky.</span>
              </span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
                className="h-5 w-5 accent-black"
              />
            </label>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => save(true)} className="min-h-12 bg-black px-5 py-3 text-sm font-semibold text-white">
            Prijať všetky
          </button>
          <button type="button" onClick={() => save(false)} className="min-h-12 border border-black px-5 py-3 text-sm font-semibold text-black">
            Odmietnuť voliteľné
          </button>
          {showDetails ? (
            <button type="button" onClick={() => save(analytics)} className="min-h-12 border border-black/20 px-5 py-3 text-sm font-semibold text-black">
              Uložiť nastavenia
            </button>
          ) : (
            <button type="button" onClick={() => setShowDetails(true)} className="min-h-12 px-2 py-3 text-sm font-semibold text-black underline underline-offset-4">
              Prispôsobiť
            </button>
          )}
        </div>
        <Link href="/ochrana-osobnych-udajov/" className="mt-5 inline-block text-sm text-black/60 underline underline-offset-4">
          Ochrana osobných údajov
        </Link>
      </section>
    </div>
  );
}

