import * as React from "react";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Container = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: theme.spacing(1),
    left: `calc(50% - 50px)`,
    width: "100px",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),    
}));

export interface ICanvasOptionsProps {    
    /** Children for the options. Consists of the options */
    children: React.ReactElement;
}

const CanvasOptions: React.FC<ICanvasOptionsProps> = (props) => {

    return (
        <Container square={false} 
                elevation={1}>
            {props.children}
        </Container>
    );
};

export default React.memo(CanvasOptions);