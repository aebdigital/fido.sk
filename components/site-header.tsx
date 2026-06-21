"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { megaMenus, primaryNavigation, siteConfig, type MegaMenuKey } from "@/config/site";

function isActive(pathname: string, href: string) {
  if (href === "/realizacie/") return pathname.startsWith("/realizacie/") || pathname.startsWith("/kategorie_realizacie/");
  if (href === "/nehnutelnosti/") return pathname === href || pathname.startsWith("/nehnutelnost/") || pathname === "/rezidencia-lubovec/";
  if (href === "/sluzby/") return pathname === href || (pathname.startsWith("/sluzby/") && !pathname.startsWith("/sluzby/nabytok-na-mieru/") && !pathname.startsWith("/sluzby/okna-brany-a-dvere/"));
  return pathname === href || pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<MegaMenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MegaMenuKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  const openMegaMenu = (menu: MegaMenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(menu);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSection(null);
  };

  return (
    <>
      <header className="fido-react-header" onMouseLeave={scheduleClose}>
        <div className="fido-react-header-inner">
          <Link className="fido-react-logo" href="/" aria-label="FIDO domov">
            <Image src={siteConfig.logo} alt="FIDO" width={110} height={44} priority />
          </Link>

          <nav className="fido-react-nav" aria-label="Hlavná navigácia">
            {primaryNavigation.map((item) => (
              <div className="fido-react-nav-item" key={item.href} onMouseEnter={() => item.menu && openMegaMenu(item.menu)}>
                <Link className={isActive(pathname, item.href) ? "is-active" : ""} href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                  {item.label}
                  {item.menu ? <ChevronDown aria-hidden="true" size={15} /> : null}
                </Link>
              </div>
            ))}
          </nav>

          <Link className="fido-react-header-cta" href="/kontakt/">Nezáväzná ponuka</Link>
          <button className="fido-react-mobile-toggle" type="button" onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen} aria-controls="fido-mobile-navigation" aria-label={mobileOpen ? "Zavrieť menu" : "Otvoriť menu"}>
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        <nav id="fido-mobile-navigation" className={`fido-react-mobile-nav ${mobileOpen ? "is-open" : ""}`} aria-label="Mobilná navigácia">
          {primaryNavigation.map((item) => (
            <div className="fido-react-mobile-item" key={item.href}>
              <div className="fido-react-mobile-row">
                <Link href={item.href} onClick={closeMobile}>{item.label}</Link>
                {item.menu ? (
                  <button type="button" onClick={() => setMobileSection((current) => current === item.menu ? null : item.menu!)} aria-expanded={mobileSection === item.menu} aria-label={`Rozbaliť ${item.label}`}>
                    <ChevronDown aria-hidden="true" size={18} />
                  </button>
                ) : null}
              </div>
              {item.menu && mobileSection === item.menu ? (
                <div className="fido-react-mobile-submenu">
                  {megaMenus[item.menu].items.map((subItem) => (
                    <Link href={subItem.href} onClick={closeMobile} key={subItem.href}>{subItem.label}</Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <Link className="fido-react-mobile-cta" href="/kontakt/" onClick={closeMobile}>Nezáväzná ponuka</Link>
        </nav>
      </header>

      {(Object.entries(megaMenus) as Array<[MegaMenuKey, (typeof megaMenus)[MegaMenuKey]]>).map(([key, menu]) => (
        <div key={key} className={`fido-mega-menu fido-menu-${key} ${activeMenu === key ? "is-open" : ""}`} onMouseEnter={() => openMegaMenu(key)} onMouseLeave={scheduleClose} aria-hidden={activeMenu !== key}>
          <div className="fido-mega-inner">
            <div className="fido-mega-intro">
              <p>{menu.eyebrow}</p>
              <h2>{menu.title}</h2>
              <span>{menu.description}</span>
              <Link href={menu.overviewHref} onClick={() => setActiveMenu(null)}>Zobraziť všetko <ChevronRight aria-hidden="true" size={17} /></Link>
            </div>
            <div className="fido-mega-grid">
              {menu.items.map((item) => (
                <Link href={item.href} className="fido-mega-tile" key={item.href} onClick={() => setActiveMenu(null)}>
                  <Image src={item.image} alt="" fill sizes="(min-width: 1120px) 16vw, 1px" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            <Link className="fido-mega-cta" href="/kontakt/" onClick={() => setActiveMenu(null)}>
              <strong>Potrebujete poradiť?</strong>
              <span>Ozvite sa k montáži, zameraniu alebo návrhu riešenia.</span>
              <b>Prejsť na kontakt <ChevronRight aria-hidden="true" size={18} /></b>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
