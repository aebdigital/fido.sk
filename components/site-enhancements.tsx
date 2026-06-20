"use client";

import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type MenuKey = "realestate" | "furniture" | "windows" | "services";

type MenuItem = {
  title: string;
  href: string;
  image: string;
};

const menus: Record<MenuKey, { eyebrow: string; title: string; description: string; overviewHref: string; items: MenuItem[] }> = {
  realestate: {
    eyebrow: "Bývanie v Prešove a okolí",
    title: "Nehnuteľnosti",
    description: "Nové developerské projekty a bývanie, ktoré navrhujeme s dôrazom na kvalitu každého detailu.",
    overviewHref: "/nehnutelnosti/",
    items: [
      { title: "Rezidencia Ľubovec", href: "/rezidencia-lubovec/", image: "/wp-content/uploads/2025/09/Fido_LUBOVCE_Byt_prizemie_02_8-scaled-1-750x500.jpg" },
      { title: "Ponuka nehnuteľností", href: "/nehnutelnosti/", image: "/wp-content/uploads/2025/09/Fido_LUBOVCE_Byt_1NP_03_16-1-scaled-1.jpg" },
    ],
  },
  furniture: {
    eyebrow: "Nábytok na mieru",
    title: "Nábytok",
    description: "Precízne riešenia navrhnuté pre váš priestor, štýl a každodenný život.",
    overviewHref: "/sluzby/nabytok-na-mieru/",
    items: [
      { title: "Vstavané skrine", href: "/sluzby/nabytok-na-mieru/vstavane-skrine/", image: "/wp-content/uploads/2025/06/fido-vstavana-skrina-a-01.webp" },
      { title: "Kuchynské linky", href: "/sluzby/nabytok-na-mieru/kuchynske-linky/", image: "/wp-content/uploads/2025/06/fido-kuchyna-c-10.webp" },
      { title: "Postele", href: "/sluzby/nabytok-na-mieru/postele/", image: "/wp-content/uploads/2025/06/fido-postel-01.webp" },
      { title: "Obývacie steny", href: "/sluzby/nabytok-na-mieru/obyvacie-steny/", image: "/wp-content/uploads/2025/06/fido-deco-29.webp" },
      { title: "Komody", href: "/sluzby/nabytok-na-mieru/komody/", image: "/wp-content/uploads/2025/06/fido-nabytok-35.webp" },
      { title: "Šatníky", href: "/sluzby/nabytok-na-mieru/satniky/", image: "/wp-content/uploads/2025/06/fido-vstavana-skrina-a-podlaha-06.webp" },
      { title: "Stoly", href: "/sluzby/nabytok-na-mieru/stoly/", image: "/wp-content/uploads/2025/06/fido-nabytok-02.webp" },
      { title: "Dekoračné panely", href: "/sluzby/nabytok-na-mieru/dekoracne-panely/", image: "/wp-content/uploads/2025/06/fido-deco-30.webp" },
    ],
  },
  windows: {
    eyebrow: "Okná, brány a dvere",
    title: "Otvory pre váš domov",
    description: "Kvalitné okná a dvere s odborným zameraním, dodaním a montážou.",
    overviewHref: "/sluzby/okna-brany-a-dvere/",
    items: [
      { title: "Plastové okná", href: "/sluzby/okna-brany-a-dvere/plastove-okna/", image: "/wp-content/uploads/2025/06/Okna.webp" },
      { title: "Hliníkové okná", href: "/sluzby/okna-brany-a-dvere/hlinikove-okna/", image: "/wp-content/uploads/2025/06/fido-rekonstrukcie-okna-a-dvere-03.webp" },
      { title: "Drevené okná", href: "/sluzby/okna-brany-a-dvere/drevene-okna/", image: "/wp-content/uploads/2025/06/fido-rekonstrukcie-okna-a-dvere-04.webp" },
      { title: "Oceľové okná", href: "/sluzby/okna-brany-a-dvere/ocelove-okna/", image: "/wp-content/uploads/2025/06/fido-rekonstrukcie-okna-a-dvere-05.webp" },
      { title: "Vchodové dvere", href: "/sluzby/okna-brany-a-dvere/vchodove-dvere-hlinikove/", image: "/wp-content/uploads/2025/06/fido-dvere-01.webp" },
      { title: "Posuvné dvere", href: "/sluzby/okna-brany-a-dvere/posuvne-dvere-hlinikove/", image: "/wp-content/uploads/2025/06/fido-dvere-02.webp" },
    ],
  },
  services: {
    eyebrow: "Komplexné riešenia",
    title: "Ďalšie služby",
    description: "Jeden spoľahlivý tím pre rekonštrukciu, výrobu, opravy aj dopravu.",
    overviewHref: "/sluzby/",
    items: [
      { title: "Rekonštrukcie", href: "/sluzby/rekonstrukcie-domov-a-bytov/", image: "/wp-content/uploads/2025/06/fido-rekonstrukcia-chaty-02.webp" },
      { title: "Zámočníctvo", href: "/sluzby/zamocnictvo/", image: "/wp-content/uploads/2025/06/fido-zamocnictvo.webp" },
      { title: "Strojárstvo", href: "/sluzby/strojarstvo/", image: "/wp-content/uploads/2025/06/fido-deco-01.webp" },
      { title: "Hodinový manžel", href: "/sluzby/hodinovy-manzel/", image: "/wp-content/uploads/2025/06/fido-rekonstrukcia-priestorov-01.webp" },
      { title: "Doprava", href: "/sluzby/doprava/", image: "/wp-content/uploads/2025/06/fido-shake-theory-27.webp" },
      { title: "Požičovňa náradia", href: "/sluzby/pozicovna-naradia/", image: "/wp-content/uploads/2025/06/fido-shake-theory-44.webp" },
    ],
  },
};

