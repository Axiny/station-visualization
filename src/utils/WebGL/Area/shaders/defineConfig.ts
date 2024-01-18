import { VARIABLE_TYPE } from './../../enum'

const vertex: GLSLDefineConfig = {

    attribute: [

        { type: VARIABLE_TYPE.VEC3, name: 'a_position', isBuffer: true },
        
    ],

    uniform: [

        { type: VARIABLE_TYPE.MAT4, name: 'u_mapMatrix' },
        { type: VARIABLE_TYPE.FLOAT, name: 'u_scale'},
        { type: VARIABLE_TYPE.FLOAT, name: 'u_opacity'},
        { type: VARIABLE_TYPE.VEC3, name: 'u_color'},
        { type: VARIABLE_TYPE.VEC2, name: 'u_offset'},

    ],

    varying: [

        { type: VARIABLE_TYPE.VEC4, name: 'v_color' },

    ]
    
}

const fragment: GLSLDefineConfig = {

    varying: [

        { type: VARIABLE_TYPE.VEC4, name: 'v_color' },

    ]

}



export default { vertex, fragment }
