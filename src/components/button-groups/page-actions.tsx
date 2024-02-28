import * as React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import { styled } from '@mui/material/styles';
import { Tooltip } from "@mui/material";
import { useLanguageStore } from "../../hooks/languageprovider";
import ThemeToggle from "../buttons/theme-toggle";
import LanguageToggle from "../buttons/language-toggle";

const ActionButtonGroupContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: "100%"
}));

interface IPageActions {
    /** Hide the upload events button from the rendered content */
    showEventsUploadBtn: boolean;
    /** Hide the download events button from the rendered content */
    showEventsDownloadBtn: boolean;
    /** Action to be performed when the upload button is clicked */
    onEventsUploadBtnClick?: () => void;
    /** Action to be performed when the download button is clicked */
    onEventsDownloadBtnClick?: () => void;
}


const PageActions: React.FC<IPageActions> = (props) => {
    const i18n = useLanguageStore();

    return (
        <ActionButtonGroupContainer square={false} elevation={1}>
            <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2} 
                    component="div"
                    role="group"
                    aria-label={i18n.t("aria_buttons_groups_pageactions")}>
                {(props.showEventsUploadBtn) ? (
                    <Tooltip title={i18n.t("aria_buttons_upload")}>
                        <IconButton id="upload"
                                onClick={props.onEventsUploadBtnClick}
                                aria-label={i18n.t("aria_buttons_upload")}>
                            <UploadIcon />
                        </IconButton>
                    </Tooltip>                        
                ) : null}
                {(props.showEventsDownloadBtn) ? (
                    <Tooltip title={i18n.t("aria_buttons_download")}>
                        <IconButton id="download"
                                onClick={props.onEventsDownloadBtnClick}
                                aria-label={i18n.t("aria_buttons_download")}>
                            <DownloadIcon />                    
                        </IconButton>
                    </Tooltip>
                ) : null}
                <ThemeToggle />
                <LanguageToggle />
            </Stack>
        </ActionButtonGroupContainer>
    );
}


export default PageActions;