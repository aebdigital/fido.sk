import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NativeSnapshot } from "@/components/native-snapshot";
import { getNativePage, nativeRouteParams } from "@/lib/native-page";

type RouteProps = {
  params: Promise<{ slug: string[] }>;
};

function pathnameFor(slug: string[]) {
  return `/${slug.join("/")}/`;
}

export function generateStaticParams() {
  return nativeRouteParams();
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const pathname = pathnameFor(slug);
  const page = getNativePage(pathname);

  if (!page) return {};

  const pageTitle = page.title;
  const pageDesc = page.description || "Kompletné rekonštrukcie na kľúč, okná, dvere a nábytok na mieru.";
  const pageUrl = `https://fido.sk${pathname}`;

  return {
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: pageUrl,
      siteName: "FIDO",
      images: [
        {
          url: "/wp-content/uploads/2025/06/fido-logo-e1749409207128.webp",
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: "sk_SK",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
      images: ["/wp-content/uploads/2025/06/fido-logo-e1749409207128.webp"],
    },
  };
}

export default async function NativeRoute({ params }: RouteProps) {
  const { slug } = await params;
  const page = getNativePage(pathnameFor(slug));
  if (!page) notFound();

  return <NativeSnapshot page={page} />;
}
