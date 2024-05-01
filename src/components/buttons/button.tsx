import { Button as ButtonBase } from '@mui/material';
import { styled } from '@mui/material/styles';


const Button = styled(ButtonBase)(({ theme }) => ({
    width: "1.5em",
    height: "1.5em",
    minWidth: "1.5em",
    borderRadius: "0.2em",
    marginRight: theme.spacing(2),
}));


export default Button;