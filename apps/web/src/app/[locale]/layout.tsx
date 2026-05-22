import "../globals.css";
import { localeDirection } from "@earnpath/i18n";
import type { ReactNode } from "react";

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string } | Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} dir={localeDirection(locale)}>
      <body>{children}</body>
    </html>
  );
}
