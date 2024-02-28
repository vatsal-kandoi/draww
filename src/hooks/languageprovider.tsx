import * as React from "react";
import { Languages } from "../interfaces/enums";
import createLanguageStore from "../i18n";
import LanguageProviderContext from "../contexts/languageprovider";
import { I18n } from "i18n-js";

export function useLanguageStore() {
    const context = React.useContext(LanguageProviderContext);
    return context.languageStore.store;
}

export function useLanguageCode() {
    const context = React.useContext(LanguageProviderContext);
    return context.languageStore.code;
}

export function useLanguageProvider() {
    const [languageStore, setLanguageStore] = React.useState<{ code: Languages, store: I18n }>({
        code: Languages.EN,
        store: createLanguageStore("en")
    })

    const languageContextValue = {
        toggleLanguage: (language: Languages) => {
            setLanguageStore({
                code: language,
                store: createLanguageStore(language)
            });
        },
        languageStore: languageStore
    }
    
    return languageContextValue;
}

