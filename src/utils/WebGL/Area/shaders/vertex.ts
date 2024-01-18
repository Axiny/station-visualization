/// glsl vertex shader source
const source: string = `
    float lat = a_position.x + u_offset.x;
    float lon = a_position.y + u_offset.y;
    vec2 gps = lonlatToMercator(lat, lon, u_scale);
    vec4 position = vec4(gps.x, gps.y, 0.0, 1.0);

    v_color = vec4(u_color.rgb, u_opacity);

    gl_Position = u_mapMatrix * position;
`

export default source;
