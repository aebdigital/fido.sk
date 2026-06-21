import type { NativePage } from "@/lib/native-page";
import { GoogleReviews } from "@/components/google-reviews";
import { ProjectDetail } from "@/components/project-detail";
import { getGoogleReviews } from "@/lib/google-reviews";
import { extractProjectPage } from "@/lib/project-detail";
import { posts, featuredImage, plainText } from "@/lib/site-data";
import { megaMenus } from "@/config/site";

const reviewsSectionPattern = /<section id="section-399-32"[\s\S]*?<\/section>/i;
const calculSectionPattern = /<section id="section-436-32"[\s\S]*?<\/section>/gi;

function generateFidoCalculBannerHtml() {
  return `
    <section class="ct-section section-width fido-calcul-banner-section">
      <div class="ct-section-inner-wrap">
        <div class="fido-calcul-banner">
          <div class="fido-calcul-banner-copy">
            <img class="fido-calcul-banner-logo" src="/fidocalcul-logo.png" alt="FIDO Calcul" loading="lazy" />
            <p class="fido-calcul-banner-kicker">Stavebný softvér pre váš tím</p>
            <h2>Stavby, cenníky a fakturácia v jednej appke</h2>
            <p class="fido-calcul-banner-description">FIDO Calcul drží projekty, klientov a dokumenty v jednom systéme, aby ste nemuseli prepínať medzi viacerými nástrojmi.</p>
          </div>
          <a class="fido-calcul-banner-button" href="https://fidocalcul.sk/" target="_blank" rel="noopener noreferrer">
            Pozrieť FIDO Calcul
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
    </section>
  `;
}

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
        <h2 class="ct-headline h2 fido-partners-title">Spolupracujeme s renomovanými partnermi</h2>
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
    .replace(
      /<div id="text_block-8-50" class="ct-text-block" >Potrebujete pomoc\? Náš tím pre úspech klientov a poradcovia sú tu, aby odpovedali na všetky vaše otázky\.<\/div>/i,
      `<p id="text_block-8-50" class="ct-text-block fido-contact-intro">Potrebujete pomoc? Náš tím pre úspech klientov a poradcovia sú tu, aby odpovedali na všetky vaše otázky.</p>`
    )
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

const postupSectionPattern = /<section id="section-264-72"[\s\S]*?<\/section>/i;

type PostupStep = {
  num: string;
  title: string;
  desc: string;
  image: string;
};

type FurnitureFaq = {
  question: string;
  answer: string;
};

