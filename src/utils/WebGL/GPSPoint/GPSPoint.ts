import Object3D from "../Object3D";
import ShaderCode from "../ShaderCode";

import getMercatorViewPortObject from "../mercator-viewport-loader";

import constants from "../shaders/constants";
import lonlatToMercator from "../shaders/lonlatToMercator";
import vertexSource from "./shaders/vertex";
import fragmentSource from "./shaders/fragment";

import defineConfig from "./shaders/defineConfig";

import type { WebMercatorViewportOptions, WebMercatorViewport } from "../mercator-viewport-loader"
import type { Map, LngLatLike } from "../../mapbox-loader"

class GPSPoint extends Object3D {

    public type: WebGLRenderGraphicsType = "POINTS";

    private viewport: WebMercatorViewport | undefined;

    constructor (data: Float32Array) {

        super(data, 2);

        this.defineConfig = defineConfig;

        const shaders = this.createShaderCode();
        this.setShaderCode(shaders);

    }

    private createShaderCode (): ShaderCodeStruct {

        const vertex = new ShaderCode('vertex');
        const fragment = new ShaderCode('fragment');

        const defineSource = ShaderCode.getDefineVariable(this.defineConfig);
        
        vertex.addDefineCode(constants);

        vertex.addDefineCode(defineSource.vertex);
        vertex.addDefineCode(lonlatToMercator);
        vertex.setBodyCode(vertexSource);

        fragment.addDefineCode(defineSource.fragment);
        fragment.setBodyCode(fragmentSource);

        return { vertex, fragment };

    }

    public mercatorViewportState (config: WebMercatorViewportOptions): void {

        this.viewport = getMercatorViewPortObject(config);

    }

    public getViewProjectionMatrix (): number[] {

        return (this.viewport as any).viewProjectionMatrix;

    }

}

export default GPSPoint;