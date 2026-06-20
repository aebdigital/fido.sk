import type { NativePage } from "@/lib/native-page";
import { GoogleReviews } from "@/components/google-reviews";
import { getGoogleReviews } from "@/lib/google-reviews";
import { posts, featuredImage, plainText } from "@/lib/site-data";

const reviewsSectionPattern = /<section id="section-399-32"[\s\S]*?<\/section>/i;

const partnerLogos = [
  { name: "Eko-Okna", image: "/partners/eko-okna.svg", url: "https://ekookna-slovensko.sk/" },
  { name: "Matrace Lema", image: "/partners/matrace-lema.webp", url: "https://matracelema.sk/" },
  { name: "Atvyn", image: "/partners/atvyn.svg", url: "https://atvyn.sk/" },
  { name: "MP Kovania", image: "/partners/mp-kovania.svg", url: "https://www.mp-kovania.sk/" },
  { name: "Insempre", image: "/partners/insempre.webp", url: "https://insempre.sk/" },
  { name: "Synlab", image: "/partners/synlab.webp", url: "https://www.synlab.sk/" },
  { name: "ST Vol", image: "/partners/st-vol.webp", url: "https://www.stvol.sk/" },
  { name: "Auto PO", image: "/partners/auto-po.webp", url: "https://www.autopo.sk/" },
  { name: "Shamira", image: "/partners/shamira.webp", url: "https://shamira.webnode.sk/" },
  { name: "Garett", image: "/partners/garret.webp", url: "https://garett.eu/" },
  { name: "ADLER", image: "/partners/adler.svg", url: "https://adler.sk/" },
  { name: "Amfiteáter Prešov", image: "/partners/amfiteaterpresov.svg", url: "https://amfiteaterpresov.sk/", bg: "#000000" },
  { name: "Blum", image: "/partners/blum.svg", url: "https://blum.com/" },
  { name: "DAH", image: "/partners/dah.png", url: "https://dah.sk/", bg: "#1555a0" },
  { name: "Demos Trade", image: "/partners/demos-trade.png", url: "https://demos-trade.sk/" },
  { name: "IMT Smile", image: "/partners/imtsmile.png", url: "https://imtsmile.com/" },
  { name: "Kipech", image: "/partners/kipech.png", url: "https://kipech.sk/" },
];

function generatePartnersHtml() {
  const logosHtml = partnerLogos.map((logo) => {
    const imgHtml = `<img src="${logo.image}" alt="${logo.name}" class="slider-logo-img" style="height: 38px; width: auto; object-fit: contain; max-width: 130px; transition: all 0.3s ease; display: block;" />`;
    
    if (logo.url) {
      if (logo.bg) {
        return `
          <a href="${logo.url}" target="_blank" rel="noopener noreferrer" class="fido-home-logo-link" style="display: inline-flex; align-items: center; justify-content: center; margin: 10px 15px; transition: all 0.3s ease; background-color: ${logo.bg}; padding: 8px; border-radius: 6px;">
            ${imgHtml}
          </a>
        `;
      }
      return `
        <a href="${logo.url}" target="_blank" rel="noopener noreferrer" class="fido-home-logo-link" style="display: inline-flex; align-items: center; justify-content: center; margin: 10px 15px; transition: all 0.3s ease;">
          ${imgHtml}
        </a>
      `;
    }
    
    if (logo.bg) {
      return `
        <div class="fido-home-logo-link" style="display: inline-flex; align-items: center; justify-content: center; margin: 10px 15px; background-color: ${logo.bg}; padding: 8px; border-radius: 6px;">
          ${imgHtml}
        </div>
      `;
    }
    return `
      <div class="fido-home-logo-link" style="display: inline-flex; align-items: center; justify-content: center; margin: 10px 15px;">
        ${imgHtml}
      </div>
    `;
  }).join("");

  return `
    <section id="partneri" class="ct-section section-width fido-partners-section">
      <div class="ct-section-inner-wrap">
        <div class="fido-partners-header">
          <p class="fido-partners-kicker">Partneri</p>
          <h2 class="fido-partners-title">Spolupracujeme s renomovanými partnermi</h2>
        </div>
        <div class="fido-home-partners-container mt-10" style="display: flex !important; flex-direction: row !important; flex-wrap: wrap !important; align-items: center !important; justify-content: center !important; padding: 20px 0 !important; width: 100% !important;">
          ${logosHtml}
        </div>
      </div>
    </section>
  `;
}

function generateHomePartnersHtml() {
  const logosHtml = partnerLogos.map((logo) => {
    const imgHtml = `<img src="${logo.image}" alt="${logo.name}" class="slider-logo-img" style="height: 38px; width: auto; object-fit: contain; max-width: 130px; transition: all 0.3s ease; display: block;" />`;
    
    if (logo.url) {
      if (logo.bg) {
        return `
          <a href="${logo.url}" target="_blank" rel="noopener noreferrer" class="fido-home-logo-link" style="display: inline-flex; align-items: center; justify-content: center; margin: 10px 15px; transition: all 0.3s ease; background-color: ${logo.bg}; padding: 8px; border-radius: 6px;">
            ${imgHtml}
          </a>
        `;
      }
      return `
        <a href="${logo.url}" target="_blank" rel="noopener noreferrer" class="fido-home-logo-link" style="display: inline-flex; align-items: center; justify-content: center; margin: 10px 15px; transition: all 0.3s ease;">
          ${imgHtml}
        </a>
      `;
    }
    
    if (logo.bg) {
      return `
        <div class="fido-home-logo-link" style="display: inline-flex; align-items: center; justify-content: center; margin: 10px 15px; background-color: ${logo.bg}; padding: 8px; border-radius: 6px;">
          ${imgHtml}
        </div>
      `;
    }
    return `
      <div class="fido-home-logo-link" style="display: inline-flex; align-items: center; justify-content: center; margin: 10px 15px;">
        ${imgHtml}
      </div>
    `;
  }).join("");

  return `
    <div id="div_block-627-32" class="ct-div-block fido-home-partners-block">
      <div class="fido-partners-header fido-home-partners-header">
        <p class="fido-partners-kicker">Partneri</p>
        <h2 class="fido-partners-title">Spolupracujeme s renomovanými partnermi</h2>
      </div>
      <div class="fido-home-partners-container" style="display: flex !important; flex-direction: row !important; flex-wrap: wrap !important; align-items: center !important; justify-content: center !important; padding: 20px 0 !important; width: 100% !important;">
        ${logosHtml}
      </div>
    </div>
  `;
}

