import * as React from "react";
import LanguageProviderContext from "../../contexts/languageprovider";
import { Languages } from "../../interfaces/enums";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLanguageStore } from "../../hooks/languageprovider";


const LanguageToggle: React.FC<{}> = () => {    
    const languageContext = React.useContext(LanguageProviderContext);
    const [language, setLanguage] = React.useState<string>("English");
    const i18n = useLanguageStore();

    const getLanguageCode = (language: string) => {
        if (language === "English") {
            return Languages.EN;
        }
        return Languages.EN;
    }

    const handleChange = (event: SelectChangeEvent, _: any) => {
        const lang = (event.target.value as string);
        const code = getLanguageCode(lang);
        setLanguage(lang)
        languageContext.toggleLanguage(code);
    }

    return (
        <FormControl size="small">
            <Select value={language}
                    onChange={handleChange} 
                    aria-label={i18n.t("aria_select_language")}>
                <MenuItem value={"English"}>English</MenuItem>
            </Select>
        </FormControl>
    );
}

export default LanguageToggle;