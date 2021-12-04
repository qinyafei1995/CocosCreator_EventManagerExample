/**
 * Predefined variables
 * Name = EventManager
 * DateTime = Sat Dec 04 2021 21:15:04 GMT+0800 (中国标准时间)
 * Author = ChinaQin
 * FileBasename = EventManager.ts
 * FileBasenameNoExtension = EventManager
 */

export default class EventList {
    private list: { handler: Function, target: Object }[] = [];

    /**
     * 
     * @param handler 函數
     * @param target 綁定
     */
    public addEventListener(handler: Function, target: Object): void {
        if (this.has(handler, target) === -1) {
            this.list.push({ handler: handler, target: target });
        } 
        console.log("list ==>", this.list);
    }

    /**
     * 是否包含消息, 为-1时,该消息不存在列表中
     * @param handler 
     * @param target 
     * @returns 
     */
    public has(handler: Function, target: Object): number {
        for (let index = 0; index < this.list.length; index++) {
            const element = this.list[index];
            if (element.handler === handler && element.target === target) {
                return index;
            }
        }
        return -1;
    }

    /**
     * 获取事件列表大小
     * @returns 
     */
    public getSize(): number {
        return this.list.length;
    }

    /**
     * 移除单个消息
     * @param handler 函数
     * @param target 
     * @returns 
     */
    public removeEventListener(handler: Function, target: Object): void {
        for (let index = 0; index < this.list.length; index++) {
            const element = this.list[index];
            if (element.handler === handler && element.target === target) {
                this.list.splice(index, 1);
                return;
            }
        }
    }

    /**
     * 移除所有消息
     */
    public removeAll(): void {
        this.list = [];
    }

    /**
     * 派发消息
     * @param data 
     * @param data2 
     * @param data3 
     */
    public dispatchEvent(data?: any): void {
        this.list.forEach((element: { handler: Function, target: Object }) => {
            if (element.target) {
                element.handler.call(element.target, data);
            } else {
                element.handler(data);
            }
        })
    }
}
