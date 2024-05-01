import * as React from "react";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Container = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(3),
    width: "300px",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
}));

export interface ICanvasPropertiesProps {    
    /** Children for the options. Consists of the options */
    children: React.ReactElement;
}

const CanvasProperties: React.FC<ICanvasPropertiesProps> = (props) => {

    return (
        <Container square={false} 
                elevation={1}>
            {props.children}
        </Container>
    );
};

export default React.memo(CanvasProperties);