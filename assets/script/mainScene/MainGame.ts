
import { _decorator, Component, Node, Sprite, color } from 'cc';
import EventManager, { EventDispacthData } from '../event/EventManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MainGame
 * DateTime = Sat Dec 04 2021 22:24:15 GMT+0800 (中国标准时间)
 * Author = ChinaQin
 * FileBasename = MainGame.ts
 * FileBasenameNoExtension = MainGame
 * URL = db://assets/script/mainScene/MainGame.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('MainGame')
export class MainGame extends Component {

    @property(Sprite)
    colorS1: Sprite = null;

    @property(Sprite)
    colorS2: Sprite = null;
    
    private eMng: EventManager = null;

    start () {
        this.eMng = new EventManager();
        this.test();
    }

    test(data?: any) {
        console.log("test ==>", data);
    }

    private randomColor1(data?: EventDispacthData): void {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        this.colorS1.color = color(r, g, b)
        
        console.log("randomColor1 ===>", data)
    }

    private randomColor2(data?: EventDispacthData): void {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        this.colorS2.color = color(r, g, b)

        console.log("randomColor2 ===>", data)
    }

    public onAddEvent1(): void {
        this.eMng.addEventListener("game-random-color-1", this.randomColor1, this)
    }

    public onAddEvent2(): void {
        this.eMng.addEventListener("game-random-color-2", this.randomColor2, this)
    }

    public onD1(): void {
        const sendData: EventDispacthData = {
            eventType: "aaa",
            data: 123
        }

        this.eMng.dispatchEvent("game-random-color-1", sendData);
    }
    public onD2(): void {
        const sendData: EventDispacthData = {
            eventType: "bbb",
            data: 456
        }

        this.eMng.dispatchEvent("game-random-color-2", sendData);
    }

    public onRemoveEvent1(): void {
        this.eMng.removeEventListener("game-random-color-1", this.randomColor1, this)
    }
    public onRemoveEvent2(): void {
        this.eMng.removeEventListener("game-random-color-2", this.randomColor2, this)
    }

    public onRemoveAllEvent(): void {
        this.eMng.removeAllEvent();
    }

    public onHasEvent() {
        console.log("1==>", this.eMng.hasEventListeners("game-random-color-1", this.randomColor1, this));
        console.log("2==>", this.eMng.hasEventListeners("game-random-color-2", this.randomColor2, this));
    }
}