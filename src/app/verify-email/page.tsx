import VerifyEmail from "@/components/VerifyEmail";

type VerifyEmailPageProps = {
  searchParams?: Promise<{
    email?: string;
  }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const resolvedSearchParams = await searchParams;

  return <VerifyEmail initialEmail={resolvedSearchParams?.email ?? ""} />;
}
