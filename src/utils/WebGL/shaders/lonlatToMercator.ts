const lonlatToMercator: string = /* glsl */`

vec2 lonlatToMercator(float x, float y, float scale) {

    float _scale = scale * TITLE_SIZE;
    float lambda2 = x * DEGREES_TO_RADIANS; // lat
    float phi2 = y * DEGREES_TO_RADIANS;    // lon
    float lat = _scale * (lambda2 + PI) / (2.0 * PI);
    float lon = _scale * (PI - log(tan(PI / 4.0 + phi2 * 0.5))) / (2.0 * PI);
    return vec2(lat, lon);

}

`

export default lonlatToMercator;