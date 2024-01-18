import Log from './../Log';

const log = new Log('Shader');

/**
 * create by bunkyo university
 * 
 * @constructor Shader
 * 
 * @param {WebGLRenderingContext} gl - the webgl context
 * 
 * @example
 * const shader = new Shader(gl);
 * shader.setShaderSource(vs_code, fs_code);
 * ...
 * ...
 * shader.use();
 * const location = shader.getLocation('uniform', 'vColor');
 * 
 * @author Axiny
 * @date 2022/5/1
 */
class Shader {

    private program: WebGLProgram | null = null;
    private gl: WebGLRenderingContext;
    private VERTEX_SHADER: WebGLShader | any;
    private FRAGMENT_SHADER: WebGLShader | any;

    constructor (gl: WebGLRenderingContext) {

        this.gl = gl;

        this.VERTEX_SHADER = gl.createShader(gl.VERTEX_SHADER);
        this.FRAGMENT_SHADER = gl.createShader(gl.FRAGMENT_SHADER);

    }

    private compile (shader: WebGLShader, code: string): void {

        const G = this.gl;

        G.compileShader(shader);
        const state = G.getShaderParameter(shader, G.COMPILE_STATUS);

        if (!state) {

            log.warn(`gl.getShaderInfoLog: ${G.getShaderInfoLog(shader)}`);

            G.deleteShader(shader);

            log.warn(code);
            log.error('compiled the Shader is failed');

        }

    }

    private createProgram (): void {

        const G = this.gl;

        const program: WebGLProgram | any = G.createProgram();
        G.attachShader(program, this.VERTEX_SHADER);
        G.attachShader(program, this.FRAGMENT_SHADER);

        this.linkProgram(program);

    }

    private linkProgram (program: WebGLProgram): void {

        const G = this.gl;

        G.linkProgram(program);
        const state = G.getProgramParameter(program, G.LINK_STATUS);

        if (!state) {

            log.warn(`gl.getShaderInfoLog: ${G.getProgramInfoLog(program)}`);

            G.deleteProgram(program);

            log.error('linked the shader is failed');

        }

        this.program = program;

    }

    public setSource (vertex: string, fragment: string): void {

        this.gl.shaderSource(this.VERTEX_SHADER, vertex);
        this.gl.shaderSource(this.FRAGMENT_SHADER, fragment);

        this.compile(this.VERTEX_SHADER, vertex);
        this.compile(this.FRAGMENT_SHADER, fragment);

        this.createProgram();

    }

    public getLocation (type: WebGLLocationType, name: string): WebGLVariableLocation | null {

        const G = this.gl;
        const program = this.program as WebGLProgram;
        this.use();

        switch (type) {

            case 'attribute': 
                return G.getAttribLocation(program, name);

            case 'uniform':
                return G.getUniformLocation(program, name);

        }
        
    }

    public use (): void {

        this.gl.useProgram(this.program);
        
    }

}

export default Shader