function enhanceContactHtml(bodyHtml: string) {
  const slavomirCardHtml = `
<div class="fido-contact-people-row">
<div id="div_block-17-50" class="ct-div-block fido-contact-person-card">
  <img src="/wp-content/uploads/2025/06/fido-team.webp" alt="Slavomír Kamenčík" class="fido-contact-person-img" />
  <div class="fido-contact-person-info">
    <div class="fido-contact-person-role">Konateľ</div>
    <h2 id="headline-10-50" class="ct-headline h6">Slavomír Kamenčík</h2>
    <div class="fido-contact-person-links">
      <a id="link-18-50" class="ct-link btn-contact-main" href="tel:0917617202" target="_blank" rel="nofollow" role="button">
        <div id="fancy_icon-19-50" class="ct-fancy-icon btn-contact-main-icon"><svg id="svg-fancy_icon-19-50"><use xlink:href="#Iconmoonicon-phone"></use></svg></div>
        <div id="text_block-20-50" class="ct-text-block oxel_icon_button_text">+421 917 617 202</div>
      </a>
      <a id="link-21-50" class="ct-link btn-contact-main" href="mailto:fidopo@gmail.com" target="_blank" rel="nofollow" role="button">
        <div id="fancy_icon-22-50" class="ct-fancy-icon btn-contact-main-icon"><svg id="svg-fancy_icon-22-50"><use xlink:href="#FontAwesomeicon-envelope-o"></use></svg></div>
        <div id="text_block-23-50" class="ct-text-block oxel_icon_button_text">fidopo@gmail.com</div>
      </a>
    </div>
  </div>
</div>
  `;

  const detailsHtml = `
<div id="div_block-56-50" class="ct-div-block">
  <div id="div_block-57-50" class="ct-div-block card-bits">
    <h2 id="headline-67-50" class="ct-headline card-bits-subtitle">Adresa</h2>
    <div id="text_block-59-50" class="ct-text-block card-bits-text">Strojnícka 9, 080 06 Prešov-Priemyselný obvod Nižná Šebastová</div>
  </div>
  <div id="div_block-72-50" class="ct-div-block card-bits">
    <h2 id="headline-73-50" class="ct-headline card-bits-subtitle">Pracovné hodiny</h2>
    <div id="text_block-74-50" class="ct-text-block card-bits-text">Strojárska výroba a skladové priestory<br>08:00 AM - 16:00 PM<br>Pondelok - Piatok</div>
  </div>
  <div id="div_block-75-50" class="ct-div-block card-bits">
    <h2 id="headline-76-50" class="ct-headline card-bits-subtitle">Fakturačne údaje</h2>
    <div id="text_block-77-50" class="ct-text-block card-bits-text">FIDO s.r.o.<br>IČO: 48110965<br>DIČ: 2120049096<br>IČ DPH: SK2120049096<br>Okr. súd {PO}, odd. SRO, vl č {31364/P}<br>Floriánová 6, Prešov 080 01</div>
  </div>
  <div id="div_block-78-50" class="ct-div-block card-bits">
    <h2 id="headline-79-50" class="ct-headline card-bits-subtitle">Bankové spojenie</h2>
    <div id="text_block-80-50" class="ct-text-block card-bits-text">Banka: Tatra Banka<br>Kód banky: 1100<br>IBAN: SK64 1100 0000 0029 4409 0778<br>SWIFT: TATRSKBX</div>
  </div>
</div>
  `;

  const marcoCardHtml = `
<div id="div_block-29-50" class="ct-div-block fido-contact-person-card">
  <img src="/wp-content/uploads/2025/06/fido-shake-theory-39.webp" alt="Marco Kamenčík" class="fido-contact-person-img" />
  <div class="fido-contact-person-info">
    <div class="fido-contact-person-role">Riaditeľ</div>
    <h2 id="headline-30-50" class="ct-headline h6">Marco Kamenčík</h2>
    <div class="fido-contact-person-links">
      <a id="link-31-50" class="ct-link btn-contact-main" href="tel:0950598859" target="_blank" rel="nofollow" role="button">
        <div id="fancy_icon-32-50" class="ct-fancy-icon btn-contact-main-icon"><svg id="svg-fancy_icon-32-50"><use xlink:href="#Iconmoonicon-phone"></use></svg></div>
        <div id="text_block-33-50" class="ct-text-block oxel_icon_button_text">+421 950 598 859</div>
      </a>
      <a id="link-34-50" class="ct-link btn-contact-main" href="mailto:kontakt@fido.sk" target="_blank" rel="nofollow" role="button">
        <div id="fancy_icon-35-50" class="ct-fancy-icon btn-contact-main-icon"><svg id="svg-fancy_icon-35-50"><use xlink:href="#FontAwesomeicon-envelope-o"></use></svg></div>
        <div id="text_block-36-50" class="ct-text-block oxel_icon_button_text">kontakt@fido.sk</div>
      </a>
    </div>
  </div>
</div>
</div>
  `;

  return bodyHtml
    .replace(/<div id="div_block-6-50"[\s\S]*?<\/div>/i, "")
    .replace(/\s+wpforms-smart-phone-field/g, "")
    .replace(/\s+data-rule-smart-phone-field="true"/g, "")
    .replace(
      /<section id="section-88-50"[\s\S]*?<\/section>/i,
      `<section id="section-88-50" class="ct-section section-width fido-contact-map"><div class="ct-section-inner-wrap"><iframe title="FIDO s.r.o. na Google Maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5232.7147862604625!2d21.264671499999995!3d49.02280929999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473eed54a7c9451d%3A0xa1ab21ec4b69884e!2zU3Ryb2puw61ja2EgOSwgMDgwIDA2IFByZcWhb3YtUHJpZW15c2VsbsO9IG9idm9kIE5pxb5uw6EgxaBlYmFzdG92w6EsIFNsb3ZlbnNrbw!5e0!3m2!1ssk!2sbe!4v1750358793752!5m2!1ssk!2sbe" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div></section>`,
    )
    .replace(
      /<div id="div_block-17-50" class="ct-div-block" >[\s\S]*?fidopo@gmail\.com<\/div><\/a><\/div>/i,
      slavomirCardHtml
    )
    .replace(
      /<div id="div_block-29-50" class="ct-div-block" >[\s\S]*?kontakt@fido\.sk<\/div><\/a><\/div>/i,
      marcoCardHtml + detailsHtml
    )
    .replace(/<section id="section-54-50"[\s\S]*?<\/section>/i, "")
    .replace(
      /<div id="wpforms-177-field_11-container"[\s\S]*?<\/div>/i,
      `<div id="wpforms-177-field_11-container" class="wpforms-field wpforms-field-select" data-field-id="11">` +
      `<label class="wpforms-field-label" for="wpforms-177-field_11">Predmet</label>` +
      `<select id="wpforms-177-field_11" class="wpforms-field-medium" name="wpforms[fields][11]">` +
      `<option value="Nehnuteľnosti">Nehnuteľnosti</option>` +
      `<option value="Okná, Brány a Dvere">Okná, Brány a Dvere</option>` +
      `<option value="Nábytok">Nábytok</option>` +
      `</select>` +
      `</div>`
    )
    .replace(
      /<h3 id="headline-108-50" class="ct-headline h6">Odoslať správu<\/h3>/i,
      `<h3 id="headline-108-50" class="ct-headline h6">Máte otázky?<span class="fido-contact-form-subtitle">Vyplňte krátky formulár a ozveme sa Vám čo najskôr</span></h3>`
    );
}

