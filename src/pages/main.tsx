
import * as React from "react";
import Canvas from "../components/canvas/canvas";
import { connect } from "react-redux";
import { ShapeTypes } from "../interfaces";
import ShapeOptions from "../components/button-groups/shape-options";

const Main: React.FC<{
    selectedShape: ShapeTypes,
}> = (props) => {

    return (
        <>
            <ShapeOptions />
            <Canvas selectedShape={props.selectedShape}/>  

        </>
    );
}

const mapStateToProps = (state: any) => ({
    selectedShape: state.shape.selectedShape
});

export default connect(mapStateToProps , null)(React.memo(Main));