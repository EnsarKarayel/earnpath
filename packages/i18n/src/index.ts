export const supportedLocales = [
  { code: "tr", nativeName: "Türkçe", direction: "ltr" },
  { code: "en", nativeName: "English", direction: "ltr" },
  { code: "ar", nativeName: "العربية", direction: "rtl" },
  { code: "de", nativeName: "Deutsch", direction: "ltr" },
  { code: "es", nativeName: "Español", direction: "ltr" },
  { code: "fr", nativeName: "Français", direction: "ltr" },
  { code: "ru", nativeName: "Русский", direction: "ltr" },
  { code: "pt", nativeName: "Português", direction: "ltr" },
  { code: "hi", nativeName: "हिन्दी", direction: "ltr" }
] as const;

export type SupportedLocale = (typeof supportedLocales)[number]["code"];

export function isSupportedLocale(value: string): value is SupportedLocale {
  return supportedLocales.some((locale) => locale.code === value);
}

export function localeDirection(locale: string): "ltr" | "rtl" {
  return supportedLocales.find((item) => item.code === locale)?.direction ?? "ltr";
}

