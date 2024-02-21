
function calculateLeftForElement(objElement: HTMLElement) {
    var iOffset = 0;

    while(true) {
        iOffset += objElement.offsetLeft;
        if (objElement.offsetParent === null) 
            break;
            
        objElement = objElement.offsetParent as HTMLElement;
    }

    return iOffset;
}


function calculateTopForElement(objElement: HTMLElement) {
    var iOffset = objElement.offsetHeight;

    while(true) {
        iOffset += objElement.offsetTop;
        if (objElement.offsetParent === null) 
            break;
            
        objElement = objElement.offsetParent as HTMLElement;
    }

    return iOffset;
}

export {calculateLeftForElement, calculateTopForElement};