function generatePostupCardsHtml(steps: PostupStep[]) {
  return steps.map((step) => `
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
}

function generatePostupHtml() {
  const postupSteps: PostupStep[] = [
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
          ${generatePostupCardsHtml(postupSteps)}
        </div>
      </div>
    </section>
  `;
}

function generateFurnitureDetailPostupHtml() {
  const steps: PostupStep[] = [
    {
      num: "01",
      title: "Poradenstvo",
      desc: "Preberieme vaše predstavy, spôsob používania nábytku, materiály aj požadovaný rozpočet.",
      image: "/postup/poradenstvo.webp",
    },
    {
      num: "02",
      title: "Zameranie",
      desc: "Priestor presne zameriame, aby hotový nábytok sedel na svoje miesto bez kompromisov.",
      image: "/postup/zameranie.webp",
    },
    {
      num: "03",
      title: "Návrh a výroba",
      desc: "Pripravíme návrh a po jeho odsúhlasení vyrobíme nábytok podľa dohodnutých špecifikácií.",
      image: "/postup/vyroba.webp",
    },
    {
      num: "04",
      title: "Montáž",
      desc: "Nábytok bezpečne dopravíme, odborne namontujeme a odovzdáme pripravený na používanie.",
      image: "/postup/montaz.webp",
    },
  ];

  return `
    <div class="fido-postup-section fido-postup-inline">
      <div class="fido-postup-header">
        <span class="fido-postup-kicker">Postup pri výrobe</span>
        <h2 class="fido-postup-title">Ako pracujeme</h2>
      </div>
      <div class="fido-postup-grid">${generatePostupCardsHtml(steps)}</div>
    </div>
  `;
}

const furnitureFaqs: Record<string, FurnitureFaq[]> = {
  "Dekoračné panely": [
    { question: "Aké materiály a dekory sú dostupné?", answer: "Vyberať môžete z drevených, lamelových, čalúnených aj moderných kompozitných panelov v rôznych farbách a povrchových úpravách." },
    { question: "Dajú sa panely doplniť osvetlením?", answer: "Áno. Do návrhu vieme zapracovať nepriame LED osvetlenie, ktoré zvýrazní štruktúru panelov aj atmosféru miestnosti." },
    { question: "Ako dlho trvá montáž?", answer: "Bežnú realizáciu zvládneme spravidla počas jedného dňa; presný čas závisí od plochy a členitosti steny." },
  ],
  "Komody": [
    { question: "Viete vyrobiť komodu do atypického priestoru?", answer: "Áno. Rozmery, členenie aj spôsob otvárania navrhneme presne podľa dostupného priestoru." },
    { question: "Aké úložné riešenia môžem kombinovať?", answer: "Kombinovať môžete zásuvky, dvierka, otvorené police aj vnútorné organizéry podľa spôsobu používania." },
    { question: "Môže komoda ladiť s existujúcim nábytkom?", answer: "Áno. Pomôžeme vám vybrať dekor, farbu a kovanie tak, aby nový kus prirodzene zapadol do interiéru." },
  ],
  "Kuchynské linky": [
    { question: "Zabezpečujete aj zameranie a návrh kuchyne?", answer: "Áno. Súčasťou realizácie je odborné zameranie, dispozičný návrh, výber materiálov aj cenová ponuka." },
    { question: "Viete do návrhu zahrnúť spotrebiče a osvetlenie?", answer: "Áno. Kuchyňu pripravíme pre vstavané spotrebiče a môžeme doplniť pracovné aj ambientné LED osvetlenie." },
    { question: "Ako dlho trvá výroba kuchyne?", answer: "Termín závisí od rozsahu a materiálov. Presný harmonogram dostanete po odsúhlasení finálneho návrhu." },
  ],
  "Obývacie steny": [
    { question: "Navrhujete obývacie steny aj pre malé priestory?", answer: "Áno. Návrh prispôsobíme rozmerom miestnosti tak, aby pôsobil ľahko a zároveň ponúkol dostatok úložného priestoru." },
    { question: "Je možné ukryť káble a techniku?", answer: "Áno. Myslíme na vedenie káblov, odvetranie elektroniky aj praktický prístup k zásuvkám." },
    { question: "Dá sa zostava doplniť LED osvetlením?", answer: "Áno. Osvetlenie vieme integrovať do políc, vitrín alebo za televízny panel." },
  ],
  "Postele": [
    { question: "Vyrábate aj postele atypických rozmerov?", answer: "Áno. Posteľ prispôsobíme rozmerom miestnosti, matraca aj vašim individuálnym požiadavkám." },
    { question: "Môže mať posteľ úložný priestor?", answer: "Áno. Navrhneme výklopný systém, zásuvky alebo kombinované úložné riešenie." },
    { question: "Je možné vyrobiť čalúnené čelo?", answer: "Áno. Vybrať si môžete čalúnené, drevené aj kombinované čelo v rôznych výškach a materiáloch." },
  ],
  "Šatníky": [
    { question: "Navrhujete aj vnútorné usporiadanie šatníka?", answer: "Áno. Police, zásuvky, tyče aj doplnky rozvrhneme podľa vášho oblečenia a každodenných návykov." },
    { question: "Viete vyriešiť šatník v podkroví?", answer: "Áno. Nábytok na mieru je vhodný aj pod šikminy, do výklenkov a ďalších atypických priestorov." },
    { question: "Dajú sa doplniť zrkadlá a osvetlenie?", answer: "Áno. Do návrhu môžeme zahrnúť zrkadlové plochy, LED osvetlenie aj praktické výsuvné doplnky." },
  ],
  "Stoly": [
    { question: "Aké rozmery stola si môžem zvoliť?", answer: "Rozmery prispôsobíme priestoru, počtu používateľov aj tomu, či ide o jedálenský, pracovný alebo konferenčný stôl." },
    { question: "Aké materiály používate?", answer: "Pracujeme s masívnym drevom, laminovanými materiálmi, kovovými podnožami aj ich kombináciami." },
    { question: "Viete vyrobiť rozkladací alebo pracovný stôl?", answer: "Áno. Podľa zadania pripravíme rozkladacie riešenie, káblové priechodky aj úložné prvky pre pracovisko." },
  ],
  "Vstavané skrine": [
    { question: "Koľko trvá výroba vstavanej skrine?", answer: "Bežná výroba trvá približne dva až tri týždne od schválenia návrhu; presný termín potvrdíme v cenovej ponuke." },
    { question: "Je možné zahrnúť osvetlenie alebo zrkadlá?", answer: "Áno. Súčasťou návrhu môže byť LED osvetlenie, zrkadlové dvere aj praktické vnútorné doplnky." },
    { question: "Viete vyrobiť skriňu do podkrovia alebo výklenku?", answer: "Áno. Navrhneme riešenie aj pod šikminu, do výklenku alebo iného atypického priestoru." },
  ],
};

function generateFurnitureFaqHtml(title: string) {
  const faqs = furnitureFaqs[title] ?? [];
  if (!faqs.length) return "";

  return `
    <section class="ct-section section-width fido-furniture-faq-section">
      <div class="ct-section-inner-wrap">
        <div class="fido-furniture-section-header">
          <span>Praktické informácie</span>
          <h2>Časté otázky</h2>
        </div>
        <div class="fido-furniture-faq-list">
          ${faqs.map((faq) => `
            <div class="fido-furniture-faq-item">
              <button type="button" class="fido-furniture-faq-trigger" aria-expanded="false">
                ${faq.question}
              </button>
              <div class="fido-furniture-faq-answer" aria-hidden="true">
                <div><p>${faq.answer}</p></div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function generateFurnitureRelatedHtml(currentTitle: string) {
  const items = megaMenus.furniture.items.filter((item) => item.label !== currentTitle).slice(0, 4);
  return `
    <section id="section-19-73" class="ct-section section-width fido-furniture-related-section">
      <div class="ct-section-inner-wrap">
        <div class="fido-furniture-related-header">
          <div><span>Inšpirujte sa</span><h2>Ďalší nábytok na mieru</h2></div>
          <a class="ct-link-button btn-primary" href="/sluzby/nabytok-na-mieru/">Všetky riešenia</a>
        </div>
        <div class="fido-furniture-related-grid">
          ${items.map((item) => `
            <a class="fido-furniture-related-card" href="${item.href}">
              <div class="fido-furniture-related-image">
                <img src="${item.image}" alt="${item.label}" loading="lazy" />
              </div>
              <span>${item.label}</span>
            </a>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function generateServiceCardsHtml(onlyOtherServices = false) {
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
      image: "/wp-content/uploads/2025/06/Fido_LUBOVCE_Rendre_Exterier_1F-1-scaled-1.jpg",
      url: "/nehnutelnosti/",
      text: "Ponúkame predaj, prenájom and správu nehnuteľností. Zabezpečíme pre vás kompletné právne služby a odborné poradenstvo.",
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
      image: "/wp-content/uploads/2025/06/fido-shake-theory-27.webp",
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

  const filteredServices = onlyOtherServices
    ? services.filter(
        s =>
          s.title !== "Okná, Brány a dvere" &&
          s.title !== "Nábytok na mieru" &&
          s.title !== "Nehnuteľnosti"
      )
    : services;

  return filteredServices.map(s => `
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

  let enhanced = bodyHtml
    .replace(
      /<div id="kontakt" class="ct-div-block inner-div" ><h2 id="headline-211-705" class="ct-headline h2 h-spacer">Zaujala vás naša ponuka?<\/h2><div id="text_block-212-705" class="ct-text-block text-l centred max-width-subclaim" >Ak máte záujem o jeden z bytov v tomto jedinečnom projekte, napíšte nám a my vás budeme obratom kontaktovať\.<\/div>/i,
      `<div id="kontakt" class="ct-div-block inner-div fido-lubovec-contact-section">${textHtml}`
    )
    .replace(
      /<div id="shortcode-215-705" class="ct-shortcode" >/i,
      `<div id="shortcode-215-705" class="ct-shortcode fido-lubovec-contact-right">`
    );

  // Project introduction
  enhanced = enhanced.replace(
    /<div id="text_block-56-705" class="ct-text-block text-l" >[\s\S]*?<\/div>/i,
    `<div id="text_block-56-705" class="ct-text-block text-l">Rezidencia Ľubovec prináša moderné a pokojné bývanie v tesnej blízkosti Prešova. Projekt pozostáva zo šiestich moderne riešených bytových jednotiek, ktoré ponúkajú vysoký štandard materiálov, premyslené dispozície a dostatok súkromia pre každú rodinu. Spojenie vidieckeho ticha a rýchlej dostupnosti do mesta robí z tohto projektu ideálne miesto pre váš nový domov.</div>`
  );

  // XY Lorem ipsum statistic (remove the fourth subdiv)
  enhanced = enhanced.replace(
    /<div id="div_block-74-705" class="ct-div-block usp-subdiv" ><div id="text_block-75-705" class="ct-text-block usp-title" >XY<\/div><div id="text_block-76-705" class="ct-text-block usp-desc" >Lorem ipsum<\/div><\/div>/i,
    ""
  );

  // Apartments subtitle
  enhanced = enhanced.replace(
    /<div id="text_block-87-705" class="ct-text-block text-l" >Lorem ipsum<\/div>/i,
    `<div id="text_block-87-705" class="ct-text-block text-l">Vyberte si byt, ktorý najlepšie vyhovuje vašim potrebám.</div>`
  );

  // Financing text
  enhanced = enhanced.replace(
    /<div id="text_block-181-705" class="ct-text-block text-l" >[\s\S]*?<\/div>/i,
    `<div id="text_block-181-705" class="ct-text-block text-l">Financovanie vášho nového bývania sme pre vás maximálne zjednodušili. Naši hypotekárni partneri vám pomôžu vybrať najvýhodnejšiu hypotéku s najlepšími podmienkami na trhu. Orientačnú výšku mesačnej splátky si môžete jednoducho vypočítať priamo v našej kalkulačke. Pre nezáväznú konzultáciu a kompletné preverenie vašich možností financovania nás neváhajte kontaktovať.</div>`
  );

  // Developer text
  enhanced = enhanced.replace(
    /<div id="text_block-203-705" class="ct-text-block text-l" >[\s\S]*?<\/div>/i,
    `<div id="text_block-203-705" class="ct-text-block text-l">Za projektom Rezidencia Ľubovec stojí renomovaný developer FIDO s.r.o., ktorý má za sebou roky úspešných stavebných projektov a spokojných klientov. Našou hlavnou prioritou je kvalita, transparentnosť a plná zodpovednosť za každú fázu výstavby – od návrhu, cez stavebný proces až po kolaudáciu a finálne odovzdanie. Kladieme dôraz na vysokú profesionalitu, precízne detaily a spoľahlivé plnenie všetkých časových harmonogramov.</div>`
  );

  return enhanced;
}

function enhanceNehnutelnostiHtml(bodyHtml: string) {
  return bodyHtml
    .replace(
      /<h3 id="headline-14-700" class="ct-headline card-bits-subtitle">[\s\S]*?<\/h3>/i,
      `<h3 id="headline-14-700" class="ct-headline card-bits-subtitle">Moderné bývanie</h3>`
    )
    .replace(
      /<div id="text_block-16-700" class="ct-text-block card-bits-text" >[\s\S]*?<\/div>/i,
      `<div id="text_block-16-700" class="ct-text-block card-bits-text">Dôraz kladieme na energetickú úspornosť, moderné dispozičné riešenia a vysokú kvalitu použitých materiálov.</div>`
    )
    .replace(
      /<h3 id="headline-19-700" class="ct-headline card-bits-subtitle">[\s\S]*?<\/h3>/i,
      `<h3 id="headline-19-700" class="ct-headline card-bits-subtitle">Pokojná lokalita</h3>`
    )
    .replace(
      /<div id="text_block-21-700" class="ct-text-block card-bits-text" >[\s\S]*?<\/div>/i,
      `<div id="text_block-21-700" class="ct-text-block card-bits-text">Projekt je osadený v tichom prostredí plnom zelene, ktoré poskytuje ideálne podmienky pre rodinný život.</div>`
    )
    .replace(
      /<h3 id="headline-24-700" class="ct-headline card-bits-subtitle">[\s\S]*?<\/h3>/i,
      `<h3 id="headline-24-700" class="ct-headline card-bits-subtitle">Výborná dostupnosť do Prešova</h3>`
    )
    .replace(
      /<div id="text_block-26-700" class="ct-text-block card-bits-text" >[\s\S]*?<\/div>/i,
      `<div id="text_block-26-700" class="ct-text-block card-bits-text">Rýchle a bezproblémové dopravné napojenie na krajské mesto Prešov autom aj autobusovým spojením.</div>`
    );
}

function enhanceSluzbyNehnutelnostiHtml(bodyHtml: string) {
  return bodyHtml
    .replace(
      /<span id="span-36-72" class="ct-span" >Ut enim ad mini<\/span>/i,
      `<span id="span-36-72" class="ct-span">Kompletná výstavba na kľúč</span>`
    )
    .replace(
      /<span id="span-42-72" class="ct-span" >[\s\S]*?<\/span>/i,
      `<span id="span-42-72" class="ct-span">Postaráme sa o všetko od výkopových prác a hrubej stavby až po finálne interiérové detaily a odovzdanie hotového domu na kľúč.</span>`
    )
    .replace(
      /<span id="span-38-72" class="ct-span" >Uis nostrud exercitation<\/span>/i,
      `<span id="span-38-72" class="ct-span">Transparentný rozpočet a harmonogram</span>`
    )
    .replace(
      /<span id="span-45-72" class="ct-span" >Ut enim ad minim veniam, quis nostrud exercitation<\/span>/i,
      `<span id="span-45-72" class="ct-span">Vopred presne poznáte rozpis materiálov, prác a termínov. Pracujeme podľa jasne stanoveného rozpočtu bez akýchkoľvek skrytých poplatkov.</span>`
    )
    .replace(
      /<span id="span-40-72" class="ct-span" >, quis nostrud exercitation<\/span>/i,
      `<span id="span-40-72" class="ct-span">Jeden spoľahlivý tím od návrhu po odovzdanie</span>`
    )
    .replace(
      /<span id="span-49-72" class="ct-span" >Ut enim ad minim veniam, quis  enim ad minim veniam, quis nostrud exercitation<\/span>/i,
      `<span id="span-49-72" class="ct-span">Celú realizáciu od projektovej dokumentácie až po kolaudáciu zastrešuje naša firma, čo vám zaručuje bezproblémový priebeh bez koordinácie subdodávateľov.</span>`
    );
}

function enhanceOknaBranyDvereHtml(bodyHtml: string) {
  return bodyHtml.replace(
    /<span id="span-20-72" class="ct-span" >[\s\S]*?<\/span>/i,
    `<span id="span-20-72" class="ct-span">Dodávame a montujeme plastové, hliníkové, drevené a oceľové okná, vstupné dvere aj posuvné systémy. Zabezpečíme odborné zameranie, výber riešenia a precíznu montáž.</span>`
  );
}

function furnitureGalleryImages(bodyHtml: string) {
  const images: string[] = [];
  const galleryItemPattern = /<a\b(?=[^>]*\bclass=["'][^"']*\boxy-gallery-item\b[^"']*["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/gi;
  let match: RegExpExecArray | null;

  while ((match = galleryItemPattern.exec(bodyHtml)) !== null) {
    const image = match[1];
    if (/^\/wp-content\/uploads\/[a-z0-9_./%,-]+$/i.test(image) && !images.includes(image)) {
      images.push(image);
    }
  }

  return images.slice(0, 8);
}

function enhanceFurnitureDetailHero(bodyHtml: string) {
  const heroPattern = /(<section id="section-2-73"[^>]*>)<div class="ct-section-inner-wrap">([\s\S]*?)<\/div><\/section>/i;
  if (!heroPattern.test(bodyHtml)) return bodyHtml;

  const title = furnitureDetailTitle(bodyHtml);
  const galleryImages = furnitureGalleryImages(bodyHtml);
  const fallbackImage = megaMenus.furniture.items.find((item) => item.label === title)?.image;
  const images = galleryImages.length ? galleryImages : fallbackImage ? [fallbackImage] : [];
  const mediaHtml = images.length
    ? `<div class="fido-furniture-detail-media fido-hero-slider" aria-label="Ukážky realizácií">${images.map((image, index) => (
        `<div class="fido-hero-slide${index === 0 ? " active" : ""}" style="background-image:url('${image}')"></div>`
      )).join("")}</div>`
    : `<div class="fido-furniture-detail-media fido-furniture-detail-media-empty" aria-label="Galéria pripravujeme"></div>`;

  return bodyHtml.replace(
    heroPattern,
    (_, sectionOpen: string, heroContent: string) => (
      `${sectionOpen}<div class="ct-section-inner-wrap fido-furniture-detail-hero">` +
      `<div class="fido-furniture-detail-copy">${heroContent}</div>${mediaHtml}</div></section>`
    ),
  );
}

function removeWordPressDescriptionDividers(bodyHtml: string) {
  return bodyHtml.replace(
    /<hr\b[^>]*class=["'][^"']*\bwp-block-separator\b[^"']*["'][^>]*\/?\s*>/gi,
    "",
  );
}

function furnitureDetailTitle(bodyHtml: string) {
  const title = /<h1\b[^>]*id="headline-5-73"[^>]*>([\s\S]*?)<\/h1>/i.exec(bodyHtml)?.[1] ?? "";
  return title.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function standardizeFurnitureDetailContent(bodyHtml: string) {
  const title = furnitureDetailTitle(bodyHtml);
  let enhanced = removeWordPressDescriptionDividers(bodyHtml)
    .replace(
    /<h[2-4]\b[^>]*>\s*Ako to prebieha\?\s*<\/h[2-4]>\s*<ol\b[^>]*>[\s\S]*?<\/ol>/i,
      "",
    )
    .replace(
      /<h[2-4]\b[^>]*>\s*Časté otázky\s*(?:\(FAQ\))?\s*<\/h[2-4]>[\s\S]*?(?=<\/span>)/i,
      "",
    )
    .replace(/CTA\s*[–-]\s*Vytvorme spolu vašu novú posteľ/gi, "Vytvorme spolu vašu novú posteľ");

  enhanced = enhanced.replace(
    /(<section id="section-14-73"[\s\S]*?<\/section>)/i,
    `$1${generateFurnitureDetailPostupHtml()}`,
  );
  enhanced = enhanced.replace(
    /(?=<section id="kontakt")/i,
    generateFurnitureFaqHtml(title),
  );
  enhanced = enhanced.replace(
    /<section id="section-19-73"[\s\S]*?<\/section>/i,
    generateFurnitureRelatedHtml(title),
  );

  return enhanced;
}

function enhanceHtml(bodyHtml: string) {
  let enhanced = bodyHtml.replace(calculSectionPattern, generateFidoCalculBannerHtml());

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
      </div>
    `;
    enhanced = enhanced.replace(furnitureHeroPattern, sliderHtml);
  }
 
  // Replace Marco's photo in contact sections on all pages with the one from the about page
  enhanced = enhanced.replace(
    /<img\s+id="image-75-67"[\s\S]*?\/>/gi,
    '<img id="image-75-67" alt="Marco Kamenčík" src="/wp-content/uploads/2025/06/fido-shake-theory-39.webp" class="ct-image cta-card-img" srcset="/wp-content/uploads/2025/06/fido-shake-theory-39.webp 1535w, /wp-content/uploads/2025/06/fido-shake-theory-39-200x300.webp 200w, /wp-content/uploads/2025/06/fido-shake-theory-39-683x1024.webp 683w, /wp-content/uploads/2025/06/fido-shake-theory-39-768x1152.webp 768w, /wp-content/uploads/2025/06/fido-shake-theory-39-1024x1536.webp 1024w, /wp-content/uploads/2025/06/fido-shake-theory-39-1366x2048.webp 1366w" sizes="(max-width: 1535px) 100vw, 1535px" />'
  );

  return enhanced.replace(/<script\b[\s\S]*?<\/script>/gi, "");
}

export async function NativeSnapshot({ page }: { page: NativePage }) {
  let bodyHtml = enhanceHtml(page.bodyHtml);
  const bodyClasses = new Set(page.bodyClass.split(/\s+/));

  if (bodyHtml.includes('id="section-2-73"')) {
    bodyHtml = enhanceFurnitureDetailHero(bodyHtml);
    bodyHtml = standardizeFurnitureDetailContent(bodyHtml);
  }

  if (bodyClasses.has("postid-132") || bodyClasses.has("postid-136")) {
    bodyHtml = removeWordPressDescriptionDividers(bodyHtml);
  }

  const isContact = bodyClasses.has("page-id-50");
  if (isContact) {
    bodyHtml = enhanceContactHtml(bodyHtml);
  }

  const isSluzbyArchive = bodyClasses.has("post-type-archive-sluzby");
  if (isSluzbyArchive) {
    bodyHtml = bodyHtml.replace(
      /<div id="_dynamic_list-17-71"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/i,
      `<div id="_dynamic_list-17-71" class="oxy-dynamic-list">${generateServiceCardsHtml(true)}</div></div></section>`
    );
  }

  const isLubovec = page.bodyClass.split(/\s+/).includes("page-id-705");
  if (isLubovec) {
    bodyHtml = enhanceLubovecHtml(bodyHtml);
  }

  const isNehnutelnosti = page.bodyClass.split(/\s+/).includes("page-id-700");
  if (isNehnutelnosti) {
    bodyHtml = enhanceNehnutelnostiHtml(bodyHtml);
  }

  const isSluzbyNehnutelnosti = page.bodyClass.split(/\s+/).includes("postid-124");
  if (isSluzbyNehnutelnosti) {
    bodyHtml = enhanceSluzbyNehnutelnostiHtml(bodyHtml);
  }

  const isOknaBranyDvere = page.bodyClass.split(/\s+/).includes("postid-126");
  if (isOknaBranyDvere) {
    bodyHtml = enhanceOknaBranyDvereHtml(bodyHtml);
  }

  const projectPage = page.bodyClass.split(/\s+/).includes("single-realizacie")
    ? extractProjectPage(bodyHtml)
    : null;

  if (projectPage) {
    const reviewMatch = reviewsSectionPattern.exec(projectPage.remainingMainHtml);
    const beforeReviews = reviewMatch ? projectPage.remainingMainHtml.slice(0, reviewMatch.index) : projectPage.remainingMainHtml;
    const afterReviews = reviewMatch ? projectPage.remainingMainHtml.slice(reviewMatch.index + reviewMatch[0].length) : "";
    const reviewsData = reviewMatch ? await getGoogleReviews() : null;
    return (
      <div className="fido-page-transition-wrapper">
        <div className="native-page-styles" dangerouslySetInnerHTML={{ __html: page.headHtml }} />
        <main className="fido-project-page">
          <ProjectDetail data={projectPage.data} />
          <div className="native-page-shell" dangerouslySetInnerHTML={{ __html: beforeReviews }} />
          {reviewsData ? <GoogleReviews data={reviewsData} /> : null}
          {afterReviews ? <div className="native-page-shell" dangerouslySetInnerHTML={{ __html: afterReviews }} /> : null}
        </main>
        {projectPage.auxiliaryHtml ? <div className="native-page-shell" dangerouslySetInnerHTML={{ __html: projectPage.auxiliaryHtml }} /> : null}
      </div>
    );
  }

  // The root layout owns one persistent header; discard the mirrored page copy.
  const headerMatch = /<header\b[\s\S]*?<\/header>/i.exec(bodyHtml);
  if (headerMatch) {
    bodyHtml = bodyHtml.replace(headerMatch[0], "");
  }

  // The root layout owns the single shared footer.
  bodyHtml = bodyHtml
    .replace(/<footer\b[\s\S]*?<\/footer>/i, "")
    .replace(/<!--\s*WP_FOOTER\s*-->/gi, "");
  
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

    if (!bodyHtml.includes("fido-home-partners-block")) {
      bodyHtml = bodyHtml.replace(
        /(?=<section id="section-399-32")/i,
        `<section class="ct-section section-width fido-home-partners-section"><div class="ct-section-inner-wrap">${generateHomePartnersHtml()}</div></section>`,
      );
    }
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
