import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ThemeToggle from '../components/buttons/theme-toggle';
import LanguageToggle from '../components/buttons/language-toggle';
import { IconButton, TextField, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import PageActions from '../components/button-groups/page-actions';
import { useLanguageStore } from '../hooks/languageprovider';

const Container = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));

const FormContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(4),
}));

const PageActionsBtnContainer = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(3), 
}));



const AuthPage: React.FC<{ 
    setUserName: (username: string) => void;
}> = (props) => {
    const i18n = useLanguageStore();
    const [name, setName] = React.useState<string>("");
    const navigate = useNavigate();

    const handleNameSubmit = () => {
        props.setUserName(name);
        navigate("/home");
    }

    return (
        <>
        <Container elevation={0}>
            <PageActionsBtnContainer>
                <PageActions showEventsDownloadBtn={false}
                        showEventsUploadBtn={false} />
            </PageActionsBtnContainer>        

            <Box component="form"
                    onSubmit={handleNameSubmit}>
                <FormContainer elevation={1}>
                    <Box>
                        <h2>{i18n.t("messages_name")}</h2>
                    </Box>
                    <Stack direction="row"
                            alignItems="center"
                            spacing={2} >
                        <TextField id="input_name" 
                                label={i18n.t("aria_inputs_name")}
                                aria-label={i18n.t("aria_inputs_name")}
                                value={name}
                                onChange={(event: any) => setName(event.target.value)} 
                                variant="outlined" />
                        <Tooltip title={i18n.t("aria_buttons_submit_name")}>
                            <IconButton aria-label={i18n.t("aria_buttons_submit_name")} 
                                    color="primary" 
                                    onClick={handleNameSubmit}>
                                <SendIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </FormContainer>
            </Box>  
        </Container>
        </>
    );
}

const mapDispatchToProps = (dispatch: any) => ({
    setUserName: (name: string) => dispatch({ 
        type: "SET",
        payload: name
    }),
});
  
export default connect(null, mapDispatchToProps)(AuthPage);