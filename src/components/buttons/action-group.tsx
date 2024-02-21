import * as React from "react";
import ThemeToggle from "./theme-toggle"
import LanguageToggle from "./language-toggle";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { useLanguageStore } from "../../hooks/languageprovider";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';

const ButtonStack = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
}));


const ActionButtonGroup: React.FC<{}> = () => {
    const i18n = useLanguageStore();

    return (
        <ButtonStack square={false}>
            <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2} >
                <IconButton id="upload"
                        aria-label={i18n.t("aria_buttons_upload")}>
                    <UploadIcon />
                </IconButton>
                <IconButton id="download"
                        aria-label={i18n.t("aria_buttons_download")}>
                    <DownloadIcon />                    
                </IconButton>
                <ThemeToggle />
                <LanguageToggle />
            </Stack>
        </ButtonStack>
    );
}


export default ActionButtonGroup;