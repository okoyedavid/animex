import { Suspense, type ReactNode } from "react";
import NavBar from "@/components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <div className="lg:hidden">
        <Suspense fallback={null}>
          <NavBar />
        </Suspense>
      </div>
      <div className="pt-20 md:pt-0">{children}</div>
    </>
  );
}
