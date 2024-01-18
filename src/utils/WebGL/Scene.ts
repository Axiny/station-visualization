import Object3D from "./Object3D";
import Log from './../Log'

const log = new Log("Scene")

/**
 * the Scene is render object list
 * 
 * @constructor Scene
 * 
 * @example
 * const scene = new Scene();
 * scene.add(object);
 * 
 * @author Axiny
 * @date 2022/5/5
 */
class Scene {

    private renders: Array<Object3D> = [];
    private gl: WebGLRenderingContext | null = null;

    constructor () {}

    public add (...object: Object3D[]): void {

        for (let i = 0; i < arguments.length; i++) {

            if (arguments[i].type as WebGLRenderGraphicsType) {

                if (this.gl != null) {

                    arguments[i]?.init(this.gl);

                }
                
                this.renders.push(arguments[i]);

            } else {

                log.error("the param type is not the WebGLRenderGraphicsType");
                
            }

        }

    }

    public setContext (gl: WebGLRenderingContext): void {

        this.gl = gl;

    }

    public getRenders (): Array<Object3D> {

        return this.renders;

    }

    public clearRenderList () {

        this.renders = [];

    }

}

export default Scene