import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { data } from "@/lib/site-data";

export type NativePage = {
  bodyClass: string;
  bodyHtml: string;
  description: string;
  headHtml: string;
  title: string;
};

function decodeEntities(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function capture(source: string, expression: RegExp) {
  return expression.exec(source)?.[1]?.trim() ?? "";
}

function snapshotFile(pathname: string) {
  const cleanSegments = pathname.split("/").filter(Boolean);
  if (cleanSegments.some((segment) => !/^[a-z0-9._-]+$/i.test(segment))) return null;

  return path.join(
    process.cwd(),
    "public",
    "_mirror",
    ...cleanSegments,
    "index.html",
  );
}

function extractHeadStyles(head: string) {
  const tags = head.match(
    /<style\b[\s\S]*?<\/style>|<link\b(?=[^>]*(?:rel=["'][^"']*(?:stylesheet|preload)[^"']*["']|as=["']style["']))[^>]*>/gi,
  );
  return tags?.join("\n") ?? "";
}

const privacyMain = `
<main id="inner_content-135-27" class="ct-inner-content">
  <section class="fido-privacy-page">
    <div class="fido-privacy-inner">
      <p class="fido-privacy-kicker">FIDO s.r.o.</p>
      <h1>Ochrana osobných údajov</h1>
      <div class="fido-privacy-company">
        <p><strong>Fido s.r.o.</strong><br>IČO: 48 110 965<br>Konateľ: Slavomír Kamenčík<br>Strojnícka 9, 080 06 Prešov – Nižná Šebastová<br>E-mail: <a href="mailto:kontakt@fido.sk">kontakt@fido.sk</a><br>Tel.: <a href="tel:+421917617202">+421 917 617 202</a></p>
      </div>
      <p>Tieto Zásady ochrany osobných údajov (ďalej len „Zásady“) popisujú, aké osobné údaje spracúvame v súvislosti s používaním našej webovej stránky a kontaktných formulárov.</p>

      <h2>I. Kontaktný formulár</h2>
      <p>Na stránke www.fido.sk prevádzkujeme kontaktné formuláre, ktorých účelom je umožniť vám:</p>
      <ul><li>položiť otázku k našim produktom a službám,</li><li>požiadať o cenovú ponuku.</li></ul>
      <h3>Rozsah spracúvaných údajov</h3>
      <ul><li>meno a priezvisko,</li><li>e-mailová adresa,</li><li>telefónne číslo,</li><li>informácie, ktoré dobrovoľne uvediete v správe.</li></ul>
      <h3>Účel spracovania</h3>
      <p>Uvedené údaje spracúvame, aby sme vás mohli kontaktovať, reagovať na váš dopyt a pripraviť požadovanú cenovú ponuku.</p>
      <h3>Právny základ</h3>
      <p>Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred uzavretím zmluvy na žiadosť dotknutej osoby.</p>
      <h3>Doba uchovávania</h3>
      <p>Osobné údaje budeme uchovávať maximálne 10 rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah alebo nám právne predpisy neukladajú inú dobu uchovávania.</p>

      <h2>II. Súbory cookies</h2>
      <p>Na našej webovej stránke používame cookies výlučne na nasledujúce účely:</p>
      <ul><li><strong>Nevyhnutné cookies</strong> – zabezpečujú základnú funkčnosť stránky a uloženie nastavení súhlasu.</li><li><strong>Štatistické (analytické) cookies</strong> – pomáhajú nám pochopiť, ako návštevníci stránku používajú; nasadzujeme ich len so súhlasom používateľa.</li></ul>
      <h3>Správa súhlasov</h3>
      <p>Súhlas s využívaním štatistických cookies môžete kedykoľvek zmeniť alebo odvolať prostredníctvom odkazu „Nastavenia cookies“ v pätičke stránky alebo priamo v nastaveniach prehliadača.</p>

      <h2>III. Práva dotknutej osoby</h2>
      <p>Podľa nariadenia GDPR máte nasledujúce práva:</p>
      <ul><li>prístup k osobným údajom, ktoré spracúvame,</li><li>oprava nepresných alebo neúplných údajov,</li><li>vymazanie („právo na zabudnutie“), ak na spracovanie už nie je právny základ,</li><li>obmedzenie spracovania,</li><li>prenosnosť údajov,</li><li>odvolanie súhlasu,</li><li>podanie sťažnosti na Úrad na ochranu osobných údajov SR, Hraničná 12, 820 07 Bratislava, <a href="https://dataprotection.gov.sk/" target="_blank" rel="noopener noreferrer">www.dataprotection.gov.sk</a>.</li></ul>
      <p>V prípade otázok alebo uplatnenia vašich práv nás kontaktujte na <a href="mailto:kontakt@fido.sk">kontakt@fido.sk</a> alebo na telefónnom čísle <a href="tel:+421917617202">+421 917 617 202</a>.</p>
      <p><strong>Tieto Zásady nadobúdajú účinnosť dňom 25. 4. 2025.</strong></p>
    </div>
  </section>
</main>`;

const bedroomMain = `
<span id="span-26-115" class="ct-span oxy-stock-content-styles" >
<p>Hľadáte spôsob, ako premeniť svoju spálňu na oázu pokoja a nerušeného oddychu? Minimalistický dizajn nie je len o strohosti a prázdnych stenách. Naopak, správne poňatý minimalizmus dokáže vytvoriť útulné prostredie, ktoré podporuje kvalitný spánok a mentálny relax po náročnom dni. V tomto článku sa pozrieme na to, ako dosiahnuť harmonický balans medzi funkčnosťou, čistými líniami a útulnou atmosférou.</p>

<h2 class="wp-block-heading">1. Správna paleta farieb a prírodné materiály</h2>
<p>Základom každej minimalistickej spálne je harmonická farebná schéma. Zabudnite na agresívne farby a stavte na zemité tóny, teplú bielu, béžovú, pieskovú alebo jemné odtiene sivej. Tieto farby opticky zväčšujú priestor a pôsobia upokojujúco na našu myseľ.</p>
<p>Kľúčovú rolu v útulnosti zohrávajú materiály. Použite textúry, ktoré vnášajú do priestoru teplo a hĺbku:</p>
<ul class="wp-block-list">
  <li><strong>Masívne drevo:</strong> Drevená posteľ, nočné stolíky alebo obklad steny dodajú miestnosti prírodný charakter.</li>
  <li><strong>Prírodné textílie:</strong> Ľanové posteľné prádlo, bavlnené prehozy a mäkké vlnené koberce vytvoria vrstvenú štruktúru bez pocitu preplnenosti.</li>
  <li><strong>Kovové detaily:</strong> Jemné akcenty v matnej čiernej alebo brúsenom kove môžu dodať moderný a elegantný kontrast.</li>
</ul>

<h2 class="wp-block-heading">2. Nábytok na mieru ako základ čistého priestoru</h2>
<p>Najväčším nepriateľom minimalizmu je neporiadok a hromadenie vecí. V spálni je preto kľúčové maximalizovať úložné priestory bez toho, aby sme zahltili miestnosť. Najlepším riešením je <a href="/sluzby/nabytok-na-mieru/">nábytok na mieru</a>, napríklad vstavaná skriňa na celú stenu.</p>
<p>Vstavané skrine s hladkými posuvnými alebo bezúchytkovými dverami dokonale splynú so stenou a poskytnú obrovské množstvo úložného priestoru pre oblečenie, sezónne veci aj posteľnú bielizeň. Miestnosť tak zostane čistá, vzdušná a pripravená na relaxáciu.</p>

<h2 class="wp-block-heading">3. Zamerajte sa na detaily a kvalitné osvetlenie</h2>
<p>Minimalizmus neznamená, že spálňa musí byť úplne bez dekorácií. Vyberajte si však len niekoľko kvalitných kúskov, ku ktorým máte vzťah – napríklad jeden veľkoformátový obraz nad čelom postele, dizajnovú vázu alebo štýlovú stojacu lampu.</p>
<p>Osvetlenie výrazne ovplyvňuje náladu v spálni. Kombinujte hlavné stropné svetlo s ambientným podsvietením – napríklad LED pásikmi za čelom postele alebo pod posteľným rámom. Teplé žlté svetlo navodí príjemnú večernú atmosféru a pripraví vaše telo na spánok.</p>

<h2 class="wp-block-heading">Chcete spálňu snov na mieru?</h2>
<p>Vytvorenie dokonalej minimalistickej spálne si vyžaduje precízne plánovanie a detailné zhotovenie. Ak snívate o posteli z masívu, štýlovej vstavanej skrini či kompletnom interiérovom riešení, naši odborníci v spoločnosti FIDO vám radi pomôžu. Prečítajte si viac <a href="/o-nas/">o našej firme</a> alebo nás kontaktujte pre nezáväznú cenovú ponuku.</p>
</span>`;

function applyPageOverrides(pathname: string, bodyHtml: string) {
  if (pathname === "/ochrana-osobnych-udajov/") {
    return bodyHtml.replace(/<main\b[\s\S]*?<\/main>/i, privacyMain);
  }
  if (pathname === "/ako-vytvorit-utulnu-spalnu-s-minimalistickym-dizajnom/") {
    return bodyHtml.replace(/<span\s+id="span-26-115"\s+class="ct-span\s+oxy-stock-content-styles"\s*>[\s\S]*?<\/span>/i, bedroomMain);
  }
  return bodyHtml;
}

export const getNativePage = cache((pathname: string): NativePage | null => {
  const file = snapshotFile(pathname);
  if (!file || !fs.existsSync(file)) return null;

  const source = fs.readFileSync(file, "utf8");
  const head = capture(source, /<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyHtml = applyPageOverrides(
    pathname,
    capture(source, /<body[^>]*>([\s\S]*?)<\/body>/i),
  );
  const bodyClass = decodeEntities(capture(source, /<body[^>]*class=["']([^"']*)["'][^>]*>/i));
  const title = decodeEntities(capture(head, /<title[^>]*>([\s\S]*?)<\/title>/i));
  const description = decodeEntities(
    capture(head, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i) ||
      capture(head, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i),
  );

  return {
    bodyClass,
    bodyHtml,
    description,
    headHtml: extractHeadStyles(head),
    title: title || "FIDO - Plníme sny",
  };
});

export function allNativePaths() {
  return [
    ...new Set([
      ...data.routes.map((route) => new URL(route).pathname),
      "/sluzby/",
      "/realizacie/",
    ]),
  ];
}

export function nativeRouteParams() {
  return allNativePaths()
    .filter((pathname) => pathname !== "/")
    .map((pathname) => ({
      slug: pathname.split("/").filter(Boolean),
    }));
}
