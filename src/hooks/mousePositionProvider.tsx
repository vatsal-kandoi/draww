import * as React from "react";

const useMousePositions = (): {
    current: { x: number, y: number}
    previous: { x: number, y: number},
} => {    
    const [positions, setPositions] = React.useState< {
        current: { x: number, y: number}
        previous: { x: number, y: number},
    }>({ current: { x: 0, y: 0 }, previous: { x: 0, y: 0 }});

    React.useEffect(() => {
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
              
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);

    return positions;
}

const useMousePress = (): boolean => {
    const [mousePressed, setMousePressed] = React.useState<boolean>(false);

    React.useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            setMousePressed(true);
        };
        const handleMouseUp = (event: MouseEvent) => {
            setMousePressed(false);
        };

        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousedown', handleMouseDown);

        return () => {
            window.removeEventListener(
                'mouseup',
                handleMouseUp
            );
            window.removeEventListener(
                'mousedown',
                handleMouseDown
            );            
        };
    }, []);    

    return mousePressed;
}

export { useMousePositions, useMousePress } ;