const serviceBoxesHtml = `
<li id="menu-item-119" class="mega-service-box">
  <a href="/sluzby/rekonstrukcie-domov-a-bytov/">
    <div class="mega-service-icon">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
    </div>
    <div class="mega-service-details">
      <span class="mega-service-title">Rekonštrukcie domov a bytov</span>
      <span class="mega-service-desc">Stavebné úpravy, prerábky a realizácie na kľúč</span>
    </div>
  </a>
</li>
<li id="menu-item-142" class="mega-service-box">
  <a href="/sluzby/zamocnictvo/">
    <div class="mega-service-icon">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
    </div>
    <div class="mega-service-details">
      <span class="mega-service-title">Zámočníctvo</span>
      <span class="mega-service-desc">Brány, ploty, zábradlia a kovové konštrukcie</span>
    </div>
  </a>
</li>
<li id="menu-item-141" class="mega-service-box">
  <a href="/sluzby/strojarstvo/">
    <div class="mega-service-icon">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
    </div>
    <div class="mega-service-details">
      <span class="mega-service-title">Strojárstvo</span>
      <span class="mega-service-desc">Presné kovoobrábanie, sústruženie a frézovanie</span>
    </div>
  </a>
</li>
<li id="menu-item-140" class="mega-service-box">
  <a href="/sluzby/hodinovy-manzel/">
    <div class="mega-service-icon">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
    </div>
    <div class="mega-service-details">
      <span class="mega-service-title">Hodinový manžel</span>
      <span class="mega-service-desc">Drobné opravy v domácnosti, montáž a údržba</span>
    </div>
  </a>
</li>
<li id="menu-item-138" class="mega-service-box">
  <a href="/sluzby/doprava/">
    <div class="mega-service-icon">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
    </div>
    <div class="mega-service-details">
      <span class="mega-service-title">Doprava</span>
      <span class="mega-service-desc">Nákladná preprava materiálu a tovaru s vykládkou</span>
    </div>
  </a>
</li>
<li id="menu-item-139" class="mega-service-box">
  <a href="/sluzby/pozicovna-naradia/">
    <div class="mega-service-icon">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
    </div>
    <div class="mega-service-details">
      <span class="mega-service-title">Požičovňa náradia</span>
      <span class="mega-service-desc">Profesionálne stavebné stroje a náradie na prenájom</span>
    </div>
  </a>
</li>
<li class="mega-menu-featured">
  <a href="/realizacie/">
    <div class="mega-featured-bg" style="background-image: url('/wp-content/uploads/2025/06/fido-rekonstrukcia-chaty-02.webp');"></div>
    <div class="mega-featured-content">
      <span class="mega-featured-kicker">FIDO Realizácie</span>
      <span class="mega-featured-title">Pozrite si naše dokončené projekty</span>
    </div>
  </a>
</li>
`;

