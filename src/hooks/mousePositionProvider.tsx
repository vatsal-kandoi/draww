import * as React from "react";

const useMousePositions = (captureMousePosition: boolean): {
    current: { x: number, y: number}
    previous: { x: number, y: number},
} => {    
    const [positions, setPositions] = React.useState< {
        current: { x: number, y: number}
        previous: { x: number, y: number},
    }>({ current: { x: 0, y: 0 }, previous: { x: 0, y: 0 }});

    React.useEffect(() => {
        const handleTouchMove = (event: TouchEvent) => {
            setPositions((prevState) => {
                return {
                    current: {
                        x: event.changedTouches[0].clientX,
                        y: event.changedTouches[0].clientY,
                    },
                    previous: {
                        x: prevState.current.x,
                        y: prevState.current.y,
                    }        

                }
            });
        }
        const handleMouseMove = (event: MouseEvent) => {
            setPositions((prevState) => {
                return {
                    current: {
                        x: event.clientX,
                        y: event.clientY,
                    },
                    previous: {
                        x: prevState.current.x,
                        y: prevState.current.y,
                    }        

                }
            });
        }
              
        if (captureMousePosition) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchmove', handleTouchMove);
        }
        return () => {
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, [captureMousePosition]);

    return positions;
}

const useMousePress = (captureMousePosition: boolean): boolean => {
    const [mousePressed, setMousePressed] = React.useState<boolean>(false);

    React.useEffect(() => {
        const handleMouseDown = (event: MouseEvent | TouchEvent) => {
            setMousePressed(true);
        };
        const handleMouseUp = (event: MouseEvent | TouchEvent) => {
            setMousePressed(false);
        };

        if (captureMousePosition) {
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('mousedown', handleMouseDown);
            window.addEventListener('touchend', handleMouseUp);
            window.addEventListener('touchstart', handleMouseDown);
        }

        return () => {
            window.removeEventListener(
                'touchend',
                handleMouseUp
            );
            window.removeEventListener(
                'touchstart',
                handleMouseDown
            );            
            window.removeEventListener(
                'mouseup',
                handleMouseUp
            );
            window.removeEventListener(
                'mousedown',
                handleMouseDown
            );            
        };
    }, [captureMousePosition]);    

    return mousePressed;
}

export { useMousePositions, useMousePress } ;