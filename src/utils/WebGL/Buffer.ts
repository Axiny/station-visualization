import Log from "../Log";
import Type from "../Type";
import { VARIABLE_TYPE } from "./enum"

const log = new Log('Buffer');

/**
 * create by bunkyo university
 * 
 * @constructor Buffer
 * 
 * @param {WebGLRenderingContext} gl - the webgl context
 * @param {BufferType} type? - the buffer object type, see BufferType
 * 
 * @example
 * // create vertex and indices buffer setup
 * const buffer = new Buffer(gl);
 * buffer.bindData(data);
 * ...
 * ...
 * // if the buffer type is "buffer", you must call other function
 * const shader = new Shader();
 * const location = shader.getLocation("attribute", "a_Position");
 * buffer.setLocation(location);
 * ...
 * buffer.enable(3, gl.FLOAT);
 * ...
 * 
 * // set matrix setup:
 * const buffer = new Buffer(gl, 'matrix');
 * buffer.setUniformData(data, location);
 * 
 * @author Axiny
 * @date 2022/5/7
 */
class Buffer {

    private gl: WebGLRenderingContext;
    private buffer: WebGLBuffer | undefined;
    private type: BufferType = "buffer";
    private location: WebGLUniformLocation | GLint | GLuint | null = null;
    private pointer: { size: number; type: GLuint } = { size : 3, type: 0 };
    private data: BufferData = { element: null, type : '' };

    constructor (gl: WebGLRenderingContext, type?: BufferType) {

        this.gl = gl;
        this.setType(type as BufferType);

        if (type === "buffer" || type === "indices")
            this.buffer = gl.createBuffer() as WebGLBuffer;

    }
    
    private getPointerType (): number | undefined {

        const gl = this.gl;
        const dataType = this.data.type;

        switch (dataType) {

            case 'Float32Array'     : return gl.FLOAT;
            case 'Uint16Array'      : return gl.UNSIGNED_SHORT;
            case 'Int16Array'       : return gl.SHORT;
            case 'Uint32Array'      : return gl.UNSIGNED_INT;
            case 'Int32Array'       : return gl.INT;
            case 'Int8Array'        : return gl.BYTE;
            case 'Uint8Array'       : return gl.UNSIGNED_BYTE;
            case 'Uint8ClampedArray': return gl.UNSIGNED_BYTE;

            default: log.error("the data type is not supported.");

        }

    }

    public bindData (data: any): void {

        const type = this.type;

        if (type == "buffer" || type == "indices") {

            const gl = this.gl;
            this.data.type = Type.get(data);
            this.data.element = data;
            const isIndices = this.type == "indices";

            const target = isIndices ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
            const buffer = this.buffer as WebGLBuffer;

            // const usage = isIndices ? G.STATIC_DRAW : G.STREAM_DRAW;
    
            gl.bindBuffer(target, buffer);
            gl.bufferData(target, data, gl.STATIC_DRAW);

            if (!this.pointer.type) {

                this.pointer.type = this.getPointerType() as number;

            }

        } else {

            log.warn("the buffer type is not supported, please use the 'buffer' or 'indices' property instead of other type.");

        }

    }

    public enable (size: number): void {

        if (this.type === "buffer") {

            const gl = this.gl;

            const location = this.location as GLuint;
            const type = this.pointer.type;
            this.pointer.size = size;
    
            const stride = 0;

            gl.vertexAttribPointer(location, size, type, false, stride, 0);
            gl.enableVertexAttribArray(location);

        } else {

            log.warn("the buffer type is not supported, please use the 'buffer' property instead of other type.");

        }

    }

    public setType (type: BufferType): void {

        this.type = type;

    }

    public getType (): BufferType {

        return this.type;

    }

    public setLocation (location: WebGLVariableLocation): void {

        this.location = location;
        
    }

    public setUniformData (data: Array<number> | number, location?: WebGLUniformLocation): void {

        const L = location || this.location;
        const gl = this.gl;
        const isNumber = Type.isNumber(data);

        if (isNumber) {

            gl.uniform1f(L, data as number);
            return;

        }

        const len = (data as number[]).length;

        switch (len) {

            case 2: gl.uniform2fv(L, data as Array<number>); break;
            case 3: gl.uniform3fv(L, data as Array<number>); break;
            
            case 4: {

                if (this.type === "vector") {

                    gl.uniform4fv(L, data as Array<number>); 
                    break;

                } else if (this.type === "matrix") {
                    
                    gl.uniformMatrix2fv(L, false, data as Array<number>);
                    break;
                    
                } else {

                    log.warn("the data's length is 4, but the type is not 'vertor' and 'matrix', please use setType() and try against.");

                }
                
            }

            case 9: gl.uniformMatrix3fv(L, false, data as Array<number>); break;
            case 16: gl.uniformMatrix4fv(L, false, data as Array<number>); break;

            default: log.warn("the data type is not supported.");

        }

    }

    public setAttributeData (data: Float32Array | Array<number>, location?: GLuint): void {

        const L = location || this.location as GLuint;
        const gl = this.gl;

        const len = (data as number[]).length;
        
        switch (len) {

            case 1: gl.vertexAttrib1fv(L, data); break;
            case 2: gl.vertexAttrib2fv(L, data); break;
            case 3: gl.vertexAttrib3fv(L, data); break;
            case 4: gl.vertexAttrib4fv(L, data); break;

            default: log.warn("the data type is not supported");

        }

    }

    public static createTypeByData (data: any, type: VARIABLE_TYPE, qualifier: string): BufferType | undefined {

        if (qualifier == "attribute") {

            if (data.length > 4) {

                return 'buffer';

            }

            return 'vertex';

        } else if (qualifier == "uniform") {

            if (Type.isNumber(data)) {

                return 'number';
    
            }
    
            let len = data.length;
    
            switch (len) {
    
                case 2: 
                case 3: return 'vector';
    
                case 4: {
    
                    if (type === VARIABLE_TYPE.VEC4) {
    
                        return 'vector';
    
                    } else {
    
                        return 'matrix';
    
                    }
    
                }
    
                case 9:
                case 16: return 'matrix';
    
                default: {
    
                    log.warn("the buffer type is undefined, please check the data or type and try again");
    
                }
    
            }

        } else {

            log.warn("the qualifier type is not 'attribute' or 'uniform'. Please check param and try again.");

        }

    }

}

export default Buffer