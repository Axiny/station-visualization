/**
 * create by bunkyo university
 * 
 * @constructor WebGLContainer
 * the WebGLContainer is WebGL render context and canvas
 * 
 * @param {HTMLCanvasElement | undefined} canvas - the webgl render container as HTML canvas element
 * 
 * @example
 * const glContainer = new WebGLContainer(canvas);
 * const gl = glContainer.getContext();
 * 
 * @author Axiny
 * @date 2022/4/27
 */
class WebGLContainer {

    private canvas: HTMLCanvasElement | undefined;
    private gl: WebGLRenderingContext | null | undefined;

    constructor (canvas?: HTMLCanvasElement) {

        this.canvas = this.checkCanvas(canvas);
        
        this.gl = this.canvas.getContext('webgl');

    }
    
    private checkCanvas (canvas?: HTMLCanvasElement): HTMLCanvasElement {

        let res: any = canvas;

        if (!(canvas instanceof HTMLCanvasElement)) {

            res = document.createElement('canvas');
            res.style.display = 'block';

        }

        const width = res.parentElement.clientWidth;
        const height = res.parentElement.clientHeight;

        res.setAttribute("width", width);
        res.setAttribute("height", height);

        return res;

    }

    public getContext (): WebGLRenderingContext | null | undefined {

        return this.gl;

    }

    public getCanvas (): HTMLCanvasElement | undefined {

        return this.canvas;

    }


}

export default WebGLContainer