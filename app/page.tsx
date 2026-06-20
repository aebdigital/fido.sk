import { notFound } from "next/navigation";
import { NativeSnapshot } from "@/components/native-snapshot";
import { getNativePage } from "@/lib/native-page";

export const revalidate = 3600;

export default function HomePage() {
  const page = getNativePage("/");
  if (!page) notFound();
  return <NativeSnapshot page={page} />;
}
