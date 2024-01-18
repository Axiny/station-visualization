import { VARIABLE_TYPE } from './../../enum'

const vertex: GLSLDefineConfig = {

    attribute: [

        { type: VARIABLE_TYPE.VEC3, name: 'a_position', isBuffer: true },
        
    ],

    uniform: [

        { type: VARIABLE_TYPE.MAT4, name: 'u_mapMatrix' },
        { type: VARIABLE_TYPE.FLOAT, name: 'u_scale'},
        { type: VARIABLE_TYPE.FLOAT, name: 'u_opacity'},
        { type: VARIABLE_TYPE.VEC3, name: 'u_color_1'},
        { type: VARIABLE_TYPE.VEC3, name: 'u_color_2'},
        { type: VARIABLE_TYPE.VEC3, name: 'u_color_3'},
        { type: VARIABLE_TYPE.VEC3, name: 'u_color_4'},
        { type: VARIABLE_TYPE.VEC3, name: 'u_color_5'},
        { type: VARIABLE_TYPE.VEC2, name: 'u_offset'},
        { type: VARIABLE_TYPE.FLOAT, name: 'u_distance_limit'}

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
