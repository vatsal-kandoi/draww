import * as React from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useLanguageCode, useLanguageStore } from "../../hooks/languageprovider";
import LanguageProviderContext from "../../contexts/languageprovider";
import { Languages } from "../../interfaces/enums";
import { Tooltip } from "@mui/material";
import { getLanguageCode, getLanguageName } from "../utils";


const LanguageToggle: React.FC<{}> = () => {    
    const languageContext = React.useContext(LanguageProviderContext);
    const i18n = useLanguageStore();
    const code = useLanguageCode();
    const [language, setLanguage] = React.useState<string>(getLanguageName(code));

    const handleChange = (event: SelectChangeEvent, _: any) => {
        const lang = (event.target.value as string);
        const code = getLanguageCode(lang);
        setLanguage(lang)
        languageContext.toggleLanguage(code);
    }

    return (
        <Tooltip title={i18n.t(`aria_select_language`)}>
            <FormControl size="small" 
                    aria-hidden={true}>
                <Select value={language}
                        onChange={handleChange} 
                        aria-label={i18n.t("aria_select_language")}>
                    <MenuItem value={"English"}>English</MenuItem>
                    <MenuItem value={"Espanol"}>Espanol</MenuItem>
                </Select>
            </FormControl>
        </Tooltip>
    );
}

export default LanguageToggle;