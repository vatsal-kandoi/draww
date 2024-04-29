(()=>{"use strict";let e=function(e){return e.SHAPE_CHANGE="SHAPE_CHANGE",e.INIT_USER="INIT_USER",e.INIT_CANVAS="INIT_CANVAS",e.INIT_TEMPORARY_CANVAS="INIT_TEMPORARY_CANVAS",e.MOUSE_MOVE_EVENT="MOUSE_MOVE_EVENT",e.LOAD_EVENTS="LOAD_EVENTS",e.DELETE_ALL_EVENTS="DELETE_ALL_EVENTS",e.NEW_EVENT_ADDED="NEW_EVENT_ADDED",e.PROPERTIES_CHANGE="PROPERTIES_CHANGE",e}({}),t=function(e){return e.NONE="NONE",e.LINE="LINE",e.SQUARE="SQUARE",e}({});function n(e,t,n){return t===n?e:{x:e.x/n.x*t.x,y:e.y/n.y*t.y}}class s{constructor(e,n,s){this.type=t.NONE,this.event_name=void 0,this.user_name=void 0,this.capture_canvas_dimensions=void 0,this.current_canvas_dimensions=void 0,this.current_canvas_dimensions=n,this.capture_canvas_dimensions=e,this.event_name=this.getNewEventID(),this.user_name=s}isEqual(e){return this.event_name===e.event_name}getNewEventID(){let e="";const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let n=0;for(;n<10;)e+=t.charAt(Math.floor(62*Math.random())),n+=1;return e}render(e){throw new Error("Not implemented")}select(e){throw new Error("Not implemented")}containsPoint(e){throw new Error("Not implemented")}shift(e,t){throw new Error("Not implemented")}exportToJson(){throw new Error("Not implemented")}}class i extends s{constructor(e,n,s,i){super(e,n,s),this.type=t.LINE,this.shape=void 0,this.shape=i}render(e){this.shape.forEach((t=>t.render(e,this.capture_canvas_dimensions,this.current_canvas_dimensions)))}getPoint(e,t,n,s){return-1===t[e]?n[e]:s(t[e],n[e])}getBoundingRect(){const e={x:-1,y:-1},t={x:-1,y:-1};return this.shape.forEach((n=>{e.x=this.getPoint("x",e,n.from_point,Math.min),e.y=this.getPoint("y",e,n.from_point,Math.min),e.x=this.getPoint("x",e,n.to_point,Math.min),e.y=this.getPoint("y",e,n.to_point,Math.min),t.x=this.getPoint("x",t,n.from_point,Math.max),t.y=this.getPoint("y",t,n.from_point,Math.max),t.x=this.getPoint("x",t,n.to_point,Math.max),t.y=this.getPoint("y",t,n.to_point,Math.max)})),{from_point:e,to_point:t}}containsPoint(e){const{from_point:t,to_point:n}=this.getBoundingRect();return e.x>=t.x&&e.y>=t.y&&e.x<=n.x&&e.y<=n.y}select(e){const{from_point:t,to_point:s}=this.getBoundingRect(),i=n(t,this.current_canvas_dimensions,this.capture_canvas_dimensions),r=n(s,this.current_canvas_dimensions,this.capture_canvas_dimensions);i.x=i.x-10,i.y=i.y-10,r.x=r.x+10,r.y=r.y+10,this.render(e),e.setLineDash([6]),e.strokeStyle="#000",e.strokeRect(i.x,i.y,r.x-i.x,r.y-i.y),e.setLineDash([0])}shift(e,t){this.shape.forEach((n=>{n.shift(e,t)}))}exportToJson(){return{type:this.type,event_name:this.event_name,user_name:this.user_name,capture_canvas_dimensions:this.capture_canvas_dimensions,current_canvas_dimensions:this.current_canvas_dimensions,shape:this.shape.map((e=>e.exportToJson()))}}}class r extends s{constructor(e,n,s,i){super(e,n,s),this.type=t.LINE,this.shape=void 0,this.shape=i}render(e){this.shape.render(e,this.capture_canvas_dimensions,this.current_canvas_dimensions)}getPoint(e,t,n,s){return-1===t[e]?n[e]:s(t[e],n[e])}getBoundingRect(){const e={x:-1,y:-1},t={x:-1,y:-1};return e.x=this.getPoint("x",e,this.shape.from_point,Math.min),e.y=this.getPoint("y",e,this.shape.from_point,Math.min),e.x=this.getPoint("x",e,this.shape.to_point,Math.min),e.y=this.getPoint("y",e,this.shape.to_point,Math.min),t.x=this.getPoint("x",t,this.shape.from_point,Math.max),t.y=this.getPoint("y",t,this.shape.from_point,Math.max),t.x=this.getPoint("x",t,this.shape.to_point,Math.max),t.y=this.getPoint("y",t,this.shape.to_point,Math.max),{from_point:e,to_point:t}}containsPoint(e){const{from_point:t,to_point:n}=this.getBoundingRect();return e.x>=t.x&&e.y>=t.y&&e.x<=n.x&&e.y<=n.y}select(e){const{from_point:t,to_point:s}=this.getBoundingRect(),i=n(t,this.current_canvas_dimensions,this.capture_canvas_dimensions),r=n(s,this.current_canvas_dimensions,this.capture_canvas_dimensions);i.x=i.x-10,i.y=i.y-10,r.x=r.x+10,r.y=r.y+10,this.render(e),e.setLineDash([6]),e.strokeStyle="#000",e.strokeRect(i.x,i.y,r.x-i.x,r.y-i.y),e.setLineDash([0])}shift(e,t){this.shape.shift(e,t)}exportToJson(){return{type:this.type,event_name:this.event_name,user_name:this.user_name,capture_canvas_dimensions:this.capture_canvas_dimensions,current_canvas_dimensions:this.current_canvas_dimensions,shape:this.shape.exportToJson()}}}const a={x:-1,y:-1};class o{constructor(){this.user_name=null,this.events=[],this.current_canvas_dimensions=a}initialiseCanvas(e){this.current_canvas_dimensions=e}initialiseUser(e){this.user_name=e}getEventAgainstPoint(e){let t=null;for(let n=this.events.length-1;n>=0;n--)if(this.events[n].containsPoint(e)){t=this.events[n];break}return t}updateEventAfterMove(e){this.events=this.events.filter((t=>t.event_name!==e.event_name)),this.events.push(e)}isInitialised(){return null!==this.user_name}createEvent(e,n){if(null===this.user_name)return null;switch(e){case t.LINE:{const e=new i(this.current_canvas_dimensions,this.current_canvas_dimensions,this.user_name,n);return this.events.push(e),e}case t.SQUARE:{const e=new r(this.current_canvas_dimensions,this.current_canvas_dimensions,this.user_name,n);return this.events.push(e),e}}return null}}const h={x:-1,y:-1};class c{constructor(){this.offscreen_temporary_canvas=null,this.offscreen_canvas=null,this.current_canvas_dimensions=h}initialiseCanvas(e,t){const n=e.getContext("2d");null!==n&&(this.offscreen_canvas=n,this.current_canvas_dimensions=t)}initialiseLayer(e,t){const n=e.getContext("2d");null!==n&&(this.offscreen_temporary_canvas=n)}renderShape(e){null!==this.offscreen_canvas&&e.render(this.offscreen_canvas,this.current_canvas_dimensions,this.current_canvas_dimensions)}renderShapeOnLayer(e){null!==this.offscreen_temporary_canvas&&e.render(this.offscreen_temporary_canvas,this.current_canvas_dimensions,this.current_canvas_dimensions)}selectEvent(e){null!==this.offscreen_temporary_canvas&&e.select(this.offscreen_temporary_canvas)}renderEvent(e){null!==this.offscreen_canvas&&e.render(this.offscreen_canvas)}renderEventOnLayer(e){this.clearLayer(),null!==this.offscreen_temporary_canvas&&e.render(this.offscreen_temporary_canvas)}clearLayer(){null!==this.offscreen_temporary_canvas&&this.offscreen_temporary_canvas.clearRect(0,0,this.current_canvas_dimensions.x,this.current_canvas_dimensions.y)}clearCanvas(){null!==this.offscreen_canvas&&this.offscreen_canvas.clearRect(0,0,this.current_canvas_dimensions.x,this.current_canvas_dimensions.y)}}const _={x:-1,y:-1};class l{constructor(e,n){this.active_shape=t.NONE,this.renderManager=void 0,this.eventManager=void 0,this.last_coordinates=_,this.active_event=null,this.is_mouse_down=!1,this.renderManager=n,this.eventManager=e}reset(){this.last_coordinates=_,null!==this.active_event&&this.renderManager.renderEvent(this.active_event),this.active_event=null,this.renderManager.clearLayer()}isEnabled(){return this.active_shape===t.NONE}onSelectedShapeChange(e){this.active_shape=e,this.reset()}isShiftingEvent(e){return null!==this.active_event&&this.is_mouse_down}shiftingShape(e,t){if(t)return null===this.active_event||(this.active_event.shift(this.last_coordinates,e),this.renderManager.renderEventOnLayer(this.active_event),this.last_coordinates=e),null;{if(null===this.active_event)return null;const t=this.active_event;return this.eventManager.updateEventAfterMove(t),this.selectEvent(t,e),this.is_mouse_down=!1,t}}selectEvent(e,t){this.renderManager.clearLayer(),this.renderManager.clearCanvas();this.eventManager.events.filter((t=>t.event_name!==e.event_name)).forEach((e=>{this.renderManager.renderEvent(e)})),this.renderManager.selectEvent(e),this.active_event=e,this.last_coordinates=t,this.is_mouse_down=!0}deselectEvent(){return this.renderManager.clearLayer(),this.renderManager.clearCanvas(),this.eventManager.events.forEach((e=>{this.renderManager.renderEvent(e)})),this.active_event=null,this.last_coordinates=_,this.is_mouse_down=!1,null}selectingShape(e,t){if(t){const t=this.eventManager.getEventAgainstPoint(e);return console.log(t),null!==t?this.selectEvent(t,e):this.deselectEvent(),t}return this.is_mouse_down=!1,null}onMouseMoveEvent(e,t){return this.isShiftingEvent(e)?this.shiftingShape(e,t):this.selectingShape(e,t)}}function u(e,t,n){const s=(i=(t.y-e.y)/(t.x-e.x))<0?-1*i:i;var i;const r=Math.sqrt(Math.pow(t.y-e.y,2)+Math.pow(t.x-e.x,2))/Math.sqrt(Math.pow(s,2)+1),a=e.x<t.x?-1:1,o=e.y<t.y?-1:1;return{x:n.x+a*r,y:n.y+o*s*r}}class p{exportToJson(){throw new Error("Not implemented")}render(e,t,n){throw new Error("Not implemented")}shift(e,t){throw new Error("Not implemented")}}class v extends p{constructor(e,t,n){super(),this.from_point=void 0,this.to_point=void 0,this.border_color=void 0,this.from_point=e,this.to_point=t,this.border_color=n}render(e,t,s){const i=n(this.from_point,s,t),r=n(this.to_point,s,t);e.beginPath(),e.strokeStyle=this.border_color,e.moveTo(i.x,i.y),e.lineTo(r.x,r.y),e.closePath(),e.stroke()}shift(e,t){this.from_point=u(this.from_point,e,t),this.to_point=u(this.to_point,e,t)}exportToJson(){return{from_point:this.from_point,to_point:this.to_point,border_color:this.border_color}}}class d extends p{constructor(e,t,n){super(),this.from_point=void 0,this.to_point=void 0,this.border_color=void 0,this.from_point=e,this.to_point=t,this.border_color=n}render(e,t,s){const i=n(this.from_point,s,t),r=n(this.to_point,s,t);e.strokeStyle=this.border_color,e.strokeRect(i.x,i.y,r.x-i.x,r.y-i.y)}shift(e,t){this.from_point=u(this.from_point,e,t),this.to_point=u(this.to_point,e,t)}exportToJson(){return{from_point:this.from_point,to_point:this.to_point,border_color:this.border_color}}}function m(e,t){return e.x===t.x&&e.y===t.y}const E={x:-1,y:-1};class f{constructor(e){this.active_shape=t.NONE,this.shape=null,this.renderManager=void 0,this.start_coordinates=E,this.last_coordinates=E,this.is_mouse_down=!1,this.properties={borderColor:"#000"},this.renderManager=e}onPropertiesChange(e){this.properties=e}reset(){this.last_coordinates=E,this.start_coordinates=E,this.is_mouse_down=!1,this.shape=null,this.renderManager.clearLayer()}isEnabled(){return this.active_shape!==t.NONE}onSelectedShapeChange(e){this.active_shape=e,this.reset()}onMouseMoveEvent(e,n){let s=null;switch(this.active_shape){case t.LINE:s=this.captureLine(e,n);break;case t.SQUARE:s=this.captureSquare(e,n)}return s}captureLine(e,t){if(m(this.last_coordinates,E)&&!this.is_mouse_down)return t&&(this.last_coordinates=e,this.is_mouse_down=!0),null;if(t){const t=new v(this.last_coordinates,e,this.properties.borderColor);return null===this.shape&&(this.shape=[]),this.shape.push(t),this.renderManager.renderShapeOnLayer(t),this.last_coordinates=e,null}const n=null!==this.shape?this.shape:null;return this.reset(),null===n||void 0===n||n.forEach((e=>this.renderManager.renderShape(e))),n}captureSquare(e,t){if(m(this.start_coordinates,E)&&!this.is_mouse_down)return t&&(this.start_coordinates=e,this.is_mouse_down=!0),null;if(t){this.renderManager.clearLayer();const t=new d(this.start_coordinates,e,this.properties.borderColor);return this.shape=t,this.renderManager.renderShapeOnLayer(t),null}const n=null!==this.shape?this.shape:null;return this.reset(),this.renderManager.renderShape(n),n}}const g=new class{constructor(){this.eventManager=new o,this.renderManager=new c,this.shapeManager=new f(this.renderManager),this.selectionManager=new l(this.eventManager,this.renderManager)}onUserInit(e){this.eventManager.initialiseUser(e)}onCanvasInit(e,t){this.eventManager.initialiseUser("Vatsal"),this.renderManager.initialiseCanvas(e,t),this.eventManager.initialiseCanvas(t)}onTemporaryCanvasInit(e,t){this.renderManager.initialiseLayer(e,t)}onSelectedShapeChange(e){this.shapeManager.onSelectedShapeChange(e),this.selectionManager.onSelectedShapeChange(e)}onMouseMoveEvent(e,t){return this.selectionManager.isEnabled()?this.onMouseMoveForSelection(e,t):this.onMouseMoveForDraw(e,t)}onMouseMoveForSelection(e,t){return this.selectionManager.onMouseMoveEvent(e,t)}onMouseMoveForDraw(e,t){const n=this.shapeManager.onMouseMoveEvent(e,t);if(null===n)return null;return this.eventManager.createEvent(this.shapeManager.active_shape,n)}onPropertiesChange(e){this.shapeManager.onPropertiesChange(e)}};onmessage=t=>{const n=t.data;switch(n.action){case e.INIT_USER:g.onUserInit(n.user_name);break;case e.INIT_CANVAS:g.onCanvasInit(n.canvas,n.dimensions);break;case e.INIT_TEMPORARY_CANVAS:g.onTemporaryCanvasInit(n.canvas,n.dimensions);break;case e.SHAPE_CHANGE:g.onSelectedShapeChange(n.shape);break;case e.MOUSE_MOVE_EVENT:{const t=g.onMouseMoveEvent(n.point,n.isMouseDown);null!==t&&postMessage({type:e.NEW_EVENT_ADDED,event:t.exportToJson()});break}case e.PROPERTIES_CHANGE:g.onPropertiesChange(n)}}})();
//# sourceMappingURL=31.11fada91.chunk.js.map