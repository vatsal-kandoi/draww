
import * as React from "react";
import Canvas from "../../components/canvas";
import CanvasShapeOptions from "./canvas/options";
import CanvasProperties from "./canvas/properties";
import Page from "../../components/page";


export interface IHomeProps { }

const Home: React.FC<IHomeProps> = (props) => {

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
            />
        </Page>
    );
}

export default Home;