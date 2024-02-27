import * as React from "react";
import { IPoint } from "../interfaces/shapes";

export const DEFAULT_NULL_POINT = { x: -1, y: -1 };

export const useMouseCurrentPositionProvider = (): IPoint => {
    const [positions, setPositions] = React.useState<IPoint>(DEFAULT_NULL_POINT);

    const updatePositions = (x: number, y: number) => setPositions({ x, y });

    const handleTouchMove = (event: TouchEvent) => updatePositions(
            event.changedTouches[0].clientX, 
            event.changedTouches[0].clientY
        )
    const handleMouseMove = (event: MouseEvent) => updatePositions(
            event.clientX, 
            event.clientY
        )

    React.useEffect(() => {                     
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);

        }
    });

    return positions;
}

export const useMousePressProvider = (): { mouseClickPosition: IPoint, isMouseClicked: boolean } => {    
    const [position, setPosition] = React.useState<IPoint>(DEFAULT_NULL_POINT);
    const [isMouseClicked, setIsMouseClicked] = React.useState<boolean>(false);

    const updatePositions = (x: number, y: number) => setPosition({ x, y });

    const handleTouchDown = (event: TouchEvent) => {
        console.log(event);
        updatePositions(
            event.changedTouches[0].clientX, 
            event.changedTouches[0].clientY
        )
        setIsMouseClicked(true)
    }
    const handleMouseDown = (event: MouseEvent) => {
        updatePositions(
            event.clientX, 
            event.clientY
        )
        setIsMouseClicked(true)
    }    
    const handleTouchOrMouseUp = (event: MouseEvent | TouchEvent) => {
        console.log(event);
        setIsMouseClicked(false);
        updatePositions(DEFAULT_NULL_POINT.x, DEFAULT_NULL_POINT.y);
    }
        
    React.useEffect(() => {
        window.addEventListener('mouseup', handleTouchOrMouseUp);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('touchend', handleTouchOrMouseUp);
        window.addEventListener('touchstart', handleTouchDown);


        return () => {
            window.removeEventListener('mouseup', handleTouchOrMouseUp);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('touchend', handleTouchOrMouseUp);
            window.removeEventListener('touchstart', handleTouchDown);            
        };
    }, []);    

    return {mouseClickPosition: position, isMouseClicked}    
}