const furnitureBoxesHtml = `
<li id="menu-item-furniture-kuchyne" class="mega-service-box">
  <a href="/sluzby/nabytok-na-mieru/kuchynske-linky/">
    <div class="mega-service-icon">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2" ry="2"></rect><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><circle cx="9" cy="6" r="1"></circle><circle cx="15" cy="6" r="1"></circle></svg>
    </div>
    <div class="mega-service-details">
      <span class="mega-service-title">Kuchynské linky</span>
      <span class="mega-service-desc">Ergonomické kuchyne na mieru s maximálnym využitím priestoru</span>
    </div>
  </a>
</li>
<li id="menu-item-furniture-vstavane" class="mega-service-box">
  <a href="/sluzby/nabytok-na-mieru/vstavane-skrine/">
    <div class="mega-service-icon">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line><path d="M6 9h0M6 15h0M12 9h0M12 15h0M18 9h0M18 15h0"></path></svg>
    </div>
    <div class="mega-service-details">
      <span class="mega-service-title">Vstavané skrine</span>
      <span class="mega-service-desc">Moderné a praktické úložné riešenia do každej izby</span>
    </div>
  </a>
</li>
<li id="menu-item-furniture-satniky" class="mega-service-box">
  <a href="/sluzby/nabytok-na-mieru/satniky/">
    <div class="mega-service-icon">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3c0 .8.4 1.5 1 2L3.6 15.6a2 2 0 0 0 1.4 3.4h14a2 2 0 0 0 1.4-3.4L14 7c.6-.5 1-1.2 1-2a3 3 0 0 0-3-3z"></path></svg>
    </div>
    <div class="mega-service-details">
      <span class="mega-service-title">Šatníky</span>
      <span class="mega-service-desc">Samostatné šatníkové systémy a veľkorysé úložné priestory</span>
    </div>
  </a>
</li>
<li id="menu-item-furniture-postele" class="mega-service-box">
  <a href="/sluzby/nabytok-na-mieru/postele/">
    <div class="mega-service-icon">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"></path><path d="M3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"></path><path d="M7 11h10M7 15h10"></path></svg>
    </div>
    <div class="mega-service-details">
      <span class="mega-service-title">Postele</span>
      <span class="mega-service-desc">Pohodlné čalúnené aj drevené postele pre zdravý spánok</span>
    </div>
  </a>
</li>
<li id="menu-item-furniture-obyvacie" class="mega-service-box">
  <a href="/sluzby/nabytok-na-mieru/obyvacie-steny/">
    <div class="mega-service-icon">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
    </div>
    <div class="mega-service-details">
      <span class="mega-service-title">Obývacie steny</span>
      <span class="mega-service-desc">Elegantné a dizajnové zostavy pre moderné obývačky</span>
    </div>
  </a>
</li>
<li id="menu-item-furniture-stoly" class="mega-service-box">
  <a href="/sluzby/nabytok-na-mieru/stoly/">
    <div class="mega-service-icon">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v4H3zM4 7v14M20 7v14M8 7v7M16 7v7"></path></svg>
    </div>
    <div class="mega-service-details">
      <span class="mega-service-title">Stoly</span>
      <span class="mega-service-desc">Jedálenské, konferenčné a pracovné stoly na mieru</span>
    </div>
  </a>
</li>
<li id="menu-item-furniture-komody" class="mega-service-box">
  <a href="/sluzby/nabytok-na-mieru/komody/">
    <div class="mega-service-icon">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><circle cx="12" cy="6" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="18" r="1"></circle></svg>
    </div>
    <div class="mega-service-details">
      <span class="mega-service-title">Komody</span>
      <span class="mega-service-desc">Praktické zásuvkové skrinky prispôsobené vášmu interiéru</span>
    </div>
  </a>
</li>
<li id="menu-item-furniture-panely" class="mega-service-box">
  <a href="/sluzby/nabytok-na-mieru/dekoracne-panely/">
    <div class="mega-service-icon">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
    </div>
    <div class="mega-service-details">
      <span class="mega-service-title">Dekoračné panely</span>
      <span class="mega-service-desc">Dizajnové drevené obklady a lamelové steny</span>
    </div>
  </a>
</li>
<li class="mega-menu-featured">
  <a href="/sluzby/nabytok-na-mieru/">
    <div class="mega-featured-bg" style="background-image: url('/wp-content/uploads/2025/06/fido-nabytok-35.webp');"></div>
    <div class="mega-featured-content">
      <span class="mega-featured-kicker">Nábytok FIDO</span>
      <span class="mega-featured-title">Pozrite si ponuku nábytku na mieru</span>
    </div>
  </a>
</li>
`;

const postupSectionPattern = /<section id="section-264-72"[\s\S]*?<\/section>/i;

