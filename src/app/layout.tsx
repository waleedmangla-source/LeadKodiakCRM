import type { Metadata } from "next";
import "./globals.css";
import { QuickActionModal } from "@/components/layout/QuickActionModal";
import { SoftphoneDialer } from "@/components/layout/SoftphoneDialer";
import { GlobalSearchModal } from "@/components/layout/GlobalSearchModal";

export const metadata: Metadata = {
  title: "GoHighLevel Alternative | Full-Stack Multi-Tenant CRM",
  description: "A 1:1 Recreation of GoHighLevel including Agency/Location hierarchy, visual funnels, omnichannel inbox, workflows, and SaaS rebilling.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full font-sans bg-slate-50 text-slate-900 overflow-hidden antialiased">
        {children}
        <QuickActionModal />
        <SoftphoneDialer />
        <GlobalSearchModal />
      </body>
    </html>
  );
}
