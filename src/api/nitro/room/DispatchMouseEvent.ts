import { MouseEventType } from '@nitrots/nitro-renderer';
import { GetRoomEngine } from './GetRoomEngine';
import { SetActiveRoomId } from './SetActiveRoomId';

let didMouseMove = false;
let lastClick = 0;
let clickCount = 0;

export function DispatchMouseEvent(roomId: number, canvasId: number, event: MouseEvent)
{
    const x = event.clientX;
    const y = event.clientY;

    let eventType = event.type;

    if(eventType === MouseEventType.MOUSE_CLICK)
    {
        if(lastClick)
        {
            clickCount = 1;

            if(lastClick >= Date.now() - 300) clickCount++;
        }

        lastClick = Date.now();

        if(clickCount === 2)
        {
            if(!didMouseMove) eventType = MouseEventType.DOUBLE_CLICK;

            clickCount  = 0;
            lastClick   = null;
        }
    }

    switch(eventType)
    {
        case MouseEventType.MOUSE_CLICK:
            break;
        case MouseEventType.DOUBLE_CLICK:
            break;
        case MouseEventType.MOUSE_MOVE:
            didMouseMove = true;
            break;
        case MouseEventType.MOUSE_DOWN:
            didMouseMove = false;
            break;
        case MouseEventType.MOUSE_UP:
            break;
        default: return;
    }

    SetActiveRoomId(roomId);
    GetRoomEngine().dispatchMouseEvent(canvasId, x, y, eventType, event.altKey, (event.ctrlKey || event.metaKey), event.shiftKey, false);
}
