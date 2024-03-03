import { useSelector } from "react-redux";
import { CanvasActionType } from "../../../interfaces/enums";
import React from "react";
import { EventBase } from "../../events/structures/base";
import { ICanvasRefs } from "../canvas-base";
import { IPoint } from "../../../interfaces";


const useSelectionManager = (    
    canvasRefs: ICanvasRefs | null,
    clickPosition: IPoint,
    currentPositions: IPoint,
    onClick: boolean,
) => {
    const actionType = useSelector((state: any) => state?.selectedCanvasAction?.activeCanvasActionType as CanvasActionType);
    const events: EventBase[] = useSelector(state => (state as any)?.events.events);
    const [selectedEvent, setSelectedEvent] = React.useState<{ event: EventBase, clickPosition: IPoint} | null>(null);


    const onEventSelected = (event: EventBase, clickPos: IPoint) => {
        if (canvasRefs === null) return;
        canvasRefs.clearCanvas();
        events.forEach((ev) => {
            if (!ev.isEqual(event)) {
                canvasRefs.renderEventOnCanvas(ev);
            } else {
                canvasRefs.renderSelectedEventOnLayer(ev);   
            }
        })
        setSelectedEvent({event, clickPosition: clickPos});
    }

    const onReset = () => {
        if (canvasRefs === null) return;
        canvasRefs.clearCanvas();
        canvasRefs.clearLayer();
        events.forEach((ev) => {
            canvasRefs.renderEventOnCanvas(ev);
        })

        setSelectedEvent(null);
    }

    React.useEffect(() => {
        if (actionType !== CanvasActionType.NONE) {
            onReset();
            return;   
        }
        if(onClick) {
            for(let i = events.length - 1; i>=0; i--) {
                if (events[i].hasOverlapWithCoordinates(clickPosition)) {
                    onEventSelected(events[i], clickPosition);
                    break;
                }
            }                
        } else {

        }
    }, [onClick, clickPosition, actionType, events]);
};

export default useSelectionManager;