function generatePostupHtml() {
  const postupSteps = [
    {
      num: "01",
      title: "Poradenstvo",
      desc: "Pomôžeme vám s výberom vhodných materiálov, optimálnych rozmerov a technických riešení na mieru pre váš domov.",
      image: "/postup/poradenstvo.webp",
    },
    {
      num: "02",
      title: "Zameranie",
      desc: "Pred samotnou výrobou zameriame priestor s maximálnou presnosťou, aby sme zaistili dokonalé osadenie bez komplikácií.",
      image: "/postup/zameranie.webp",
    },
    {
      num: "03",
      title: "Návrh na mieru",
      desc: "Pripravíme vizualizáciu a technický návrh podľa vašich predstáv, čím premeníme prvotnú ideu na skutočnosť.",
      image: "/postup/vyroba.webp",
    },
    {
      num: "04",
      title: "Montáž",
      desc: "Zabezpečíme šetrnú dopravu, profesionálne osadenie a čisté dokončenie všetkých detailov na mieste.",
      image: "/postup/montaz.webp",
    },
  ];

  const stepsHtml = postupSteps.map((step) => `
    <div class="fido-postup-card">
      <div class="fido-postup-image-wrapper">
        <img src="${step.image}" alt="${step.title}" class="fido-postup-image" loading="lazy" />
      </div>
      <div class="fido-postup-number">${step.num}</div>
      <div class="fido-postup-content">
        <h3 class="fido-postup-card-title">${step.title}</h3>
        <p class="fido-postup-card-desc">${step.desc}</p>
      </div>
    </div>
  `).join("");

  return `
    <section id="ako-pracujeme" class="ct-section section-width fido-postup-section">
      <div class="ct-section-inner-wrap">
        <div class="fido-postup-header">
          <span class="fido-postup-kicker">Postup pri výrobe</span>
          <h2 class="fido-postup-title">Ako pracujeme</h2>
          <p class="fido-postup-description">
            Prevedieme vás celým procesom od úvodnej konzultácie až po finálne osadenie u vás doma. Naším cieľom je maximálna kvalita a vaša bezstarostnosť.
          </p>
        </div>
        <div class="fido-postup-grid">
          ${stepsHtml}
        </div>
      </div>
    </section>
  `;
}

function generateServiceCardsHtml() {
  const services = [
    {
      title: "Rekonštrukcie domov a bytov",
      image: "/wp-content/uploads/2025/06/fido-rekonstrukcia-chaty-02.webp",
      url: "/sluzby/rekonstrukcie-domov-a-bytov/",
      text: "S FIDO.sk získate všetky služby, ktoré potrebujete na rekonštrukciu – od renovácie interiéru až po kompletnú prestavbu na kľúč pre váš plný komfort.",
      btnText: "Preskúmať riešenia"
    },
    {
      title: "Okná, Brány a dvere",
      image: "/wp-content/uploads/2025/06/fido-lubovce-02.webp",
      url: "/sluzby/okna-brany-a-dvere/",
      text: "Zameriavame sa na kvalitné okná, ktoré vám pomôžu ušetriť náklady na energie. Naša ponuka zahŕňa moderné a energeticky úsporné okná.",
      btnText: "Získajte cenovú ponuku"
    },
    {
      title: "Nábytok na mieru",
      image: "/wp-content/uploads/2025/06/fido-kuchyna-c-12.webp",
      url: "/sluzby/nabytok-na-mieru/",
      text: "Navrhujeme a vyrábame nábytok presne podľa vašich požiadaviek. Každý kúsok je originál zameraný na funkčnosť, estetiku a trvácnosť.",
      btnText: "Dohodnúť konzultáciu"
    },
    {
      title: "Nehnuteľnosti",
      image: "/wp-content/uploads/2025/06/fido-deco-2.webp",
      url: "/nehnutelnosti/",
      text: "Ponúkame predaj, prenájom a správu nehnuteľností. Zabezpečíme pre vás kompletné právne služby a odborné poradenstvo.",
      btnText: "Pozrieť ponuku"
    },
    {
      title: "Zámočníctvo",
      image: "/wp-content/uploads/2025/06/fido-deco-30.webp",
      url: "/sluzby/zamocnictvo/",
      text: "Vyrábame a montujeme kvalitné kovové konštrukcie, brány, ploty, zábradlia a ďalšie zámočnícke prvky pre bezpečný a moderný domov.",
      btnText: "Zobraziť ponuku"
    },
    {
      title: "Strojárstvo",
      image: "/wp-content/uploads/2025/06/fido-deco-01.webp",
      url: "/sluzby/strojarstvo/",
      text: "Ponúkame presné kovoobrábanie, CNC sústruženie, frézovanie a kovovýrobu na mieru pre priemysel aj jednotlivcov s dôrazom na milimetrovú presnosť.",
      btnText: "Viac o strojárstve"
    },
    {
      title: "Hodinový manžel",
      image: "/wp-content/uploads/2025/06/fido-team.webp",
      url: "/sluzby/hodinovy-manzel/",
      text: "Zabezpečujeme drobné opravy v domácnosti, montáž nábytku, zapojenie spotrebičov, údržbu a iné práce, na ktoré sami nemáte čas.",
      btnText: "Objednať pomoc"
    },
    {
      title: "Preprava materiálov",
      image: "/wp-content/uploads/2025/06/fido-autopo-pristresky-18.webp",
      url: "/sluzby/doprava/",
      text: "Ponúkame spoľahlivú nákladnú autodopravu a prepravu stavebného materiálu, tovaru alebo sypkých materiálov s vykládkou hydraulickou rukou.",
      btnText: "Objednať prepravu"
    },
    {
      title: "Požičovňa náradia",
      image: "/wp-content/uploads/2025/06/fido-shake-theory-44.webp",
      url: "/sluzby/pozicovna-naradia/",
      text: "Prenajímame profesionálne stavebné stroje, náradie, lešenie a záhradnú techniku od špičkových výrobcov pre vaše stavebné projekty.",
      btnText: "Pozrieť cenník"
    }
  ];

  return services.map(s => `
    <div class="ct-div-block fido-custom-service-card card-sluzba-wrap">
      <a class="ct-link img-link-wraper-primary" href="${s.url}">
        <img loading="lazy" alt="${s.title}" src="${s.image}" class="ct-image img-primary" />
      </a>
      <div class="fido-custom-service-card-body">
        <h3 class="ct-headline h6"><a href="${s.url}" style="text-decoration: none; color: inherit; display: block;">${s.title}</a></h3>
        <p class="fido-custom-service-card-text">${s.text}</p>
      </div>
    </div>
  `).join("");
}

