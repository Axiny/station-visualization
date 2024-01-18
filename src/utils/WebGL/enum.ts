const enum PRECISION {
    HIGH = 'highp',
    MIDDLE =  'mediump',
    LOW = 'float;'
}


/**
 * OpenGL Shading Language data type
 * https://ja.wikipedia.org/wiki/GLSL
 * 
 * @enum VARIABLE_TYPE
 */
const enum VARIABLE_TYPE {
    
    INT = 'int',
    FLOAT = 'float',
    BOOL = 'bool',

    BVEC2 = 'bvec2',
    BVEC3 = 'bvec3',
    BVEC4 = 'bvec4',
    
    IVEC2 = 'ivec2',
    IVEC3 = 'ivec3',
    IVEC4 = 'ivec4',
    
    VEC2 = 'vec2',
    VEC3 = 'vec3',
    VEC4 = 'vec4',

    MAT2 = 'mat2',
    MAT3 = 'mat3',
    MAT4 = 'mat4',
    
    SAPLER1D = 'sapler1D',

}

const INDICES = 'indices'

export {

    PRECISION,
    VARIABLE_TYPE,
    INDICES

}