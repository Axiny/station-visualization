declare interface IWebGLContainer {

    private canvas: HTMLCanvasElement | undefined;
    private gl: WebGLRenderingContext | null | undefined;

    constructor (canvas?: HTMLCanvasElement);

    private checkCanvas (canvas?: HTMLCanvasElement): HTMLCanvasElement;
    public getContext (): WebGLRenderingContext | null | undefined;
    public getCanvas (): HTMLCanvasElement | undefined;

}

declare interface IShader {
    
    private program: WebGLProgram | null;
    private gl: WebGLRenderingContext;
    private VERTEX_SHADER: WebGLShader | any;
    private FRAGMENT_SHADER: WebGLShader | any;
    
    constructor (gl: WebGLRenderingContext);

    private compile (shader: WebGLShader): void;
    private createProgram (): void;
    private linkProgram (program: WebGLProgram): void;
    public setSource (vertexCode: string, fragmentCode: string): void;
    public getLocation (type: WebGLLocationType, name: string): WebGLVariableLocation | null;
    public use (): void;

}

declare interface IBuffer {

    private gl: WebGLRenderingContext;
    private buffer: WebGLBuffer;
    private type: BufferType;
    private location: WebGLUniformLocation | GLint | null;
    private pointer: { size: number; type: GLenum | null };
    private data: BufferData;

    constructor (gl: WebGLRenderingContext, type?: BufferType);

    private getPointerType (): number | undefined;
    public bindData (data: Float32Array): void;
    public enable (size?: number, type?: GLenum): void;
    public setType (type: BufferType): void;
    public getType (): BufferType;
    public setLocation (location: WebGLUniformLocation | GLint | GLuint): void;
    public setUniformData (data: Array<number> | number, location?: WebGLUniformLocation): void;
    public setAttributeData (data: Float32Array | Array<number>, location?: GLuint): void;
    public static createTypeByData (data: any, type: VARIABLE_TYPE): BufferType | undefined;

}

declare interface IShaderCode {

    public type: WebGLShaderType;
    private defineAreaCode: string;
    private bodyAreaCode: string;
    private code: string;

    constructor (type: WebGLShaderType);

    private generate (): string;
    public addDefineCode (code: string): void;
    public setDefineCode (code: string): void;
    public addBodyCode (code: string): void;
    public setBodyCode (code: string): void;
    public setPrecision(precision: PRECISION): void;
    public getCode (): string;
    public static getDefineVariable (config: GLSLDefineConfig): ShaderStringStruct

}

declare interface IObject3D {

    protected type: WebGLRenderGraphicsType;
    protected shaderObject: Shader | null;
    protected shaderCode: ShaderCodeStruct | ShaderStringStruct;
    protected defineConfig: GLSLDefineConfig;
    protected bufferCache: BufferCache;
    protected dataCache: DataCache;
    protected gl: WebGLRenderingContext | null;
    protected size: number;

    constructor (data: Float32Array | Float64Array, size: number);

    public init (gl: WebGLRenderingContext);
    public setType (type: WebGLRenderGraphicsType);
    public getType (): WebGLRenderGraphicsType;
    public setSize (size: number): void;
    public getSize (): number;
    public setDefines(defines: ShaderGLSLDefine): void;
    public getDefines (): ShaderGLSLDefine;
    public setVertexData (data: Float32Array | Float64Array): void;
    public getVertexData (): Float32Array | Float64Array;
    public setIndices(data: Array<number> | Uint32Array): void;
    public getIndices(): Array<number> | Uint32Array;
    public deleteIndices(): void;
    public setData (key: string, data: any): void;
    public getData (key: string): any;
    public setBuffer (key: string, buffer: Buffer): void;
    public getBuffer (key: string): Buffer;
    public getDataCache(): DataCache;
    public getBufferCache(): BufferCache;
    public setShaderCode (shaders: ShaderCodeStruct | ShaderStringStruct);
    public getShaderCode (): ShaderCodeStruct | ShaderStringStruct | undefined;
    public compileShader (gl: WebGLRenderingContext): Shader;
    public useShader (): void;
    public isIndicesMode (): boolean;
    public render (gl: WebGLRenderingContext): void;

}

declare interface IWebGLRender {

    private gl: WebGLRenderingContext;
    private scene: Scene | undefined;

    constructor (canvas?: HTMLCanvasElement);

    public init (scene: Scene): void;
    public render (): void;
    public extension (name: string): void;
    
}

declare interface IScene {

    private renders: Array<Object3D>;
    private gl: WebGLRenderingContext | null;

    public add (...object: Object3D[]): void;
    public setContext (gl: WebGLRenderingContext): void;
    public getRenders (): Array<Object3D>;
    public clearRenderList ();
    
}

const enum PRECISION {
    HIGH = 'highp',
    MIDDLE =  'mediump',
    LOW = 'float;'
}

declare type WebGL3DPosition = { x: number; y: number; z: number; };
declare type GPSPosition = { lon: number, lat : number };
/**
 * @type WebGLRenderGraphicsType
 * the webgl render type
 */
declare type WebGLRenderGraphicsType = 'POINTS' | 'LINES' | 'LINE_STRIP' | 'LINE_LOOP' | 'TRIANGLES' | 'TRIANGLE_STRIP' | 'TRIANGLE_FAN';

declare type ShaderCodeStruct = { vertex: ShaderCode, fragment:  ShaderCode };
declare type ShaderStringStruct = { vertex: string, fragment: string };

/**
 * @type WebGLLocationType
 * get the glsl define variable
 */
declare type WebGLLocationType = 'attribute' | 'uniform';
declare type BufferType = 'buffer' |'vertex' | 'indices' | 'matrix' | 'vector' | 'number';
declare type WebGLShaderType = 'vertex' | 'fragment';

/**
 * @type GLSLDefine
 * analysis the config by create shader code and get glsl variable location.
 * 
 * @param {VARIABLE_TYPE} type - variable type
 * @param {string} name - variable name
 */
declare type GLSLDefine = { type: VARIABLE_TYPE, name: string, isBuffer?: boolean };
declare type GLSLDefineConfig = { attribute?: Array<GLSLDefine>, uniform?: Array<GLSLDefine>, varying?:Array<GLSLDefine> };
declare type ShaderGLSLDefine = { vertex?: GLSLDefineConfig, fragment?: GLSLDefineConfig }

declare type BufferCache = { [ index: string ]: Buffer };
declare type DataCache = { [ index: string ]: any };
declare type WebGLVariableLocation = WebGLUniformLocation | GLint | GLuint;
declare type BufferData = { element: any, type: string };