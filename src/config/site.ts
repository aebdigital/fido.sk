export type SiteLink = {
  href: string;
  label: string;
};

export type MegaMenuKey = "realestate" | "furniture" | "windows" | "services";

export type PrimaryNavigationLink = SiteLink & {
  menu?: MegaMenuKey;
};

export type MegaMenu = {
  eyebrow: string;
  title: string;
  description: string;
  overviewHref: string;
  items: Array<SiteLink & { image: string }>;
};

export const siteConfig = {
  name: "FIDO",
  legalName: "FIDO s.r.o.",
  description: "Fido je rodinná firma pôsobiaca od roku 2002, ktorá ponúka komplexné služby v oblasti stavebníctva a rekonštrukcií.",
  email: "kontakt@fido.sk",
  phoneDisplay: "+421 917 617 202",
  phoneHref: "tel:+421917617202",
  address: "Strojnícka 9, 080 06 Prešov",
  logo: "/wp-content/uploads/2025/06/fido-logo-e1749409207128.webp",
  icons: {
    favicon32: "/wp-content/uploads/2025/07/cropped-fido-logo-favicon-32x32.webp",
    favicon192: "/wp-content/uploads/2025/07/cropped-fido-logo-favicon-192x192.webp",
    appleTouch: "/wp-content/uploads/2025/07/cropped-fido-logo-favicon-180x180.webp",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100090156782092",
    instagram: "https://www.instagram.com/_fido.sk_/",
  },
} as const;

export const primaryNavigation: PrimaryNavigationLink[] = [
  { href: "/nehnutelnosti/", label: "Nehnuteľnosti", menu: "realestate" },
  { href: "/sluzby/nabytok-na-mieru/", label: "Nábytok", menu: "furniture" },
  { href: "/sluzby/okna-brany-a-dvere/", label: "Okná, Brány a dvere", menu: "windows" },
  { href: "/realizacie/", label: "Realizácie" },
  { href: "/sluzby/", label: "Ďalšie služby", menu: "services" },
  { href: "/o-nas/", label: "O nás" },
  { href: "/kontakt/", label: "Kontakt" },
];

export const footerServiceLinks: SiteLink[] = [
  { href: "/nehnutelnosti/", label: "Nehnuteľnosti" },
  { href: "/sluzby/okna-brany-a-dvere/", label: "Okná, Brány a Dvere" },
  { href: "/sluzby/nabytok-na-mieru/", label: "Nábytok" },
  { href: "/sluzby/rekonstrukcie-domov-a-bytov/", label: "Rekonštrukcie domov a bytov" },
  { href: "/sluzby/zamocnictvo/", label: "Zámočníctvo" },
  { href: "/sluzby/strojarstvo/", label: "Strojárstvo" },
  { href: "/sluzby/hodinovy-manzel/", label: "Hodinový manžel" },
  { href: "/sluzby/doprava/", label: "Doprava" },
  { href: "/sluzby/pozicovna-naradia/", label: "Požičovňa náradia" },
];

export const footerNavigation: SiteLink[] = [
  { href: "/realizacie/", label: "Realizácie" },
  { href: "/o-nas/", label: "O nás" },
  { href: "/kontakt/", label: "Kontakt" },
  { href: "/ochrana-osobnych-udajov/", label: "Ochrana osobných údajov" },
];

