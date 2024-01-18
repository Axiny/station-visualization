
/**
 * 对指定区域进行全屏显示
 * 
 * @constructor FullScreen
 * 
 * @param {HTMLElement} target - 指定区域
 * 
 * @author Axiny
 * @date 2020-6-21
 */
class FullScreen {

    private _static: boolean = false;
    private _target: HTMLElement;

    constructor (target: HTMLElement) {

        this._target = target;

    }

    /**
     * 对指定的区域进入全屏模式
     * 
     * @author Axiny 2020-6-21
     */
    open (): void {

        this._target.requestFullscreen();

        this._static = true;

    }

    /**
     * 关闭全屏模式
     * 
     * @author Axiny 2020-6-21
     */
    close (): void {

        document.exitFullscreen();

        this._static = false;

    }

    /**
     * 全屏模式切换函数
     * 
     * @author Axiny 2020-6-21
     */
    toggle (): void {

        this._static ? this.close() : this.open();

    }
    
}

export default FullScreen