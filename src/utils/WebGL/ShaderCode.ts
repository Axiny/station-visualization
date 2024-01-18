import { PRECISION } from './enum'
/**
 * create by bunkyo university
 * this class use the create shader code
 * 
 * @constructor ShaderCode
 * 
 * @author Axiny
 * @date 2022/5/8
 */
class ShaderCode {

    private precision: string = PRECISION.HIGH;
    private defineAreaCode: string = '';
    private bodyAreaCode: string = '';
    
    public type: WebGLShaderType;

    constructor (type?: WebGLShaderType) {

        this.type = type as WebGLShaderType;

    }

    private generate (): string {

        const code = `

            ${ this.defineAreaCode }
            
            void main () {

                ${ this.bodyAreaCode }
            
            }

        `

        return code;

    }

    public addDefineCode (code: string): void {

        this.defineAreaCode += code;

    }

    public setDefineCode (code: string): void {

        this.defineAreaCode = code;

    }

    public addBodyCode (code: string): void {

        this.bodyAreaCode = code;

    }

    public setBodyCode (code: string): void {

        this.bodyAreaCode = code;

    }

    public setPrecision (precision: PRECISION): void {

        this.precision = precision;

    }

    public getCode (): string {

        const precision = `precision ${this.precision} float;\n`;
        this.defineAreaCode = precision.concat(this.defineAreaCode);

        return this.generate();

    }

    public static getDefineVariable (ShaderDefine: ShaderGLSLDefine): ShaderStringStruct {

        // for the typescript verification, use "key[value]" call the object's attribute.
        const defines: { [index: string]: GLSLDefineConfig } = ShaderDefine;
        const res = { vertex : '', fragment : '' } as { [index: string]: string }

        for (const name in defines) {

            const define = defines[name] as { [index: string]: Array<GLSLDefine> };

            for (let key in define) {

                for (let i = 0; i < define[key].length; i++) {
    
                    const e: GLSLDefine = define[key][i];

                    res[name] += `${key} ${e.type} ${e.name};\n`
    
                }
    
            }

        }

        return res as ShaderStringStruct;

    }

}

export default ShaderCode