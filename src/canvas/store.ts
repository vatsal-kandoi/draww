import { IUserEvent } from "../interfaces";

export class EventStore {
    private static instance: EventStore;

    private events: IUserEvent[] = [];

    /**
     * Get all user events currently in store
     * @returns All user events
     */
    public getAllEvents(): IUserEvent[] {
        return this.events;
    }

    /** Remove all events from the store */
    public reset() {
        this.events = [];
    }

    /**
     * Update the event in the store
     * @param event Event to be updated
     */
    public updateEvent(event: IUserEvent) {
        this.events = this.events.filter((evt) => evt.event_name !== event.event_name);
        this.events.push(event);        
    }

    /**
     * Add the user event to the store
     * @param event Event to be added
     */
    public addEvent(event: IUserEvent) {
        this.events.push(event);
    }


    /**
     * Get the event store
     * @returns Event store instance
     */
    public static getInstance(): EventStore {
        if (this.instance === undefined)
            this.instance = new EventStore();

        return this.instance;
    }
}

export class UserStore {
    private static instance: UserStore;

    private user_name: string = "";

    /**
     * Set the user name
     * @param user_name user name
     */
    public setUserName(user_name: string): void {
        this.user_name = user_name;
    }

    /**
     * Get the user name
     * @returns User name
     */
    public getUserName(): string {
        return this.user_name;
    }

    /**
     * Get the store
     * @returns User store instance
     */
    public static getInstance(): UserStore {
        if (this.instance === undefined)
            this.instance = new UserStore();

        return this.instance;
    }
}