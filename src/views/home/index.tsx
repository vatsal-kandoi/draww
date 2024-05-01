
import * as React from "react";
import Canvas from "../../components/canvas";
import CanvasShapeOptions from "./canvas/options";
import CanvasProperties from "./canvas/properties";
import Page from "../../components/page";
import { IUserEventJSON, UserCanvasActionType } from "../../interfaces";
import { connect } from "react-redux";


export interface IHomeProps {
    /** Add the new event to the state */
    onEventChangeHandler: (event: IUserEventJSON) => void;
}

const Home: React.FC<IHomeProps> = (props) => {

    const { onEventChangeHandler } = props;

    return (
        <Page>
            <Canvas 
                renderShapeOptions={(props) => (
                    <CanvasShapeOptions onShapeChange={props.onShapeChange} 
                            shape={props.shape} />
                )}
                renderCanvasProperties={(props) => (
                    <CanvasProperties onPropertiesChange={props.onPropertiesChange}
                            shape={props.shape} />
                )}
                onEventChangeHandler={onEventChangeHandler}
            />
        </Page>
    );
}

const mapDispatchToProps = (dispatch: any) => ({
    onEventChangeHandler: (event: IUserEventJSON) => {
        dispatch({
            type: UserCanvasActionType.CANVAS_EVENTS_ADDED,
            payload: event
        })
    },
});

export default connect(null , mapDispatchToProps)(React.memo(Home));