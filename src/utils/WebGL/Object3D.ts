import Shader from "./Shader";
import Buffer from "./Buffer";
import Log from "../Log";
import { VARIABLE_TYPE, INDICES } from "./enum";
import { copy } from "../index"
import Type from "../Type";

const log = new Log('Object3D');

/**
 * create by bunkyo university
 * 
 * @constructor Object3D
 * 
 * @param {Float32Array | Float64Array} data - the object vertex data
 * @param {number} size - one vertex data size
 * 
 * @example
 * // create a new object3D
 * const Point = new Object3D(data, 3);
 * // the param type must be WebGLRenderGraphicsType
 * Point.setType('POINTS');
 * 
 * scene.add(Point);
 * 
 * @author Axiny
 * @date 2022/5/7
 */
class Object3D {

    protected type: WebGLRenderGraphicsType = 'POINTS';
    protected shaderObject: Shader | null = null;
    protected shaderCode: ShaderCodeStruct | ShaderStringStruct = { vertex : '', fragment : '' };
    protected defineConfig: ShaderGLSLDefine = {};
    protected bufferCache: BufferCache = {};
    protected dataCache: DataCache = {};
    protected gl: WebGLRenderingContext | null = null;
    protected size: number;

    constructor (data: Float32Array | Float64Array, size: number) {
        
        this.setVertexData(data);
        this.size = size;

    }

    public init (gl: WebGLRenderingContext) {

        this.gl = gl;
        // for the typescript verification, use "key[value]" call the object's attribute.
        const bufferCache: { [index: string]: Buffer } = this.bufferCache;
        const dataCache: DataCache = this.dataCache;

        let shader: Shader = this.shaderObject as Shader;

        if (shader == null) {

            shader = this.compileShader(gl);

        }

        shader.use();

        const defines: { [ index: string ]: Array<GLSLDefine> } = copy(this.defineConfig.vertex) as GLSLDefineConfig;
        delete defines['varying'];

        for (const qualifier in defines) {

            for (let i = 0; i < defines[qualifier].length; i++) {

                const variable = defines[qualifier][i];

                const type: VARIABLE_TYPE = variable.type;
                const name: string = variable.name;
                const isBuffer: boolean = variable.isBuffer as boolean;
                const data: any = dataCache[name];

                if (!bufferCache[name] && !Type.isUndefined(data)) {

                    const bufferType = isBuffer ? 'buffer' : Buffer.createTypeByData(data, type, qualifier);
                    const location = shader.getLocation(qualifier as WebGLLocationType, name);

                    const buffer = new Buffer(gl, bufferType);
                    buffer.setLocation(location as WebGLVariableLocation);

                    this.bufferCache[name] = buffer;

                } else {

                    log.warn(`the '${name}' variable is not defined in the cache, or data is undefined`);
                    log.warn(`.init() dataCache[${name}]: ${data}`);
                    log.warn(`.init() bufferCache[${name}]: ${bufferCache[name]}`);
                    log.warn(`.init() type: ${this.type}`);

                }

            }

        }

        if (this.isIndicesMode()) {

            const buffer = new Buffer(gl, INDICES);
            buffer.bindData(dataCache[INDICES]);

            this.bufferCache[INDICES] = buffer;

        }

    }

    public setType (type: WebGLRenderGraphicsType): void {

        this.type = type;

    }

    public getType (): WebGLRenderGraphicsType {

        return this.type;
        
    }

    public setSize (size: number): void {

        this.size = size;

    }

    public getSize (): number {

        return this.size;

    }

    public setDefines (defines: ShaderGLSLDefine): void {

        this.defineConfig = defines;

    }

    public getDefines (): ShaderGLSLDefine {

        return this.defineConfig;

    }

    public setVertexData (data: Float32Array | Float64Array): void {

        this.setData('a_position', data);

    }

    public getVertexData (): Float32Array | Float64Array {

        return this.getData('a_position');

    }

    public setIndices (data: Array<number> | Uint32Array): void {

        this.setData(INDICES, new Uint32Array(data));

    }
    
    public getIndices (): Array<number> | Uint32Array {

        return this.getData(INDICES);

    }

    public deleteIndices (): void {

        delete this.dataCache[INDICES];
        delete this.bufferCache[INDICES];

    }

    public setData (key: string, data: any): void {

        this.dataCache[key] = data;
        const buffer = this.bufferCache[key];

        if (buffer) {

            this.useShader();

            const type: BufferType = buffer.getType();

            switch (type) {

                case 'number' :
                case 'vector' :
                case 'matrix' : {
    
                    buffer.setUniformData(data);
                    break;
    
                }

                case 'buffer': {

                    buffer.bindData(data);
                    buffer.enable(this.size);
                    break;

                }

                case 'indices' : {

                    buffer.bindData(data);
                    break;

                }

                case 'vertex' : {

                    buffer.setAttributeData(data);
                    break;

                }

                default : {

                    log.error(`the '${key}' Buffer type is not supported. Please provide a valid Buffer.`);

                }

            }

        }

    }
    
    public getData (key: string): any {

        return this.dataCache[key];

    }

    public setBuffer (key: string, buffer: Buffer): void {

        this.bufferCache[key] = buffer;

    }

    public getBuffer (key: string): Buffer {

        return this.bufferCache[key];

    }
    
    public getDataCache (): DataCache {

        return this.dataCache;

    }

    public getBufferCache (): BufferCache {

        return this.bufferCache

    }

    public setShaderCode (shaders: ShaderCodeStruct | ShaderStringStruct) {

        this.shaderCode = shaders;

    }

    public getShaderCode (): ShaderCodeStruct | ShaderStringStruct | undefined {

        return this.shaderCode;

    }

    public compileShader (gl: WebGLRenderingContext): Shader {
        
        const { vertex, fragment } = this.shaderCode;
        const vertexCode: string = this.shaderCode as ShaderCodeStruct ? vertex.getCode() : vertex;
        const fragmentCode: string = this.shaderCode as ShaderCodeStruct ? fragment.getCode() : fragment;

        const shader = new Shader(gl);
        shader.setSource(vertexCode, fragmentCode);

        this.shaderObject = shader;

        return shader;

    }

    public useShader (): void {

        const shader: Shader = this.shaderObject as Shader;
        
        if (!Type.isNull(shader)) {

            shader.use();

        } else {

            log.error('the shader is not defined.');

        }

    }

    public isIndicesMode (): boolean {

        return this.dataCache[INDICES] != undefined;

    }
    
    public render (): void {

        const dataCache: DataCache = this.dataCache;

        this.useShader();

        for (const name in dataCache) {

            this.setData(name, dataCache[name]);

        }

    }

}

export default Object3D