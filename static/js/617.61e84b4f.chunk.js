(()=>{"use strict";const t={x:-1,y:-1};let e=function(t){return t.NONE="NONE",t.PEN="PEN",t.SQUARE="SQUARE",t}({}),s=function(t){return t.CANVAS_INITIALIZE_USER="CANVAS_INITIALIZE_USER",t.CANVAS_INITIALIZE_MAIN_CANVAS="CANVAS_INITIALIZE_MAIN_CANVAS",t.CANVAS_INITIALIZE_TEMPORARY_LAYER="CANVAS_INITIALIZE_TEMPORARY_LAYER",t.CANVAS_CHANGE_SELECTED_SHAPE="CANVAS_CHANGE_SELECTED_SHAPE",t.CANVAS_CHANGE_MOUSE_POSITION="CANVAS_CHANGE_MOUSE_POSITION",t.CANVAS_CHANGE_DRAWING_PROPERTIES="CANVAS_CHANGE_DRAWING_PROPERTIES",t.CANVAS_CHANGE_THEME_BASED_PROPERTIES="CANVAS_CHANGE_THEME_BASED_PROPERTIES",t.CANVAS_EVENTS_ADDED="CANVAS_EVENTS_ADDED",t.CANVAS_EVENTS_LOAD="CANVAS_EVENTS_LOAD",t.CANVAS_EVENTS_DELETE_ALL="CANVAS_EVENTS_DELETE_ALL",t}({});const n={border_color:"#000"};class i{constructor(){this.properties=n}onCanvasDrawingPropertiesChange(t){this.properties=t}onMouseMovement(t,e){throw new Error("Not implemented")}}function a(t,e){return t.x===e.x&&t.y===e.y}class o{constructor(){this.events=[]}getAllEvents(){return this.events}updateEvent(t){this.events=this.events.filter((e=>e.event_name!==t.event_name)),this.events.push(t)}addEvent(t){this.events.push(t)}static getInstance(){return void 0===this.instance&&(this.instance=new o),this.instance}}o.instance=void 0;class r{constructor(){this.user_name=""}setUserName(t){this.user_name=t}getUserName(){return this.user_name}static getInstance(){return void 0===this.instance&&(this.instance=new r),this.instance}}r.instance=void 0;class h{constructor(){this.canvas=null,this.layer=null,this.current_canvas_dimensions=t,this.currently_on_layer={events:[],shapes:[]},this.select_outline_color="#000"}initializeCanvas(t,e){const s=t.getContext("2d");null!==s&&(this.canvas=s,this.current_canvas_dimensions=e)}initializeLayer(t){const e=t.getContext("2d");null!==e&&(this.layer=e)}initializeSelectOutlineColor(t){this.select_outline_color=t}static getInstance(){return void 0===this.instance&&(this.instance=new h),this.instance}renderEvent(t){null!==this.canvas&&t.render(this.canvas,this.current_canvas_dimensions)}renderShape(t){null!==this.layer&&(t.render(this.layer,this.current_canvas_dimensions,this.current_canvas_dimensions),this.currently_on_layer.shapes.push(t))}pushObjectsOntoCanvas(){this.currently_on_layer.events.forEach((t=>{null!==this.canvas&&t.render(this.canvas,this.current_canvas_dimensions)})),this.currently_on_layer.shapes.forEach((t=>{null!==this.canvas&&t.render(this.canvas,this.current_canvas_dimensions,this.current_canvas_dimensions)})),this.clearLayer()}select(t){this.clearCanvas(),this.clearLayer();o.getInstance().getAllEvents().forEach((e=>{null!==this.canvas&&(e.isEqual(t)||e.render(this.canvas,this.current_canvas_dimensions))})),null!==this.layer&&(t.select(this.layer,this.current_canvas_dimensions,this.select_outline_color),this.currently_on_layer.events.push(t))}shift(t){this.clearLayer(),null!==this.layer&&(t.select(this.layer,this.current_canvas_dimensions,this.select_outline_color),this.currently_on_layer.events.push(t))}renderAllEvents(){this.clearCanvas(),this.clearLayer();o.getInstance().getAllEvents().forEach((t=>{null!==this.canvas&&t.render(this.canvas,this.current_canvas_dimensions)}))}clearCanvas(){null!==this.canvas&&this.clearContext(this.canvas)}clearLayer(){null!==this.layer&&(this.clearContext(this.layer),this.currently_on_layer={events:[],shapes:[]})}clearContext(t){t.clearRect(0,0,this.current_canvas_dimensions.x,this.current_canvas_dimensions.y)}}function c(t,e,s){return e===s?t:{x:t.x/s.x*e.x,y:t.y/s.y*e.y}}h.instance=void 0;class _{constructor(t,s,n){this.type=e.NONE,this.event_name=void 0,this.user_name=void 0,this.shape=void 0,this.capture_canvas_dimensions=void 0,this.shape=n,this.capture_canvas_dimensions=t,this.event_name=this.getNewEventID(),this.user_name=s}isEqual(t){return this.event_name===t.event_name}render(t,e){throw new Error("Not implemented")}select(t,e,s){throw new Error("Not implemented")}exportToJson(){throw new Error("Not implemented")}containsPoint(t){throw new Error("Not implemented")}shift(t,e){throw new Error("Not implemented")}getAxisValue(t,e,s,n){return-1===e[t]?s[t]:n(e[t],s[t])}getNewEventID(){let t="";const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let s=0;for(;s<10;)t+=e.charAt(Math.floor(62*Math.random())),s+=1;return t}}class l extends _{constructor(t,s,n){super(t,s,n),this.type=e.PEN,this.shape=void 0,this.shape=n}render(t,e){this.shape.forEach((s=>s.render(t,this.capture_canvas_dimensions,e)))}containsPoint(t){const{from_point:e,to_point:s}=this.getBoundingRect();return t.x>=e.x&&t.y>=e.y&&t.x<=s.x&&t.y<=s.y}select(t,e,s){const{from_point:n,to_point:i}=this.getBoundingRect(),a=c(n,e,this.capture_canvas_dimensions),o=c(i,e,this.capture_canvas_dimensions);a.x=a.x-10,a.y=a.y-10,o.x=o.x+10,o.y=o.y+10,this.render(t,e),t.setLineDash([6]),t.strokeStyle=s,t.strokeRect(a.x,a.y,o.x-a.x,o.y-a.y),t.setLineDash([0])}shift(t,e){this.shape.forEach((s=>{s.shift(t,e)}))}exportToJson(){return{type:this.type,event_name:this.event_name,user_name:this.user_name,capture_canvas_dimensions:this.capture_canvas_dimensions,shape:this.shape.map((t=>t.exportToJson()))}}getBoundingRect(){const t={x:-1,y:-1},e={x:-1,y:-1};return this.shape.forEach((s=>{t.x=this.getAxisValue("x",t,s.from_point,Math.min),t.y=this.getAxisValue("y",t,s.from_point,Math.min),t.x=this.getAxisValue("x",t,s.to_point,Math.min),t.y=this.getAxisValue("y",t,s.to_point,Math.min),e.x=this.getAxisValue("x",e,s.from_point,Math.max),e.y=this.getAxisValue("y",e,s.from_point,Math.max),e.x=this.getAxisValue("x",e,s.to_point,Math.max),e.y=this.getAxisValue("y",e,s.to_point,Math.max)})),{from_point:t,to_point:e}}}class u{exportToJson(){throw new Error("Not implemented")}render(t,e,s){throw new Error("Not implemented")}shift(t,e){throw new Error("Not implemented")}}function p(t,e,s){const n=(i=(e.y-t.y)/(e.x-t.x))<0?-1*i:i;var i;const a=Math.sqrt(Math.pow(e.y-t.y,2)+Math.pow(e.x-t.x,2))/Math.sqrt(Math.pow(n,2)+1),o=t.x<e.x?-1:1,r=t.y<e.y?-1:1;return{x:s.x+o*a,y:s.y+r*n*a}}class v extends u{constructor(t,e,s){super(),this.from_point=void 0,this.to_point=void 0,this.border_color=void 0,this.from_point=t,this.to_point=e,this.border_color=s}render(t,e,s){const n=c(this.from_point,s,e),i=c(this.to_point,s,e);t.beginPath(),t.strokeStyle=this.border_color,t.moveTo(n.x,n.y),t.lineTo(i.x,i.y),t.closePath(),t.stroke()}shift(t,e){this.from_point=p(this.from_point,t,e),this.to_point=p(this.to_point,t,e)}exportToJson(){return{from_point:this.from_point,to_point:this.to_point,border_color:this.border_color}}}class m extends i{constructor(){super(...arguments),this.last_coordinates=t,this.is_mouse_down=!1,this.shape=[]}onMouseMovement(e,s){return a(this.last_coordinates,t)&&!this.is_mouse_down?(s&&(this.last_coordinates=e,this.is_mouse_down=!0),null):s?(this.continueCapturingLines(e),null):this.completeCapturingLines()}continueCapturingLines(t){const e=new v(this.last_coordinates,t,this.properties.border_color);this.shape.push(e);h.getInstance().renderShape(e),this.last_coordinates=t}completeCapturingLines(){const e=h.getInstance(),s=r.getInstance();if(0===this.shape.length)return null;const n=new l(e.current_canvas_dimensions,s.getUserName(),this.shape);return e.clearLayer(),e.renderEvent(n),this.shape=[],this.last_coordinates=t,this.is_mouse_down=!1,n}}class d extends _{constructor(t,s,n){super(t,s,n),this.type=e.SQUARE,this.shape=void 0,this.shape=n}render(t,e){this.shape.render(t,this.capture_canvas_dimensions,e)}containsPoint(t){const{from_point:e,to_point:s}=this.getBoundingRect();return t.x>=e.x&&t.y>=e.y&&t.x<=s.x&&t.y<=s.y}select(t,e,s){const{from_point:n,to_point:i}=this.getBoundingRect(),a=c(n,e,this.capture_canvas_dimensions),o=c(i,e,this.capture_canvas_dimensions);a.x=a.x-10,a.y=a.y-10,o.x=o.x+10,o.y=o.y+10,this.render(t,e),t.setLineDash([6]),t.strokeStyle=s,t.strokeRect(a.x,a.y,o.x-a.x,o.y-a.y),t.setLineDash([0])}shift(t,e){this.shape.shift(t,e)}exportToJson(){return{type:this.type,event_name:this.event_name,user_name:this.user_name,capture_canvas_dimensions:this.capture_canvas_dimensions,shape:this.shape.exportToJson()}}getBoundingRect(){const t={x:-1,y:-1},e={x:-1,y:-1};return t.x=this.getAxisValue("x",t,this.shape.from_point,Math.min),t.y=this.getAxisValue("y",t,this.shape.from_point,Math.min),t.x=this.getAxisValue("x",t,this.shape.to_point,Math.min),t.y=this.getAxisValue("y",t,this.shape.to_point,Math.min),e.x=this.getAxisValue("x",e,this.shape.from_point,Math.max),e.y=this.getAxisValue("y",e,this.shape.from_point,Math.max),e.x=this.getAxisValue("x",e,this.shape.to_point,Math.max),e.y=this.getAxisValue("y",e,this.shape.to_point,Math.max),{from_point:t,to_point:e}}}class E extends u{constructor(t,e,s){super(),this.from_point=void 0,this.to_point=void 0,this.border_color=void 0,this.from_point=t,this.to_point=e,this.border_color=s}render(t,e,s){const n=c(this.from_point,s,e),i=c(this.to_point,s,e);t.strokeStyle=this.border_color,t.strokeRect(n.x,n.y,i.x-n.x,i.y-n.y)}shift(t,e){this.from_point=p(this.from_point,t,e),this.to_point=p(this.to_point,t,e)}exportToJson(){return{from_point:this.from_point,to_point:this.to_point,border_color:this.border_color}}}class A extends i{constructor(){super(...arguments),this.start_coordinates=t,this.is_mouse_down=!1,this.shape=null}onMouseMovement(e,s){return a(this.start_coordinates,t)&&!this.is_mouse_down?(s&&(this.start_coordinates=e,this.is_mouse_down=!0),null):s?(this.continueCapturingSquare(e),null):this.completeCapturingSquare()}continueCapturingSquare(t){const e=new E(this.start_coordinates,t,this.properties.border_color);this.shape=e;const s=h.getInstance();s.clearLayer(),s.renderShape(e)}completeCapturingSquare(){const e=h.getInstance(),s=r.getInstance();if(null===this.shape)return null;const n=new d(e.current_canvas_dimensions,s.getUserName(),this.shape);return e.clearLayer(),e.renderEvent(n),this.shape=null,this.start_coordinates=t,this.is_mouse_down=!1,n}}class g extends i{constructor(){super(...arguments),this.shape=e.NONE,this.active_manager=null}isEnabled(){return this.shape!==e.NONE}onCanvasSelectedShapeChange(t){this.shape=t,this.setActiveCaptureManager(t),this.reset()}reset(){}onCanvasDrawingPropertiesChange(t){this.properties=t,null!==this.active_manager&&this.active_manager.onCanvasDrawingPropertiesChange(t)}onMouseMovement(t,e){return null===this.active_manager?null:this.active_manager.onMouseMovement(t,e)}setActiveCaptureManager(t){switch(t){case e.PEN:this.active_manager=new m,this.active_manager.onCanvasDrawingPropertiesChange(this.properties);break;case e.SQUARE:this.active_manager=new A,this.active_manager.onCanvasDrawingPropertiesChange(this.properties);break;default:this.active_manager=null}}}class y{constructor(){this.shape=e.NONE,this.active_event=null,this.is_mouse_down=!1,this.last_coordinates=t}isEnabled(){return this.shape===e.NONE}onCanvasSelectedShapeChange(t){this.shape=t,this.reset()}reset(){this.active_event=null,this.last_coordinates=t,this.is_mouse_down=!1}onMouseMovement(t,e){if(this.isShiftingEvent(t)){return this.shiftEvent(t,e)}return this.selectEvent(t,e),null}isShiftingEvent(t){return null!==this.active_event&&this.is_mouse_down}shiftEvent(e,s){if(null===this.active_event)return null;const n=h.getInstance();var i;if(s)return null===(i=this.active_event)||void 0===i||i.shift(this.last_coordinates,e),n.shift(this.active_event),this.last_coordinates=e,null;{const e=this.active_event;return this.is_mouse_down=!1,this.last_coordinates=t,n.select(e),e}}selectEvent(t,e){if(e){const e=this.getEventAgainstPoint(t),s=h.getInstance();null===e?(this.reset(),s.pushObjectsOntoCanvas()):null!==this.active_event&&this.active_event.isEqual(e)||(this.active_event=e,s.select(this.active_event)),this.last_coordinates=t,this.is_mouse_down=!0}else this.reset()}getEventAgainstPoint(t){const e=o.getInstance().getAllEvents();let s=null;for(let n=e.length-1;n>=0;n--)if(e[n].containsPoint(t)){s=e[n];break}return s}}const x=new class{constructor(){this.selection=new y,this.capture=new g}initializeUser(t){r.getInstance().setUserName(t.user_name)}initializeCanvas(t){h.getInstance().initializeCanvas(t.canvas,t.dimensions)}initializeLayer(t){h.getInstance().initializeLayer(t.canvas)}onCanvasDrawingPropertiesChange(t){this.capture.onCanvasDrawingPropertiesChange(t.properties)}onCanvasSelectedShapeChange(t){this.capture.onCanvasSelectedShapeChange(t.shape),this.selection.onCanvasSelectedShapeChange(t.shape);h.getInstance().pushObjectsOntoCanvas()}onMouseMovementOnCanvas(t){const e=o.getInstance();if(this.capture.isEnabled()){const s=this.capture.onMouseMovement(t.point,t.is_mouse_down);return null!==s&&e.addEvent(s),s}const s=this.selection.onMouseMovement(t.point,t.is_mouse_down);return null!==s&&e.updateEvent(s),s}onCanvasThemeBasedPropertiesChange(t){h.getInstance().initializeSelectOutlineColor(t.properties.select_outline_color)}};onmessage=t=>{const e=t.data;switch(e.type){case s.CANVAS_INITIALIZE_USER:x.initializeUser(e);break;case s.CANVAS_INITIALIZE_MAIN_CANVAS:x.initializeCanvas(e);break;case s.CANVAS_INITIALIZE_TEMPORARY_LAYER:x.initializeLayer(e);break;case s.CANVAS_CHANGE_DRAWING_PROPERTIES:x.onCanvasDrawingPropertiesChange(e);break;case s.CANVAS_CHANGE_SELECTED_SHAPE:x.onCanvasSelectedShapeChange(e);break;case s.CANVAS_CHANGE_MOUSE_POSITION:{const t=x.onMouseMovementOnCanvas(e);null!==t&&postMessage({type:s.CANVAS_EVENTS_ADDED,event:t.exportToJson()});break}case s.CANVAS_CHANGE_THEME_BASED_PROPERTIES:x.onCanvasThemeBasedPropertiesChange(e)}}})();
//# sourceMappingURL=617.61e84b4f.chunk.js.map