import * as React from "react";
import { Languages } from "../interfaces/enums";
import createLanguageStore from "../i18n";
import LanguageProviderContext from "../contexts/languageprovider";

export function useLanguageStore() {
    const context = React.useContext(LanguageProviderContext);
    return context.i18n;
}

export function useLanguageProvider() {
    const i18n = createLanguageStore();

    const languageContextValue = {
        toggleLanguage: (language: Languages) => {
            i18n.locale = (language as string);
        },
        i18n: i18n
    }
    
    return languageContextValue;
}