function generateHomeProjectsHtml() {
  const homeProjects = [
    {
      idSuffix: "1",
      title: "AutoPo",
      url: "/realizacie/autopo/",
      image: "/wp-content/uploads/2025/06/fido-autopo-pristresky-17.webp",
      tagUrl: "/znacka/pristresky/",
      tagName: "Prístrešky"
    },
    {
      idSuffix: "2",
      title: "Rekreačná chata",
      url: "/realizacie/rekreacna-chata/",
      image: "/wp-content/uploads/2025/06/fido-rekonstrukcia-chaty-02.webp",
      tagUrl: "/znacka/rekonstrukcie/",
      tagName: "Rekonštrukcie"
    },
    {
      idSuffix: "3",
      title: "Materská škola",
      url: "/realizacie/rekonstrukcia-socialnych-zariadeni/",
      image: "/wp-content/uploads/2025/09/IMG_3322-scaled.jpeg",
      tagUrl: "/kategorie_realizacie/komercne-projekty/",
      tagName: "Komerčné projekty"
    },
    {
      idSuffix: "4",
      title: "Rekonštrukcia priestorov",
      url: "/realizacie/rekonstrukcia-priestorov/",
      image: "/wp-content/uploads/2025/06/fido-rekonstrukcia-priestorov-04.webp",
      tagUrl: "/kategorie_realizacie/priemyselne-projekty/",
      tagName: "Priemyselné projekty"
    }
  ];

  const cardsHtml = homeProjects.map((p) => `
    <div id="div_block-482-32-${p.idSuffix}" class="ct-div-block card-project" data-id="div_block-482-32">
      <a id="link-483-32-${p.idSuffix}" class="ct-link img-link-wraper-primary" href="${p.url}" target="_self" data-id="link-483-32">
        <img id="image-484-32-${p.idSuffix}" alt="" src="${p.image}" class="ct-image card-project-img" data-id="image-484-32" />
      </a>
      <div id="div_block-485-32-${p.idSuffix}" class="ct-div-block card-project-content-wrap" data-id="div_block-485-32">
        <div id="div_block-486-32-${p.idSuffix}" class="ct-div-block card-project-meta-wrap" data-id="div_block-486-32">
          <div id="text_block-487-32-${p.idSuffix}" class="ct-text-block text-m-semi-bold" data-id="text_block-487-32">
            <span id="span-488-32-${p.idSuffix}" class="ct-span" data-id="span-488-32">
              <a href="${p.tagUrl}" rel="tag">${p.tagName}</a>
            </span>
          </div>
          <div id="text_block-489-32-${p.idSuffix}" class="ct-text-block text-s" data-id="text_block-489-32">Sep 30, 2024</div>
        </div>
        <h3 id="headline-490-32-${p.idSuffix}" class="ct-headline h6" data-id="headline-490-32">
          <span id="span-573-32-${p.idSuffix}" class="ct-span" data-id="span-573-32">${p.title}</span>
        </h3>
        <a id="link-491-32-${p.idSuffix}" class="ct-link btn-alt" href="${p.url}" target="_self" role="button" data-id="link-491-32">
          <div id="text_block-492-32-${p.idSuffix}" class="ct-text-block oxel_icon_button_text" data-id="text_block-492-32">Viac o projekte</div>
          <div id="fancy_icon-493-32-${p.idSuffix}" class="ct-fancy-icon btn-alt-icon" data-id="fancy_icon-493-32">
            <svg id="svg-fancy_icon-493-32-${p.idSuffix}" data-id="svg-fancy_icon-493-32"><use xlink:href="#Iconmoonicon-arrow-up"></use></svg>
          </div>
        </a>
      </div>
    </div>
  `).join("");

  return `<div id="_dynamic_list-481-32" class="oxy-dynamic-list">${cardsHtml}</div>`;
}

