import { DEFAULT_POINT, ISquare, IUserEvent, Point } from "../../../interfaces";
import comparePoints from "../../../utils/canvas/comparePoints";
import { Renderer } from "../../render";
import { UserStore } from "../../store";
import { UserSquareEvent } from "../../structures/events/square";
import { Square } from "../../structures/shapes/square";
import { ShapeCaptureManagerBase } from "./base";

export class SquareCaptureManager extends ShapeCaptureManagerBase{

    private start_coordinates: Point = DEFAULT_POINT;
    private is_mouse_down: boolean = false;
    private shape: ISquare | null = null;

    /**
     * Handle movements of mouse, and render accordingly
     * @param point Cursor on point
     * @param is_mouse_down Whether mouse is clicked
     */
     public onMouseMovement(point: Point, is_mouse_down: boolean): IUserEvent | null {
        /** When the user has just started capturing and cannot draw till now */
        if (comparePoints(this.start_coordinates, DEFAULT_POINT) && !this.is_mouse_down) {
            if (is_mouse_down) {
                this.start_coordinates = point;
                this.is_mouse_down = true;
            }
            return null;
        }

        // Continue capturing line
        if (is_mouse_down) {
            this.continueCapturingSquare(point);
            return null;
        } else {
            return this.completeCapturingSquare();
        }
    }


    private continueCapturingSquare(point: Point) {
        const square = new Square(this.start_coordinates, point, this.properties.border_color);                

        this.shape = square;
        const renderer = Renderer.getInstance()
        renderer.clearLayer();
        renderer.renderShape(square);
    }

    private completeCapturingSquare(): IUserEvent | null {
        const renderer = Renderer.getInstance();
        const user_store = UserStore.getInstance();

        if (this.shape === null) return null;

        const event = new UserSquareEvent(
            renderer.current_canvas_dimensions,
            user_store.getUserName(),
            this.shape,            
        );
        
        renderer.clearLayer();
        renderer.renderEvent(event);

        this.shape = null;
        this.start_coordinates = DEFAULT_POINT;
        this.is_mouse_down = false;
        return event;
    }
}