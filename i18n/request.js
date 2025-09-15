

//  import { cookies } from "next/headers";
//  import { getRequestConfig } from "next-intl/server";
// import en from '../messages/en.json';
// import bn from '../messages/bn.json';

// export default getRequestConfig(async () => {
//   const cookieStore = cookies();
//   const supportedLocales = ["en", "bn"];
//   const defaultLocale = "en";

//   const cookieLocale = cookieStore.get("language")?.value;
//   const locale = supportedLocales.includes(cookieLocale) ? cookieLocale : defaultLocale;

//   const messages = {
//     en,
//     bn
//   };

//   return {
//     locale,
//     messages: messages[locale]
//   };
// });




import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import en from "../messages/en.json";
import bn from "../messages/bn.json";

export default getRequestConfig(async () => {

  const cookieStore = await cookies();

  const supportedLocales = ["en", "bn"];
  const defaultLocale = "en";

  const cookieLocale = cookieStore.get("language")?.value;
  const locale = supportedLocales.includes(cookieLocale) ? cookieLocale : defaultLocale;

  const messages = {
    en,
    bn,
  };

  return {
    locale,
    messages: messages[locale],
  };
});
