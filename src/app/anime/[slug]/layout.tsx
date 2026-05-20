import { Suspense, type ReactNode } from "react";
import NavBar from "@/components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Suspense fallback={null}>
        <NavBar />
      </Suspense>
      <div className="pt-20">{children}</div>
    </>
  );
}