function generateBlogCardsHtml() {
  const cardsHtml = posts.map((post, index) => {
    const img = featuredImage(post);
    const title = post.title.rendered || "";
    const date = post.date 
      ? new Date(post.date).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" }) 
      : "23. júna 2025";
    const url = `/${post.slug}/`;
    
    const rawText = post.content?.rendered || post.excerpt?.rendered || "";
    const excerptText = plainText(rawText);

    const cat = post._embedded?.["wp:term"]?.[0]?.[0];
    const categoryName = cat?.name || "Blog";
    const categoryUrl = cat?.slug ? `/kategoria/${cat.slug}/` : "/blog/";

    return `
      <div id="div_block-14-110-${index + 1}" class="ct-div-block card-post" data-id="div_block-14-110">
        <a id="link-15-110-${index + 1}" class="ct-link card-post-link-wrapper" href="${url}" target="_self" data-id="link-15-110">
          <img loading="lazy" id="image-16-110-${index + 1}" alt="${img.alt}" src="${img.src}" class="ct-image card-post-img" data-id="image-16-110" />
        </a>
        <div id="div_block-17-110-${index + 1}" class="ct-div-block card-post-content-wrap" data-id="div_block-17-110">
          <div id="text_block-19-110-${index + 1}" class="ct-text-block text-m-semi-bold" data-id="text_block-19-110">
            <span id="span-20-110-${index + 1}" class="ct-span" data-id="span-20-110">
              <a href="${categoryUrl}" rel="tag">${categoryName}</a>
            </span>
          </div>
          <div id="div_block-18-110-${index + 1}" class="ct-div-block card-post-meta-wrap" data-id="div_block-18-110">
            <div id="text_block-21-110-${index + 1}" class="ct-text-block text-s" data-id="text_block-21-110">
              <span id="span-88-110-${index + 1}" class="ct-span" data-id="span-88-110">${date}</span>
            </div>
            <h2 id="headline-22-110-${index + 1}" class="ct-headline h6" data-id="headline-22-110">
              <span id="span-85-110-${index + 1}" class="ct-span"><a href="${url}" style="text-decoration: none; color: inherit;">${title}</a></span>
            </h2>
            <div class="fido-blog-card-excerpt-container">
              <p class="fido-blog-card-excerpt">${excerptText}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  return cardsHtml;
}

function enhanceLubovecHtml(bodyHtml: string) {
  const textHtml = `
    <div class="fido-lubovec-contact-left">
      <h2 id="headline-211-705" class="ct-headline h2 h-spacer">Zaujala vás naša ponuka?</h2>
      <div id="text_block-212-705" class="ct-text-block text-l" >Ak máte záujem o jeden z bytov v tomto jedinečnom projekte, napíšte nám a my vás budeme obratom kontaktovať.</div>
    </div>
  `;

  return bodyHtml
    .replace(
      /<div id="kontakt" class="ct-div-block inner-div" ><h2 id="headline-211-705" class="ct-headline h2 h-spacer">Zaujala vás naša ponuka?<\/h2><div id="text_block-212-705" class="ct-text-block text-l centred max-width-subclaim" >Ak máte záujem o jeden z bytov v tomto jedinečnom projekte, napíšte nám a my vás budeme obratom kontaktovať\.<\/div>/i,
      `<div id="kontakt" class="ct-div-block inner-div fido-lubovec-contact-section">${textHtml}`
    )
    .replace(
      /<div id="shortcode-215-705" class="ct-shortcode" >/i,
      `<div id="shortcode-215-705" class="ct-shortcode fido-lubovec-contact-right">`
    );
}

function enhanceHtml(bodyHtml: string) {
  let enhanced = bodyHtml
    .replace(/Kontaktujte nás[\s\u2028\u2029]+ešte dnes/gi, "Kontaktujte nás ešte dnes")
    .replace(
      /<a id="link_text-144-27"[\s\S]*?<\/a>/i,
      '<button type="button" id="link_text-144-27" class="ct-link-text footer-link fido-cookie-settings" data-cookie-settings>Nastavenia cookies</button>',
    )
    .replace(/<a id="link_text-149-27"[\s\S]*?<\/a>/i, "")
    .replace(/<a id="div_block-152-27"[\s\S]*?<\/a>/i, "")
    .replace(
      /<span id="span-141-27" class="ct-span"[^>]*>\d{4}<\/span>/g,
      '<span id="span-141-27" class="ct-span">2026</span>',
    )
    .replace(
      /(id="link-136-27"\s+class="ct-link"\s+href=")([^"]*)/gi,
      "$1/"
    )
    .replace(
      /(<li id="menu-item-122"\b[\s\S]*?<\/a>\s*)<ul class="sub-menu">[\s\S]*?<\/ul>/i,
      `$1<ul class="sub-menu">${serviceBoxesHtml}</ul>`
    );

  // Replace sub-menu markup for Nabytok menu-item-116
  enhanced = enhanced.replace(
    /(<li id="menu-item-116"\s+class=")([^"]*)(">\s*<a href="\/sluzby\/nabytok-na-mieru\/">Nábytok<\/a>\s*)(<\/li>)/i,
    `$1$2 menu-item-has-children$3<ul class="sub-menu">${furnitureBoxesHtml}</ul>$4`
  );

  if (postupSectionPattern.test(enhanced)) {
    enhanced = enhanced.replace(postupSectionPattern, generatePostupHtml());
  }

  // Remove the quote section on all pages
  const quoteSectionPattern = /<section\b(?:(?!<section\b)[\s\S])*?Sme odborníci na renovácie, výmenu okien a výrobu nábytku\. Naši odborníci majú dlhoročné skúsenosti[\s\S]*?<\/section>/gi;
  enhanced = enhanced.replace(quoteSectionPattern, "");

  // Replace custom furniture hero image with an interactive slideshow
  const furnitureHeroPattern = /<img\s+id="image-12-72"\s+alt=""\s+src="\/wp-content\/uploads\/2025\/06\/fido-obyvacia-stena-03\.webp"[\s\S]*?\/>/i;
  if (furnitureHeroPattern.test(enhanced)) {
    const sliderHtml = `
      <div id="image-12-72" class="fido-hero-slider">
        <div class="fido-hero-slide active" style="background-image: url('/wp-content/uploads/2025/06/fido-deco-29.webp');"></div>
        <div class="fido-hero-slide" style="background-image: url('/wp-content/uploads/2025/06/fido-nabytok-35.webp');"></div>
        <div class="fido-hero-slide" style="background-image: url('/wp-content/uploads/2025/06/fido-vstavana-skrina-a-podlaha-06.webp');"></div>
        <div class="fido-hero-slide" style="background-image: url('/wp-content/uploads/2025/06/fido-kupelna-b-03.webp');"></div>
        <div class="fido-hero-slide" style="background-image: url('/wp-content/uploads/2025/06/fido-nabytok-02.webp');"></div>
        <div class="fido-hero-slide" style="background-image: url('/wp-content/uploads/2025/06/fido-postel-02.webp');"></div>
        <div class="fido-hero-slide" style="background-image: url('/wp-content/uploads/2025/06/fido-kuchyna-c-12.webp');"></div>
        <div class="fido-hero-slide" style="background-image: url('/wp-content/uploads/2025/06/fido-vstavana-skrina-a-02.webp');"></div>
        
        <script>
          (function() {
            function initSlider() {
              const slider = document.querySelector(".fido-hero-slider");
              if (!slider) return;
              if (slider.dataset.initialized) return;
              slider.dataset.initialized = "true";
 
              const slides = slider.querySelectorAll(".fido-hero-slide");
              let currentIndex = 0;
              let timer;
 
              function showSlide(index) {
                if (slides.length === 0) return;
                slides[currentIndex].classList.remove("active");
                currentIndex = (index + slides.length) % slides.length;
                slides[currentIndex].classList.add("active");
              }
 
              function nextSlide() { showSlide(currentIndex + 1); }
 
              function startTimer() {
                clearInterval(timer);
                timer = setInterval(nextSlide, 4500);
              }
 
              startTimer();
            }
 
            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", initSlider);
            } else {
              initSlider();
            }
            const observer = new MutationObserver(function() {
              initSlider();
            });
            observer.observe(document.body, { childList: true, subtree: true });
          })();
        </script>
      </div>
    `;
    enhanced = enhanced.replace(furnitureHeroPattern, sliderHtml);
  }
 
  // Replace Marco's photo in contact sections on all pages with the one from the about page
  enhanced = enhanced.replace(
    /<img\s+id="image-75-67"[\s\S]*?\/>/gi,
    '<img id="image-75-67" alt="Marco Kamenčík" src="/wp-content/uploads/2025/06/fido-shake-theory-39.webp" class="ct-image cta-card-img" srcset="/wp-content/uploads/2025/06/fido-shake-theory-39.webp 1535w, /wp-content/uploads/2025/06/fido-shake-theory-39-200x300.webp 200w, /wp-content/uploads/2025/06/fido-shake-theory-39-683x1024.webp 683w, /wp-content/uploads/2025/06/fido-shake-theory-39-768x1152.webp 768w, /wp-content/uploads/2025/06/fido-shake-theory-39-1024x1536.webp 1024w, /wp-content/uploads/2025/06/fido-shake-theory-39-1366x2048.webp 1366w" sizes="(max-width: 1535px) 100vw, 1535px" />'
  );

  return enhanced;
}

export async function NativeSnapshot({ page }: { page: NativePage }) {
  let bodyHtml = enhanceHtml(page.bodyHtml);

  const isContact = page.bodyClass.split(/\s+/).includes("page-id-50");
  if (isContact) {
    bodyHtml = enhanceContactHtml(bodyHtml);
  }

  const isLubovec = page.bodyClass.split(/\s+/).includes("page-id-705");
  if (isLubovec) {
    bodyHtml = enhanceLubovecHtml(bodyHtml);
  }

  // Extract the header from bodyHtml to place it outside the transformed transition wrapper
  let headerHtml = "";
  const headerMatch = /<header\b[\s\S]*?<\/header>/i.exec(bodyHtml);
  if (headerMatch) {
    headerHtml = headerMatch[0];
    bodyHtml = bodyHtml.replace(headerMatch[0], "");
  }
  
  const isAbout = page.bodyClass.split(/\s+/).includes("page-id-46");
  if (isAbout) {
    bodyHtml = bodyHtml
      .replace(/<\/main>/i, `${generatePartnersHtml()}</main>`);
  }

  const isHome = page.bodyClass.split(/\s+/).includes("home");
  if (isHome) {
    bodyHtml = bodyHtml
      .replace(
        /<section id="section-2-32" class=" ct-section section-width" >/i,
        `<section id="section-2-32" class="ct-section section-width oxy-video-background">` +
        `<div class='oxy-video-container'>` +
        `<video autoplay loop playsinline muted><source src='/wp-content/uploads/2025/11/REZIDENCIA-LUBOVEC-EXTERIER-low.mp4'></video>` +
        `<div class='oxy-video-overlay'></div>` +
        `</div>`
      )
      .replace(
        /<section id="section-100-32"[\s\S]*?<\/section>/i,
        ""
      )
      .replace(
        /<section id="section-112-32"[\s\S]*?<\/section>/i,
        ""
      )
      .replace(
        /<div id="div_block-23-32"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/i,
        `<div id="div_block-23-32" class="ct-div-block">${generateServiceCardsHtml()}</div></div></section>`
      )
      .replace(
        /<div id="_dynamic_list-481-32"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/i,
        `${generateHomeProjectsHtml()}</div></section>`
      )
      .replace(
        /<div id="div_block-627-32"[\s\S]*?<\/div>/i,
        generateHomePartnersHtml()
      );
  }

  const isBlog = page.bodyClass.split(/\s+/).includes("blog");
  if (isBlog) {
    bodyHtml = bodyHtml.replace(
      /<article id="_dynamic_list-13-110"[\s\S]*?<\/article>/i,
      `<article id="_dynamic_list-13-110" class="oxy-dynamic-list">${generateBlogCardsHtml()}</article>`
    );
  }

  const hasReviews = reviewsSectionPattern.test(bodyHtml);
  const reviewsData = hasReviews ? await getGoogleReviews() : null;
  const reviewMatch = reviewsData ? reviewsSectionPattern.exec(bodyHtml) : null;
  const beforeReviews = reviewMatch ? bodyHtml.slice(0, reviewMatch.index) : bodyHtml;
  const afterReviews = reviewMatch ? bodyHtml.slice(reviewMatch.index + reviewMatch[0].length) : "";

  return (
    <>
      {headerHtml ? (
        <div
          dangerouslySetInnerHTML={{ __html: headerHtml }}
          suppressHydrationWarning
        />
      ) : null}
      <div className="fido-page-transition-wrapper">
        <div
          className="native-page-styles"
          dangerouslySetInnerHTML={{ __html: page.headHtml }}
        />
        <div
          className={`native-page-shell ${page.bodyClass}`}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: beforeReviews }}
        />
        {reviewsData && reviewMatch ? <GoogleReviews data={reviewsData} /> : null}
        {afterReviews ? (
          <div
            className={`native-page-shell ${page.bodyClass}`}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: afterReviews }}
          />
        ) : null}
      </div>
    </>
  );
}