export const megaMenus: Record<MegaMenuKey, MegaMenu> = {
  realestate: {
    eyebrow: "Bývanie v Prešove a okolí",
    title: "Nehnuteľnosti",
    description: "Nové developerské projekty a bývanie, ktoré navrhujeme s dôrazom na kvalitu každého detailu.",
    overviewHref: "/nehnutelnosti/",
    items: [
      { label: "Rezidencia Ľubovec", href: "/rezidencia-lubovec/", image: "/wp-content/uploads/2025/09/Fido_LUBOVCE_Byt_prizemie_02_8-scaled-1-750x500.jpg" },
      { label: "Ponuka nehnuteľností", href: "/nehnutelnosti/", image: "/wp-content/uploads/2025/06/Fido_LUBOVCE_Rendre_Exterier_1F-1-scaled-1.jpg" },
    ],
  },
  furniture: {
    eyebrow: "Nábytok na mieru",
    title: "Nábytok",
    description: "Precízne riešenia navrhnuté pre váš priestor, štýl a každodenný život.",
    overviewHref: "/sluzby/nabytok-na-mieru/",
    items: [
      { label: "Vstavané skrine", href: "/sluzby/nabytok-na-mieru/vstavane-skrine/", image: "/wp-content/uploads/2025/06/fido-vstavana-skrina-a-02.webp" },
      { label: "Kuchynské linky", href: "/sluzby/nabytok-na-mieru/kuchynske-linky/", image: "/wp-content/uploads/2025/06/fido-kuchyna-c-12.webp" },
      { label: "Postele", href: "/sluzby/nabytok-na-mieru/postele/", image: "/wp-content/uploads/2025/06/fido-postel-02.webp" },
      { label: "Obývacie steny", href: "/sluzby/nabytok-na-mieru/obyvacie-steny/", image: "/wp-content/uploads/2025/06/fido-nabytok-02.webp" },
      { label: "Komody", href: "/sluzby/nabytok-na-mieru/komody/", image: "/wp-content/uploads/2025/06/fido-kupelna-b-03.webp" },
      { label: "Šatníky", href: "/sluzby/nabytok-na-mieru/satniky/", image: "/wp-content/uploads/2025/06/fido-vstavana-skrina-a-podlaha-06.webp" },
      { label: "Stoly", href: "/sluzby/nabytok-na-mieru/stoly/", image: "/wp-content/uploads/2025/06/fido-nabytok-35.webp" },
      { label: "Dekoračné panely", href: "/sluzby/nabytok-na-mieru/dekoracne-panely/", image: "/wp-content/uploads/2025/06/fido-deco-29.webp" },
    ],
  },
  windows: {
    eyebrow: "Okná, brány a dvere",
    title: "Otvory pre váš domov",
    description: "Kvalitné okná a dvere s odborným zameraním, dodaním a montážou.",
    overviewHref: "/sluzby/okna-brany-a-dvere/",
    items: [
      { label: "Plastové okná", href: "/sluzby/okna-brany-a-dvere/plastove-okna/", image: "/wp-content/uploads/2025/06/Okna.webp" },
      { label: "Hliníkové okná", href: "/sluzby/okna-brany-a-dvere/hlinikove-okna/", image: "/wp-content/uploads/2025/06/fido-rekonstrukcie-okna-a-dvere-03.webp" },
      { label: "Drevené okná", href: "/sluzby/okna-brany-a-dvere/drevene-okna/", image: "/wp-content/uploads/2025/06/fido-rekonstrukcie-okna-a-dvere-04.webp" },
      { label: "Oceľové okná", href: "/sluzby/okna-brany-a-dvere/ocelove-okna/", image: "/wp-content/uploads/2025/06/fido-rekonstrukcie-okna-a-dvere-05.webp" },
      { label: "Vchodové dvere", href: "/sluzby/okna-brany-a-dvere/vchodove-dvere-hlinikove/", image: "/wp-content/uploads/2025/06/fido-dvere-01.webp" },
      { label: "Posuvné dvere", href: "/sluzby/okna-brany-a-dvere/posuvne-dvere-hlinikove/", image: "/wp-content/uploads/2025/06/fido-dvere-02.webp" },
    ],
  },
  services: {
    eyebrow: "Komplexné riešenia",
    title: "Ďalšie služby",
    description: "Jeden spoľahlivý tím pre rekonštrukciu, výrobu, opravy aj dopravu.",
    overviewHref: "/sluzby/",
    items: [
      { label: "Rekonštrukcie", href: "/sluzby/rekonstrukcie-domov-a-bytov/", image: "/wp-content/uploads/2025/06/fido-rekonstrukcia-chaty-02.webp" },
      { label: "Zámočníctvo", href: "/sluzby/zamocnictvo/", image: "/wp-content/uploads/2025/06/fido-zamocnictvo.webp" },
      { label: "Strojárstvo", href: "/sluzby/strojarstvo/", image: "/wp-content/uploads/2025/06/fido-deco-01.webp" },
      { label: "Hodinový manžel", href: "/sluzby/hodinovy-manzel/", image: "/wp-content/uploads/2025/06/fido-team.webp" },
      { label: "Doprava", href: "/sluzby/doprava/", image: "/wp-content/uploads/2025/06/fido-shake-theory-27.webp" },
      { label: "Požičovňa náradia", href: "/sluzby/pozicovna-naradia/", image: "/wp-content/uploads/2025/06/fido-shake-theory-44.webp" },
    ],
  },
};
