import * as React from "react";
import EventsMenu from '../components/toplevel/events-menu';
import CanvasActionBar from '../components/toplevel/action-bar';
import AdditionalPropertiesSelector from "../components/toplevel/properties-bar";
import Canvas from '../components/toplevel/canvas';

const CanvasPage: React.FC<{}> = () => {
    return (
        <>
            <Canvas />
            <CanvasActionBar />
            <EventsMenu />
            <AdditionalPropertiesSelector />
        </>
    );
};

export default CanvasPage;