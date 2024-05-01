import { DEFAULT_POINT, IShape, IUserEvent, Point } from "../interfaces";
import { ShapeBase } from "./structures/shapes/base";
import { EventStore } from "./store";

interface OnLayerObjects {
    /** Events on layer & not on canvas */
    events: IUserEvent[]; 
    /** Shapes on layer & not on canvas */
    shapes: IShape[];
}

export class Renderer {
    private static instance: Renderer;

    /** HTML offscreen canvas */
    canvas: OffscreenCanvasRenderingContext2D | null = null;
    /** Temporary HTML offscreen layer */
    layer: OffscreenCanvasRenderingContext2D | null = null;
    /** Canvas dimensions */
    current_canvas_dimensions: Point = DEFAULT_POINT;
    /** Events & shapes on layer and not on canvas */
    currently_on_layer: OnLayerObjects = {
        events: [],
        shapes: [],
    };
    /** Outline color for the selection border box */
    select_outline_color: string = "#000"


    /**
     * Initialise the canvas and store the context
     * @param canvas HTML offscreen canvas
     * @param dimensions canvas dimensions
     */
    public initializeCanvas(canvas: OffscreenCanvas, dimensions: Point): void {
        const context = canvas.getContext("2d");

        if (context === null)
            return;

        this.canvas = context as OffscreenCanvasRenderingContext2D;
        this.current_canvas_dimensions = dimensions;
    }

    /**
     * Initialise the canvas and store the context for the temporary layer
     * @param canvas HTML offscreen canvas for the layer
     */
    public initializeLayer(canvas: OffscreenCanvas) {
        const context = canvas.getContext("2d");

        if (context === null)
            return;

        this.layer = context as OffscreenCanvasRenderingContext2D;
    }

    /**
     * Initialize the outline color
     * @param color Color to be selected
     */
    public initializeSelectOutlineColor(color: string) {
        this.select_outline_color = color;
    }

    
    /**
     * Get the renderer instance
     * @returns Renderer instance
     */
    public static getInstance(): Renderer {
        if (this.instance === undefined)
            this.instance = new Renderer();

        return this.instance;
    }

    /**
     * Render the event on the main canvas
     * @param event User event
     */
    public renderEvent(event: IUserEvent): void {
        if (this.canvas === null) return;
        event.render(this.canvas, this.current_canvas_dimensions);
    }

    /**
     * Render the shape on the temporary layer
     * @param shape Shape
     */
    public renderShape(shape: ShapeBase): void {
        if (this.layer === null) return;
        shape.render(this.layer, this.current_canvas_dimensions, this.current_canvas_dimensions);
        this.currently_on_layer.shapes.push(shape);
    }

    /**
     * Push the objects in the temporary layer onto the canvas
     */
    public pushObjectsOntoCanvas(): void {
        this.currently_on_layer.events.forEach((event) => {
            if(this.canvas === null) return;
            event.render(this.canvas, this.current_canvas_dimensions);
        })
        this.currently_on_layer.shapes.forEach((shape) => {
            if(this.canvas === null) return;
            shape.render(this.canvas, this.current_canvas_dimensions, this.current_canvas_dimensions);
        })
        this.clearLayer();
    }

    /**
     * Select the event by rendering it on the temporary layer and render remaining events on the main
     * canvas
     * @param event User event
     */
    public select(event: IUserEvent) {
        this.clearCanvas();
        this.clearLayer();
        const events = EventStore.getInstance().getAllEvents();
        
        events.forEach((ev: IUserEvent) => {
            if (this.canvas === null) return;
            if (!ev.isEqual(event))
                ev.render(this.canvas, this.current_canvas_dimensions);
        })

        if (this.layer === null) return;
        event.select(this.layer, this.current_canvas_dimensions, this.select_outline_color);
        this.currently_on_layer.events.push(event);
    }

    /** Shift the event & render the shifted event on the layer */
    public shift(event: IUserEvent) {
        this.clearLayer();

        if (this.layer === null) return;
        event.select(this.layer, this.current_canvas_dimensions, this.select_outline_color);
        this.currently_on_layer.events.push(event);
    }

    /** 
     * Render all the events in the store
     */
    public renderAllEvents(): void {
        this.clearCanvas();
        this.clearLayer();
        const events = EventStore.getInstance().getAllEvents();
        
        events.forEach((event: IUserEvent) => {
            if (this.canvas === null) return;
            event.render(this.canvas, this.current_canvas_dimensions);
        });
    }

    /**
     * Clear the main canvas of all events
    */
    public clearCanvas() {
        if (this.canvas === null) return;
        this.clearContext(this.canvas);
    }

    /**
     * Clear the main canvas of all events & shapes
    */
    public clearLayer() {   
        if (this.layer === null) return;
        this.clearContext(this.layer);
        this.currently_on_layer = {events: [], shapes: []};
    }

    /**
     * Clear the context of any events & shapes
     * @param context HTML canvas offscreen 2D context
     */
    private clearContext(context: OffscreenCanvasRenderingContext2D) {
        context.clearRect(
            0,
            0,
            this.current_canvas_dimensions.x,
            this.current_canvas_dimensions.y
        )
    }
}