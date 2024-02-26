import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ThemeToggle from '../components/buttons/theme-toggle';
import LanguageToggle from '../components/buttons/language-toggle';
import { IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";

const ButtonContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),    
}));

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



const AuthPage: React.FC<{ registerName: any}> = (props) => {
    const [name, setName] = React.useState<string>("");
    const navigate = useNavigate();

    const handleNameSubmit = () => {
        props.registerName(name);
        navigate("/home");
    }

    return (
        <>
        <Container elevation={0}>
            <ButtonContainer square={false} elevation={1}>
                <Stack direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2} >
                    <ThemeToggle />
                    <LanguageToggle />
                </Stack>
            </ButtonContainer>        
            <Box component="form">
                <FormContainer elevation={1}>
                    <Box>
                        <h2>Please enter your name</h2>
                    </Box>
                    <Stack direction={"column"}
                        alignContent={"center"}
                        justifyContent={"center"}>
                        <Stack direction="row"
                                alignItems="center"
                                spacing={2} >
                            <TextField id="input_name" 
                                    label="Name"
                                    value={name}
                                    onChange={(event: any) => setName(event.target.value)} 
                                    variant="outlined" />
                            <IconButton aria-label="Submit" color="primary" onClick={handleNameSubmit}>
                                <SendIcon />
                            </IconButton>
                        </Stack>
                    </Stack>                 
                </FormContainer>
            </Box>  
        </Container>
        </>
    );
}

const mapDispatchToProps = (dispatch: any) => ({
    registerName: (name: string) => dispatch({ 
        type: "SET",
        payload: name
    }),
});
  
export default connect(null, mapDispatchToProps)(AuthPage);