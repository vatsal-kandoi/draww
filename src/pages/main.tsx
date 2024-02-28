import * as React from "react";
import EventsMenu from '../components/toplevel/events-menu';
import DrawActions from "../components/button-groups/draw-actions";
import DrawCustomizations from "../components/button-groups/draw-customizations";
import CanvasInteractive from "../components/canvas/canvas-interactive";

const CanvasPage: React.FC<{}> = () => {
    return (
        <>
            <CanvasInteractive />
            <DrawActions />
            <EventsMenu />
            <DrawCustomizations />
        </>
    );
};

export default CanvasPage;