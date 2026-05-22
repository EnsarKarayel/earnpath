import { localeDirection } from "@earnpath/i18n";
import type { ReactNode } from "react";

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <div lang={locale} dir={localeDirection(locale)}>{children}</div>;
}
