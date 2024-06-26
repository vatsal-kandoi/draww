import { Button as ButtonBase } from '@mui/material';
import { styled } from '@mui/material/styles';


const Button = styled(ButtonBase)(({ theme }) => ({
    width: "1.75em",
    height: "1.75em",
    minWidth: "1.75em",
    borderRadius: "0.2em",
    marginRight: theme.spacing(2),
}));


export default Button;