import { ILine } from "./shapes";

interface IEvent {
    event_id: string;
    user_name: string;
    header: string;
    description: string;
    shape: any;
}

interface IPenEvent extends IEvent {
    shape: ILine[];
}

export type {IEvent, IPenEvent}; 