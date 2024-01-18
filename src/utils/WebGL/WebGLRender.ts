import WebGLContainer from "./WebGLContainer";
import Scene from "./Scene";
import Object3D from "./Object3D";
import Log from "./../Log";

const log = new Log('WebGLRender');

class WebGLRender {

    private gl: WebGLRenderingContext;
    private scene: Scene | undefined;

    constructor (canvas?: HTMLCanvasElement) {

        const container = new WebGLContainer(canvas);
        this.gl = container.getContext() as WebGLRenderingContext;

        const gl = this.gl;

        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.enable(gl.POLYGON_OFFSET_FILL);
        gl.polygonOffset(2.0, 1.0);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_CONSTANT_ALPHA);
        gl.blendEquation(gl.FUNC_ADD);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        this.extension('OES_element_index_uint');

    }

    public init (scene: Scene): void {

        scene.setContext(this.gl);

        const renders: Array<Object3D> = scene.getRenders();

        renders.forEach ((obj: Object3D) => obj.init(this.gl));

        this.scene = scene;

    }

    public render (): void {

        const gl = this.gl;

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.depthMask(false);

        if (this.scene instanceof Scene) {

            const scene = this.scene as Scene;

            const renders: Array<Object3D> = scene.getRenders();
    
            renders.forEach((obj: Object3D) => {
    
                obj.render();

                const type: WebGLRenderGraphicsType = obj.getType();
                const isIndicesMode: boolean = obj.isIndicesMode();

                if (isIndicesMode) {

                    const count: number = obj.getIndices().length;

                    gl.drawElements(gl[type], count, gl.UNSIGNED_INT, 0);

                } else {

                    const vertex: number = obj.getVertexData().length;
                    const size: number = obj.getSize();
                    const count = vertex / size;

                    gl.drawArrays(gl[type], 0, count);

                }
                
            })
            
        } else {

            log.error("the 'WebGLRender.render' need call the 'WebGLRender.init' and try again.");

        }

        gl.depthMask(true);
        
    }

    public extension (name: string): void {

        this.gl.getExtension(name);

    }

}

export default WebGLRender;