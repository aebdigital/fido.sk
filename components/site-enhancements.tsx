"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CursorState = { visible: boolean; x: number; y: number; text: string };
type LightboxState = { images: string[]; index: number } | null;

export function SiteEnhancements() {
  const pathname = usePathname();
  const router = useRouter();
  const [cursor, setCursor] = useState<CursorState>({ visible: false, x: 0, y: 0, text: "Detail služby" });
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [isClosing, setIsClosing] = useState(false);

  const closeLightbox = () => {
    setIsClosing(true);
    setTimeout(() => {
      setLightbox(null);
      setIsClosing(false);
    }, 280);
  };

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-id="div_block-55-72"], [data-id="div_block-65-62"], .card-sluzba-wrap, .card-project'));

    cards.forEach((card) => {
      const link = card.querySelector<HTMLAnchorElement>('a[href]:not([href="#"])');
      if (!link) return;
      card.classList.add("fido-clickable-card");
      card.tabIndex = 0;
      card.setAttribute("role", "link");
      const project = card.classList.contains("card-project") || card.getAttribute("data-id") === "div_block-65-62";
      const cursorText = project ? "Detail projektu" : "Detail služby";
      const navigate = () => router.push(new URL(link.href).pathname);
      const click = (event: MouseEvent) => {
        if (!(event.target as Element).closest("a, button")) navigate();
      };
      const keydown = (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          navigate();
        }
      };
      const move = (event: MouseEvent) => setCursor({ visible: true, x: event.clientX, y: event.clientY, text: cursorText });
      const leave = () => setCursor((current) => ({ ...current, visible: false }));
      card.addEventListener("click", click);
      card.addEventListener("keydown", keydown);
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        card.removeEventListener("click", click);
        card.removeEventListener("keydown", keydown);
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
    });

    document.querySelectorAll<HTMLElement>(".oxy-gallery").forEach((gallery) => {
      const anchors = Array.from(gallery.querySelectorAll<HTMLAnchorElement>("a.oxy-gallery-item[href]"));
      const images = anchors.map((anchor) => anchor.href);
      anchors.forEach((anchor, index) => {
        const open = (event: MouseEvent) => {
          event.preventDefault();
          setLightbox({ images, index });
        };
        anchor.addEventListener("click", open);
        cleanups.push(() => anchor.removeEventListener("click", open));
      });
    });

    document.querySelectorAll<HTMLElement>(".fido-hero-slider").forEach((slider) => {
      const slides = Array.from(slider.querySelectorAll<HTMLElement>(".fido-hero-slide"));
      if (slides.length < 2) return;
      let index = Math.max(0, slides.findIndex((slide) => slide.classList.contains("active")));
      const timer = window.setInterval(() => {
        slides[index]?.classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index]?.classList.add("active");
      }, 4500);
      cleanups.push(() => window.clearInterval(timer));
    });

    document.querySelectorAll<HTMLElement>(".oxel_accordion").forEach((accordion) => {
      const row = accordion.querySelector<HTMLElement>(".oxel_accordion__row");
      const content = accordion.querySelector<HTMLElement>(".oxel_accordion__content");
      if (!row || !content) return;
      const toggle = () => {
        const expanded = row.getAttribute("aria-expanded") === "true";
        row.setAttribute("aria-expanded", String(!expanded));
        content.classList.toggle("oxel_accordion__content__hidden", expanded);
      };
      row.addEventListener("click", toggle);
      cleanups.push(() => row.removeEventListener("click", toggle));
    });

    document.querySelectorAll<HTMLElement>(".fido-furniture-faq-item").forEach((item) => {
      const trigger = item.querySelector<HTMLButtonElement>(".fido-furniture-faq-trigger");
      const answer = item.querySelector<HTMLElement>(".fido-furniture-faq-answer");
      if (!trigger || !answer) return;
      const toggle = () => {
        const expanded = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!expanded));
        answer.setAttribute("aria-hidden", String(expanded));
        item.classList.toggle("is-open", !expanded);
      };
      trigger.addEventListener("click", toggle);
      cleanups.push(() => trigger.removeEventListener("click", toggle));
    });

    document.querySelectorAll<HTMLFormElement>("#wpforms-form-177, #wpforms-form-713").forEach((form) => {
      const submit = async (event: SubmitEvent) => {
        event.preventDefault();
        const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
        const original = button?.textContent ?? "Odoslať";
        if (button) {
          button.disabled = true;
          button.textContent = "Odosiela sa...";
        }
        try {
          const response = await fetch("/api/contact", { method: "POST", body: new FormData(form) });
          if (!response.ok) throw new Error("Odoslanie zlyhalo");
          form.hidden = true;
          const status = document.createElement("div");
          status.className = "fido-form-success";
          status.setAttribute("role", "status");
          const title = document.createElement("h3");
          title.textContent = "Správa bola úspešne odoslaná";
          const copy = document.createElement("p");
          copy.textContent = "Ďakujeme za váš záujem. Ozveme sa vám čo najskôr.";
          status.append(title, copy);
          form.parentElement?.appendChild(status);
        } catch {
          if (button) {
            button.disabled = false;
            button.textContent = original;
          }
          form.setAttribute("data-submit-error", "true");
        }
      };
      form.addEventListener("submit", submit);
      cleanups.push(() => form.removeEventListener("submit", submit));
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname, router]);

  useEffect(() => {
    if (!lightbox || isClosing) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") setLightbox((current) => current && ({ ...current, index: (current.index - 1 + current.images.length) % current.images.length }));
      if (event.key === "ArrowRight") setLightbox((current) => current && ({ ...current, index: (current.index + 1) % current.images.length }));
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", keydown);
    };
  }, [lightbox, isClosing]);

  return (
    <>
      <div className={`fido-card-cursor ${cursor.visible ? "is-visible" : ""}`} style={{ transform: `translate3d(${cursor.x + 14}px, ${cursor.y + 14}px, 0)` }}>{cursor.text}</div>
      {lightbox ? (
        <div 
          className={`fido-lightbox ${isClosing ? "is-closing" : ""}`} 
          role="dialog" 
          aria-modal="true" 
          aria-label="Galéria"
          onClick={(e) => {
            if ((e.target as HTMLElement).classList.contains("fido-lightbox")) {
              closeLightbox();
            }
          }}
        >
          <button className="fido-lightbox-close" type="button" onClick={closeLightbox} aria-label="Zavrieť galériu"><X /></button>
          <button className="fido-lightbox-prev" type="button" onClick={() => !isClosing && setLightbox((current) => current && ({ ...current, index: (current.index - 1 + current.images.length) % current.images.length }))} disabled={isClosing} aria-label="Predchádzajúca fotografia"><ChevronLeft /></button>
          <img key={lightbox.index} className="fido-lightbox-img" src={lightbox.images[lightbox.index]} alt="" />
          <button className="fido-lightbox-next" type="button" onClick={() => !isClosing && setLightbox((current) => current && ({ ...current, index: (current.index + 1) % current.images.length }))} disabled={isClosing} aria-label="Ďalšia fotografia"><ChevronRight /></button>
        </div>
      ) : null}
    </>
  );
}
