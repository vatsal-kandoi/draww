
import { ICanvasThemeBasedProperties } from "../../../canvas/properties/theme";
import { ICanvasUserEventProperties } from "../../../canvas/properties/user";
import { IUserCanvasActionBase } from "../base";


export interface IUserCanvasActionThemeBasedPropertiesChange extends IUserCanvasActionBase {
    /** Theme based properties of the canavs to be used by the worker */
    properties: ICanvasThemeBasedProperties
}

export interface IUserCanvasActionPropertiesChange extends IUserCanvasActionBase {
    /** Properties of the canavs to be used by the worker */
    properties: ICanvasUserEventProperties
}