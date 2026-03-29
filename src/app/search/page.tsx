import SearchView from "./SearchView";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  return <SearchView query={params.q ?? ""} />;
}
