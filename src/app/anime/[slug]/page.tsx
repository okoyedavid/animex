import { notFound } from "next/navigation";
import AnimeDetails from "./AnimeDetails";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not configured.");
  }

  const res = await fetch(`${baseUrl}/anime/${slug}/full`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    notFound();
  }

  const payload = await res.json();

  if (!payload?.data) {
    notFound();
  }

  return <AnimeDetails data={payload.data} />;
}
