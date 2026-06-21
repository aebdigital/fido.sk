import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { footerNavigation, footerServiceLinks, siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer id="section-63-27" className="ct-section fido-site-footer">
      <div className="ct-section-inner-wrap">
        <div id="div_block-64-27" className="ct-div-block">
          <div id="div_block-65-27" className="ct-div-block">
            <div id="text_block-69-27" className="ct-text-block h2">Kontaktujte nás ešte dnes</div>
            <Link id="link_button-67-27" className="ct-link-button btn-secondary" href="/kontakt/">
              Nezáväzná ponuka
            </Link>
          </div>

          <div id="new_columns-71-27" className="ct-new-columns">
            <div id="div_block-72-27" className="ct-div-block">
              <Link id="link-156-27" className="ct-link" href="/" aria-label="FIDO domov">
                <Image id="image-76-27" src={siteConfig.logo} alt="FIDO" width={240} height={96} />
              </Link>
              <div id="text_block-78-27" className="ct-text-block footer-h3">O firme</div>
              <div id="text_block-81-27" className="ct-text-block text-m">{siteConfig.description}</div>
            </div>

            <div id="div_block-82-27" className="ct-div-block">
              <div id="text_block-84-27" className="ct-text-block footer-h3">Služby</div>
              <nav id="div_block-109-27" aria-label="Služby">
                {footerServiceLinks.map((item) => (
                  <Link className="ct-link-text footer-link" href={item.href} key={item.href}>{item.label}</Link>
                ))}
              </nav>
            </div>

            <div id="div_block-86-27" className="ct-div-block">
              <div id="text_block-88-27" className="ct-text-block footer-h3">Navigácia</div>
              <nav id="div_block-100-27" aria-label="Pätička">
                {footerNavigation.map((item) => (
                  <Link className="ct-link-text footer-link" href={item.href} key={item.href}>{item.label}</Link>
                ))}
                <button type="button" className="footer-link fido-cookie-settings" data-cookie-settings>
                  Nastavenia cookies
                </button>
              </nav>
            </div>

            <div id="div_block-90-27" className="ct-div-block">
              <div id="text_block-92-27" className="ct-text-block footer-h3">Kontaktné údaje</div>
              <div id="div_block-119-27" className="ct-div-block">
                <a className="ct-link btn-contact footer-link-text" href={siteConfig.phoneHref}>
                  <Phone aria-hidden="true" size={18} />
                  <span>{siteConfig.phoneDisplay}</span>
                </a>
                <a className="ct-link btn-contact footer-link-text" href={`mailto:${siteConfig.email}`}>
                  <Mail aria-hidden="true" size={18} />
                  <span>{siteConfig.email}</span>
                </a>
              </div>
              <div id="text_block-131-27" className="ct-text-block footer-h3">Sledujte nás</div>
              <div id="div_block-157-27" className="ct-div-block social_icon_wrap">
                <a className="ct-link social_icon" href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram aria-hidden="true" size={20} />
                </a>
                <a className="ct-link social_icon" href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook aria-hidden="true" size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div id="div_block-138-27" className="ct-div-block">
          <div id="text_block-139-27" className="ct-text-block text-m-semi-bold">© {new Date().getFullYear()} FIDO. Všetky práva vyhradené.</div>
          <Link className="ct-link-text footer-link" href="/ochrana-osobnych-udajov/">Ochrana osobných údajov</Link>
        </div>
      </div>
    </footer>
  );
}
