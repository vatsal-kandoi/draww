import * as React from "react";

/**
 * Set-up a component based timer which can be controlled externally from a component
 * @param trigger Trigger to listen to re-render timer
 * @param trigger secondary trigger to listen to re-render timer
 * @param shouldContinue Function validate whether it should set-up next tick 
 * @param action Function to perform on  next tick
 */
const useTimer = (
    trigger: any,
    secondaryTrigger: any,
    shouldContinue: () => boolean, 
    action: () => void,
    fallbackAction: () => void ) => {

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (!shouldContinue()) {
                fallbackAction();
            } else {
                action();
            }
        }, 500);

        return () => {
            clearTimeout(timer);
        }
    }, [trigger, secondaryTrigger]);
}

export default useTimer;