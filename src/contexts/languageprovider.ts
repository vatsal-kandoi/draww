import * as React from "react";
import { Languages } from "../interfaces/enums";
import { I18n } from "i18n-js";

const LanguageProviderContext = React.createContext({ 
    toggleLanguage: (language: Languages) => {}, 
    languageStore: {
        code: Languages.EN, 
        store: new I18n({})
    }
});

export default LanguageProviderContext;
