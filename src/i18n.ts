import { I18n } from "i18n-js";
import enTranslations from "./translations/en";
import espTranslations from "./translations/esp";

export default function createLanguageStore(lang: string) {
    const i18n = new I18n({
        en : enTranslations,
        esp: espTranslations
    });
    
    i18n.defaultLocale = lang;
    i18n.locale = lang;
    i18n.enableFallback = true;
    
    return i18n;
}
