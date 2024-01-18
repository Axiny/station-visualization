import { 
    WebGLContainer, 
    WebGLRender, 
    Shader,
    ShaderCode,
    Buffer,
    Scene,

    Object3D,
    Roads
} from './index'

import { VARIABLE_TYPE, PRECISION } from './enum'
import GeoJSONLength from './../GeoJSONLength'

import Log from './../Log'


// java -Ddw.graphhopper.datareader.file=kanto-latest.osm.pbf -jar graphhopper-web-5.3.jar server config-example.yml

const vertex = /* glsl */`

precision highp float;

attribute mat4 modelMatrix;
attribute mat4 viewMatrix;
attribute mat4 projectionMatrix;
attribute vec4 position;

uniform vec4 color;

varying vec4 v_color;

void main {

    gl_Position = a_Position * projectionMatrix * viewMatrix * modelMatrix;

}

`

function main () {

    const log = new Log("GLUtils test Message");

    const canvas = document.createElement("canvas");

    /******************************************** */
    // WebGLContainer
    
    const glContainer = new WebGLContainer(canvas);
    const gl = glContainer.getContext();
    
    log.printf(gl);
    /******************************************** */


    /******************************************** */
    // WebGLRender 
    
    const scene = new Scene();
    const Render = new WebGLRender(canvas);
    Render.init(scene);

    log.printf(Render);
    /******************************************** */


    /******************************************** */
    // Scene and Object3D something..

    const roads = new Roads(new Float32Array(3));
    const obj = new Object3D(new Float32Array(3), 3);
    const indices = [0,1, 1, 2, 2, 3];
    obj.setIndices(indices);
    const FaildData = 'test';

    // scene.add(roads, obj, FaildData); // error
    scene.add(roads, obj);
    
    log.printf(scene);
    /******************************************** */


    Render.init(scene);
    // Render.render();
    

    /******************************************** */
    // shaderCode
    const shaderCode = new ShaderCode('vertex');
    // #define the var config
    const vertexDefine: GLSLDefineConfig = {
        uniform : [
            { type : VARIABLE_TYPE.MAT4, name : 'modelMatrix' },
            { type : VARIABLE_TYPE.MAT4, name : 'viewMatrix' },
            { type : VARIABLE_TYPE.MAT4, name : 'viewMatrix' },
            { type : VARIABLE_TYPE.FLOAT, name : 'u_time' }
        ],
        varying : [
            { type : VARIABLE_TYPE.FLOAT, name : 'u_time' }
        ],
        attribute : [
            { type : VARIABLE_TYPE.VEC4, name : 'a_Position' }
        ]
    }

    let { vertex } = ShaderCode.getDefineVariable({ vertex: vertexDefine });
    // shaderCode.addDefineCode(`
    //     uniform mat4 modelMatrix;
    //     uniform mat4 viewMatrix;
    //     uniform mat4 projectionMatrix;
    //     attribute vec4 a_Position;
    //     uniform float u_time;
    //     varying float u_time;
    // `);
    shaderCode.setDefineCode(vertex);
    shaderCode.setBodyCode(`
        gl_Position = a_Position * projectionMatrix * viewMatrix * modelMatrix;
    `)
    shaderCode.setPrecision(PRECISION.HIGH);
    const code = shaderCode.getCode();
    console.log(code);
    /**
     * resoult code:
     * 
     * precision highp float;
     * uniform mat4 modelMatrix;
     * uniform mat4 viewMatrix;
     * uniform mat4 projectionMatrix;
     * attribute vec4 a_Position;
     * void main() {
     *   gl_Position = modelMatrix * projectionMatrix * viewMatrix * modelMatrix;
     * }
     */
    /******************************************** */



}

function main2() {

    const GPSData: Float32Array = new Float32Array([
        139.44820035535903, 35.33731514326684, 0,
        139.4492529409959, 35.341348207070105, 0,
        139.4485261590889, 35.34562189269043,  0,
        139.4471865215307, 35.348015479646385, 0,
        139.44694236733886, 35.34856204389748, 0,
    ])
    
    const indices: number[] = [
        0, 1, 1, 2, 2, 3, 3, 4
    ]

    const ponit1: Float32Array = new Float32Array([
        0.5, 0.5, 0, 1.0
    ])
    
    const ponit2: Float32Array = new Float32Array([
        -0.3, 0, 0, 1.0
    ])
    
    const triangle = new Float32Array([
        0.0, 0.1, -0.1, -0.1, 0.1, -0.1
    ])
    /*** test ***** */
    const defaults = {
        vertex : {
            attribute: [
                { type: 'vec4', name: 'a_position' },
            ],
            uniform: [
                { type: 'float', name: 'u_size'},
                { type: 'vec3', name: 'u_color' }
            ],
            varying: [
                { type: 'vec4', name: 'v_color' },
        
            ]
        },
        fragment : {
            varying : [
                { type: 'vec4', name: 'v_color' }
            ]
        }
    }

    const vertex = new ShaderCode('vertex');
    const fragment = new ShaderCode('fragment');
    const defaultCode = ShaderCode.getDefineVariable(defaults);
    vertex.setPrecision(PRECISION.HIGH);
    vertex.addDefineCode(defaultCode.vertex);
    vertex.setBodyCode(`
        v_color = vec4(u_color.rgb, 1.0);
        gl_Position = a_position;
        gl_PointSize = u_size;
    `)
    fragment.addDefineCode(defaultCode.fragment);
    fragment.addBodyCode(`
        gl_FragColor = v_color;
    `)
    
    const Point1 = new Object3D(ponit1, 4);
    Point1.setDefines(defaults);
    Point1.setShaderCode({ vertex, fragment });
    Point1.setData('u_color', [1.0, 0, 0]);
    Point1.setData('u_size', 50.0);
    
    const Point2 = new Object3D(ponit2, 4);
    Point2.setDefines(defaults);
    Point2.setShaderCode({ vertex, fragment });
    Point2.setData('u_color', [0, 0, 1.0]);
    Point2.setData('u_size', 60.0);
    
    const Triangle = new Object3D(triangle, 2);
    Triangle.setDefines(defaults);
    Triangle.setType('TRIANGLES');
    Triangle.setShaderCode({ vertex, fragment });
    Triangle.setData('u_color', [0.44, 0.1, 0.58]);
    
    /******** */
    
}

function main3 () {

    const canvas = document.createElement('canvas');

    const webglRender = new WebGLRender(canvas);
    const scene = new Scene();

    webglRender.init(scene);

    const triangle = new Float32Array([
        0.0, 0.1, -0.1, -0.1, 0.1, -0.1
    ])

    const TriangleObject = new Object3D(triangle, 3);

    scene.add(TriangleObject);

    webglRender.render();

}

export default main