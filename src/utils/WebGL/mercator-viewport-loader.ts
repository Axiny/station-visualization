// import WebMercatorViewport from '@math.gl/web-mercator';
import WebMercatorViewport from 'viewport-mercator-project'
import type { WebMercatorViewportOptions } from '@math.gl/web-mercator/src/web-mercator-viewport'

/**
 * create by bunkyo university
 * 
 * @function getMercatorViewPortObject
 * create the mercator viewport use render about gis somthing
 * 
 * @param {WebMercatorViewportOptions} config - the config about map state, see WebMercatorViewportOptions
 * 
 * @returns {WebMercatorViewport}
 */
function getMercatorViewPortObject (config: WebMercatorViewportOptions): WebMercatorViewport {

    return new WebMercatorViewport(config)

}

export default getMercatorViewPortObject
export type { WebMercatorViewportOptions, WebMercatorViewport }