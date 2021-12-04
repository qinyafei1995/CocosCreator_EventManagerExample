/**
 * Predefined variables
 * Name = EventManager
 * DateTime = Sat Dec 04 2021 21:15:04 GMT+0800 (中国标准时间)
 * Author = ChinaQin
 * FileBasename = EventManager.ts
 * FileBasenameNoExtension = EventManager
 */

import EventList from "./EventList";

export interface EventDispacthData {
    eventType: string,
    data: any
}

export default class EventManager {

    private eventMap: Map<string, EventList> = new Map();

    public addEventListener(eventName: string, func: (data?: EventDispacthData) => void, target: Object): void {
        let eList: EventList = null;
        if (!this.eventMap.has(eventName)) {
            eList = new EventList();
            this.eventMap.set(eventName, eList);
        } else {
            eList = this.eventMap.get(eventName);
        }
        eList.addEventListener(func, target);

        if (eList.getSize() > 20) {
            console.warn("EventManager addEvetnListener is too long", eList.getSize(), eventName);
        }
    }

    public hasEventListeners(eventName: string, func: (data?: EventDispacthData) => void, target: Object): boolean {
        const eList: EventList = this.eventMap.get(eventName);
        if (eList) {
            return eList.has(func, target) >= 0;
        }
        return false;
    }

    public removeEventListener(eventName: string, func: (data?: EventDispacthData) => void, target: Object): void {
        const eList: EventList = this.eventMap.get(eventName);
        if (eList) {
            eList.removeEventListener(func, target);

            // 当前消息没有事件了,
            if (eList.getSize() === 0) {
                this.eventMap.delete(eventName);
            }
        }
    }

    public removeAllEvent(): void {
        this.eventMap.forEach((eList: EventList, key: string) => {
            eList.removeAll();
            this.eventMap.delete(key);
        })
    }

    public dispatchEvent(eventName: string, data?: EventDispacthData): void {
        const eList: EventList = this.eventMap.get(eventName);
        if (eList) {
            eList.dispatchEvent(data);
        } else {
            console.warn("missing event name", eventName);
        }
    }
}