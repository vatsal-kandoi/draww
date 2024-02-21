import { I18n } from "i18n-js";
import enTranslations from "./translations/en";

export default function createLanguageStore() {
    const i18n = new I18n({
        en : enTranslations
    });
    
    i18n.defaultLocale = "en";
    i18n.locale = "en";
    i18n.enableFallback = true;
    
    return i18n;
}