const triggerIds: Record<string, MenuKey> = {
  "menu-item-881": "realestate",
  "menu-item-116": "furniture",
  "menu-item-143": "windows",
  "menu-item-122": "services",
};

export function SiteEnhancements() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [cursor, setCursor] = useState({ visible: false, x: 0, y: 0, text: "Detail služby" });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(key);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    const enhanceSnapshot = () => {
      Object.entries(triggerIds).forEach(([id, key]) => {
        const item = document.getElementById(id);
        const anchor = item?.querySelector<HTMLAnchorElement>(":scope > a");
        if (!item || !anchor || item.dataset.fidoMenuEnhanced) return;
        item.dataset.fidoMenuEnhanced = "true";
        item.classList.add("fido-mega-trigger");
        anchor.querySelector(".oxy-pro-menu-dropdown-icon-click-area")?.remove();
        if (!anchor.querySelector(".fido-nav-caret")) {
          const caret = document.createElement("span");
          caret.className = "fido-nav-caret";
          caret.setAttribute("aria-hidden", "true");
          anchor.appendChild(caret);
        }
        const enter = () => openMenu(key);
        const leave = () => scheduleClose();
        item.addEventListener("mouseenter", enter);
        item.addEventListener("mouseleave", leave);
        anchor.addEventListener("focus", enter);
        cleanups.push(() => {
          item.removeEventListener("mouseenter", enter);
          item.removeEventListener("mouseleave", leave);
          anchor.removeEventListener("focus", enter);
        });
      });

      const cards = Array.from(
        document.querySelectorAll<HTMLElement>(
          '[data-id="div_block-55-72"], [data-id="div_block-65-62"], .card-sluzba-wrap',
        ),
      );

      cards.forEach((card) => {
        if (card.dataset.fidoCardEnhanced) return;
        const link = card.querySelector<HTMLAnchorElement>('a[href]:not([href="#"])');
        if (!link) return;
        card.dataset.fidoCardEnhanced = "true";
        card.classList.add("fido-clickable-card");
        card.tabIndex = 0;
        card.setAttribute("role", "link");
        
        const isProject = card.classList.contains("card-project") || 
                          card.getAttribute("data-id") === "div_block-65-62" || 
                          card.getAttribute("data-id") === "div_block-110-67";
        const cursorText = isProject ? "Detail projektu" : "Detail služby";

        const click = (event: MouseEvent) => {
          if ((event.target as Element).closest("a, button")) return;
          window.location.href = link.href;
        };
        const keydown = (event: KeyboardEvent) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            window.location.href = link.href;
          }
        };
        const move = (event: MouseEvent) => setCursor({ visible: true, x: event.clientX, y: event.clientY, text: cursorText });
        const leave = () => setCursor((current) => ({ ...current, visible: false, text: cursorText }));
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

      // Handle contact form submissions
      const forms = Array.from(document.querySelectorAll<HTMLFormElement>("#wpforms-form-177, #wpforms-form-713"));
      forms.forEach((form) => {
        if (form.dataset.fidoFormEnhanced) return;
        form.dataset.fidoFormEnhanced = "true";

        const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"], input[type="submit"]');
        const originalButtonText = submitButton?.textContent || "Odoslať";

        const submitHandler = async (e: Event) => {
          e.preventDefault();

          if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Odosiela sa...";
          }

          try {
            const formData = new FormData(form);
            const response = await fetch("/api/contact", {
              method: "POST",
              body: formData,
            });

            const result = await response.json();

            if (result.success) {
              // Hide the form fields and show success message
              const container = form.closest(".wpforms-container") || form;
              container.innerHTML = `
                <div class="fido-form-success" style="text-align: center; padding: 40px 20px; border-radius: 12px; border: 1px solid rgba(224, 148, 93, 0.2); background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);">
                  <div style="font-size: 48px; color: #e0945d; margin-bottom: 20px;">✓</div>
                  <h3 style="color: inherit; font-size: 20px; margin-bottom: 12px; font-family: 'IBM Plex Sans', sans-serif; font-weight: 600;">Správa bola úspešne odoslaná</h3>
                  <p style="opacity: 0.8; font-size: 15px; margin: 0; line-height: 1.6; font-family: 'Inter', sans-serif;">Ďakujeme za váš záujem. Naši pracovníci sa vám ozvú čo najskôr na zadané kontaktné údaje.</p>
                </div>
              `;
            } else {
              throw new Error(result.error || "Odoslanie zlyhalo");
            }
          } catch (error) {
            console.error("Form submission error:", error);
            alert("Ospravedlňujeme sa, ale odoslanie zlyhalo. Skontrolujte pripojenie a skúste to znova, alebo nás kontaktujte priamo telefonicky.");
            if (submitButton) {
              submitButton.disabled = false;
              submitButton.textContent = originalButtonText;
            }
          }
        };

        form.addEventListener("submit", submitHandler);
        cleanups.push(() => {
          form.removeEventListener("submit", submitHandler);
        });
      });
    };

    enhanceSnapshot();
    const observer = new MutationObserver(enhanceSnapshot);
    observer.observe(document.body, { childList: true, subtree: true });
    cleanups.push(() => observer.disconnect());

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMenu(null);
    };
    const delegatedHover = (event: MouseEvent) => {
      const item = (event.target as Element | null)?.closest<HTMLElement>("#menu-item-881, #menu-item-116, #menu-item-143, #menu-item-122");
      if (!item) return;
      const key = triggerIds[item.id];
      if (key) openMenu(key);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mouseover", delegatedHover, true);
    cleanups.push(() => document.removeEventListener("keydown", closeOnEscape));
    cleanups.push(() => document.removeEventListener("mouseover", delegatedHover, true));

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <>
      {(Object.entries(menus) as Array<[MenuKey, (typeof menus)[MenuKey]]>).map(([key, menu]) => (
        <div
          key={key}
          className={`fido-mega-menu fido-menu-${key} ${activeMenu === key ? "is-open" : ""}`}
          onMouseEnter={() => openMenu(key)}
          onMouseLeave={scheduleClose}
          aria-hidden={activeMenu !== key}
        >
          <div className="fido-mega-inner">
            <div className="fido-mega-intro">
              <p>{menu.eyebrow}</p>
              <h2>{menu.title}</h2>
              <span>{menu.description}</span>
              <a href={menu.overviewHref}>
                Zobraziť všetko <ChevronRight size={17} />
              </a>
            </div>
            <div className="fido-mega-grid">
              {menu.items.map((item) => (
                <a href={item.href} className="fido-mega-tile" key={item.href}>
                  <img src={item.image} alt="" />
                  <span>{item.title}</span>
                </a>
              ))}
            </div>
            <a className="fido-mega-cta" href="/kontakt/">
              <strong>Potrebujete poradiť?</strong>
              <span>Ozvite sa k montáži, zameraniu alebo návrhu riešenia.</span>
              <b>Prejsť na kontakt <ChevronRight size={18} /></b>
            </a>
          </div>
        </div>
      ))}
      <div
        className={`fido-card-cursor ${cursor.visible ? "is-visible" : ""}`}
        style={{ transform: `translate3d(${cursor.x + 14}px, ${cursor.y + 14}px, 0)` }}
      >
        {cursor.text}
      </div>
    </>
  );
}
