/// glsl vertex shader source
const source: string = /* glsl */`
    float lat = a_position.x + u_offset.x;
    float lon = a_position.y + u_offset.y;
    vec2 gps = lonlatToMercator(lat, lon, u_scale);
    vec4 position = vec4(gps.x, gps.y, 0.0, 1.0);

    if (a_position.z >= 0.0) {
        v_color = vec4(u_color_1.rgb, u_opacity);
    }
    if (a_position.z > u_distance_limit) {
        v_color = vec4(u_color_2.rgb, u_opacity - 0.2);
    }
    if (a_position.z > u_distance_limit * 2.0) {
        v_color = vec4(u_color_3.rgb, u_opacity - 0.3);
    }
    if (a_position.z > u_distance_limit * 3.0) {
        v_color = vec4(u_color_4.rgb, u_opacity - 0.4);
    }
    if (a_position.z > u_distance_limit * 4.0) {
        v_color = vec4(u_color_5.rgb, u_opacity - 0.5);
    }

    gl_Position = u_mapMatrix * position;
`

export default source;
