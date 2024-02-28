import * as React from "react";
import { IPoint } from "../interfaces/shapes";

export const DEFAULT_NULL_POINT = { x: -1, y: -1 };

/**
 * Listen for the mouse's current position on the screen 
 * @returns Current mouse position
 */
export const useMouseCurrentPositionProvider = (): {
    clickPosition: IPoint,
    currentPositions: IPoint,
    onClick: boolean
 } => {
    const [clickPositions, setClickPositions] = React.useState<IPoint>(DEFAULT_NULL_POINT);
    const [isMouseClicked, setIsMouseClicked] = React.useState<boolean>(false);
    const [currentPositions, setCurrentPositions] = React.useState<IPoint>(DEFAULT_NULL_POINT);

    const updateCurrentPositions = (x: number, y: number) => {
        setCurrentPositions({ x, y });
    }
    const updateClickPositions = (x: number, y: number) => {
        setCurrentPositions({ x, y })
        setClickPositions({ x, y });
        setIsMouseClicked(true);
    }
    const setMouseRelease = () => {
        setIsMouseClicked(false);
    } 

    const handleTouchMove = (event: TouchEvent) => updateCurrentPositions(
            event.changedTouches[0].clientX, 
            event.changedTouches[0].clientY
        )
    const handleMouseMove = (event: MouseEvent) => updateCurrentPositions(
            event.clientX, 
            event.clientY
        )

    const handleTouchDown = (event: TouchEvent) => updateClickPositions( 
        event.changedTouches[0].clientX, 
        event.changedTouches[0].clientY
    )

    const handleMouseDown = (event: MouseEvent) =>  updateClickPositions( 
        event.clientX, 
        event.clientY
    )

    const handleTouchOrMouseUp = (event: MouseEvent | TouchEvent) => setMouseRelease();            
    
    React.useEffect(() => {                     
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('mouseup', handleTouchOrMouseUp);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('touchend', handleTouchOrMouseUp);
        window.addEventListener('touchstart', handleTouchDown);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseup', handleTouchOrMouseUp);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('touchend', handleTouchOrMouseUp);
            window.removeEventListener('touchstart', handleTouchDown);            
        }
    });

    return {
        currentPositions: currentPositions,
        clickPosition: clickPositions,
        onClick: isMouseClicked
    };
}