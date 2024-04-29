import { IUserCanvasActionBase } from "../base";

export interface IUserCanvasActionInitializeUser extends IUserCanvasActionBase {
    /** user name of user drawing shapes */
    user_name: string;
}