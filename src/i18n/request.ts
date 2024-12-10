import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { ILanguage, routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as ILanguage)) notFound();

  const homeMessages = (await import(`../../messages/home/${locale}.json`))
    .default;

  return {
    messages: { ...homeMessages },
  };
});
