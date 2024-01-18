const source = `
    float d = distance(gl_PointCoord, vec2(0.5, 0.5));
    if (d < 0.5) {
        gl_FragColor = v_color;
    } else {
        discard;
    }

`;

export default source;